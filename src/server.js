import express from "express";
//import productsRouter from './routes/products.router.js';
//import cartsRouter from './routes/carts.router.js';
//import viewsRouter from './routes/views.router.js';

import productsRouter from './routes/mongo/product.router.js';
import cartsRouter from './routes/mongo/cart.router.js';
import viewsRouter from './routes/mongo/views.router.js';

import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from 'socket.io';
import { initMongoDB } from "./db/database.js";
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "\\public"));
app.use(morgan('dev'));

//Apartado de handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "\\views");

app.use('/api/products', productsRouter);
app.use('/', viewsRouter);
app.use('/api/carts', cartsRouter);
app.use(errorHandler);

initMongoDB();

const PORT = 8080;

const httpServer = app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));
/*
const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
  app.use('/api/carts', cartsRouter(socket));
});*/