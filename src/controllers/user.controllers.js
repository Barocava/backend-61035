import Controllers from "./class.controller.js";
import UserService from '../services/user.services.js';
import { createResponse } from "../utils.js";
import httpResponse from '../utils/httpresponse.js';

const userService = new UserService();

export default class UserController extends Controllers{
  constructor(){
    super(userService)
  }

  register = async(req, res, next) =>{
    try {
      const data = await this.service.register(req.body);
      !data ? createResponse(res, 404, data) : createResponse(res, 200, data);
    } catch (error) {
      next(error);
    }
  };

  login = async(req, res, next) =>{
    try {
     const token = await this.service.login(req.body);
      res.cookie('token', token, { httpOnly: true });
     !token ? createResponse(res, 404, token) : createResponse(res, 200, token);
    } catch (error) {
      next(error);
    }
  };

  current =async(req, res, next)=>{
    try {
     if(req.user){
      const { _id } = req.user;
      const user = await this.service.getUserById(_id);
      createResponse(res, 200, user)
     } else createResponse(res, 401, { msg: 'Unhautorized' })
    } catch (error) {
      next(error);
    }
  };

  //esto es nuevo
  getAll = async(req, res, next)=>{
    try {
      const response = await this.service.checkUsersLastConnection();
      return createResponse(res, 200, response);
    } catch (error) {
      next(error);
    }
  }

  deleteInactiveUsers = async (req, res, next) => {
    try {
      //const { timeLimit } = req.body;  // El límite de tiempo se enviará en la solicitud
      const timeLimit = 5;
      const deletedUsers = await this.service.deleteInactiveUsers(timeLimit);
      
      if (deletedUsers.length === 0) {
        return createResponse(res, 404, 'No inactive users found');
      }
      
      return createResponse(res, 200, { message: 'Users deleted successfully', deletedUsers });
    } catch (error) {
      next(error);
    }
  };

    logout = async (req, res, next) => {
    try {
      const user = req.user;
      if (!user) return httpResponse.Unauthorized(res, "No user logged in");
      await this.service.logout(user._id);
      res.clearCookie('token');  
      return httpResponse.Ok(res, { message: 'Logout successful' });
    } catch (error) {
      next(error);
    }
  };
};