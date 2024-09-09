"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_middleware_1 = require("../middleware/authentication.middleware");
const message_controller_1 = require("../controllers/message.controller");
const router = express_1.default.Router();
router.post('/send-message/:id', authentication_middleware_1.Authentication, message_controller_1.sendMessage);
router.get('/get-messages/:id', authentication_middleware_1.Authentication, message_controller_1.getMessage);
exports.default = router;
