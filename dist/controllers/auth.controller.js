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
exports.logout = exports.login = exports.register = void 0;
const Response_util_1 = require("../utils/Response.util");
const User_model_1 = __importDefault(require("../models/User.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_util_1 = require("../utils/jwt.util");
const zodValidaton_1 = require("../zod/zodValidaton");
const zod_1 = require("zod");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, fullname, gender } = zodValidaton_1.RegisterValidation.parse(req.body);
        const { confirmPassword } = req.body;
        const alreadyUser = yield User_model_1.default.findOne({
            username
        });
        if (alreadyUser)
            return (0, Response_util_1.ApiResponse)(res, 400, false, 'Username already exists');
        if (password !== confirmPassword)
            return (0, Response_util_1.ApiResponse)(res, 400, false, 'Password do not match');
        const hashPassword = yield bcryptjs_1.default.hash(password, 10);
        let avatar = `https://avatar.iran.liara.run/username?username=${username}&length=1`;
        if (gender === 'male')
            avatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        else
            avatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User_model_1.default({
            fullname,
            username,
            profilePic: avatar,
            password: hashPassword,
            gender
        });
        yield newUser.save();
        (0, jwt_util_1.tokenGeneration)(newUser._id.toString(), res);
        return (0, Response_util_1.ApiResponse)(res, 201, true, 'User Registered  Successfully', newUser);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            const validationErrors = error.errors.map(e => e.message).join(', ');
            return (0, Response_util_1.ApiResponse)(res, 400, false, `Validation Error: ${validationErrors}`);
        }
        console.log(error, 'Error while registering a user');
        return (0, Response_util_1.ApiResponse)(res, error.message ? 400 : 500, false, error.message || 'Internal Server Error');
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield User_model_1.default.findOne({
            username
        });
        if (!user)
            return (0, Response_util_1.ApiResponse)(res, 400, false, 'User does not exist.');
        const checkPassword = bcryptjs_1.default.compare(password, user.password);
        if (!checkPassword)
            throw new Error('Entered credentials are incorrect');
        (0, jwt_util_1.tokenGeneration)(user._id.toString(), res);
        return (0, Response_util_1.ApiResponse)(res, 201, true, 'User Logged in', user);
    }
    catch (error) {
        console.log(error, 'Error while login a user');
        return (0, Response_util_1.ApiResponse)(res, error.message ? 400 : 500, false, error.message || 'Internal Server Error');
    }
});
exports.login = login;
const logout = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie('token', "", { maxAge: 0 });
        return (0, Response_util_1.ApiResponse)(res, 200, true, 'Logout Successfully');
    }
    catch (error) {
        console.log(error, 'Error while logging out a user');
        return (0, Response_util_1.ApiResponse)(res, 500, false, error.message || 'Internal Server Error');
    }
});
exports.logout = logout;
