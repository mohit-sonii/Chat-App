"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_middleware_1 = require("../middleware/authentication.middleware");
const getUsers_controller_1 = require("../controllers/getUsers.controller");
const router = express_1.default.Router();
router.get('/', authentication_middleware_1.Authentication, getUsers_controller_1.getUsers);
router.get('/search', authentication_middleware_1.Authentication, getUsers_controller_1.searchResult);
exports.default = router;
