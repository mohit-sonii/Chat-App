"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Response_util_1 = require("../utils/Response.util");
const Authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token)
            throw new Error('Please Login again');
        const decode = jsonwebtoken_1.default.verify(token, process.env.Token_secret || '');
        if (!decode)
            throw new Error('Please Login again');
        const user = yield User_model_1.default.findById(decode.userId).select('-password');
        if (!user)
            throw new Error('No User Exists');
        req.userData = user;
        next();
    }
    catch (error) {
        console.log(error, 'Error while Authenticating User');
        return (0, Response_util_1.ApiResponse)(res, 500, false, error.message || 'Internal Server Error');
    }
});
exports.Authentication = Authentication;
