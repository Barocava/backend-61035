import fs from "fs";
import logger from "../../utils/logger.js";

export default class FSDao {
  constructor(path) {
    this.path = path;
  }

  async #getMaxId() {
    let maxId = 0;
    const items = await this.getAll();
    items.map((item) => {
      if (item.id > maxId) maxId = item.id;
    });
    return maxId;
  }

  async getAll() {
    try {
      if (fs.existsSync(this.path)) {
        const items = await fs.promises.readFile(this.path, "utf-8");
        const itemsJSON = JSON.parse(items);
        return itemsJSON;
      } else {
        return [];
      }
    } catch (error) {
      logger.error(error);
    }
  }

  async getById(id) {
    try {
      const items = await this.getAll();
      const item = items.find((item) => item.id === id);
      if (item) {
        return item;
      }
      return false;
    } catch (error) {
      logger.error(error);
    }
  }

  async create(obj) {
    try {
      const item = {
        id: (await this.#getMaxId()) + 1,
        ...obj,
      };
      const itemsFile = await this.getAll();
      itemsFile.push(item);
      await fs.promises.writeFile(this.path, JSON.stringify(itemsFile));
      return item;
    } catch (error) {
      logger.error(error);
    }
  }

  async update(obj, id) {
    try {
      const itemsFile = await this.getAll();
      const index = itemsFile.findIndex((item) => item.id === id);
      logger.info("index:::", index);
      if (index === -1) {
        throw new Error(`Id ${id} not found`);
      } else {
        itemsFile[index] = { ...obj, id };
      }
      await fs.promises.writeFile(this.path, JSON.stringify(itemsFile));
    } catch (error) {
      logger.error(error);
    }
  }

  async delete(id) {
    try {
      const itemsFile = await this.getAll();
      if (itemsFile.length > 0) {
        const newArray = itemsFile.filter((item) => item.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      } else {
        throw new Error(`Item id: ${id} not found`);
      }
    } catch (error) {
      logger.error(error);
    }
  }
}
