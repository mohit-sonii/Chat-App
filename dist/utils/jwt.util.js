"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenGeneration = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenGeneration = (userId, res) => {
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.Token_secret || 'fallback_secret_key', { expiresIn: '15d' });
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 29 * 24 * 60 * 60 * 1000
    };
    return res.cookie('token', token, options);
};
exports.tokenGeneration = tokenGeneration;
