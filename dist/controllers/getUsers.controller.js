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
exports.getUsers = void 0;
const Response_util_1 = require("../utils/Response.util");
const Conversation_model_1 = __importDefault(require("../models/Conversation.model"));
const User_model_1 = __importDefault(require("../models/User.model"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const conversations = (_a = req.userData) === null || _a === void 0 ? void 0 : _a.conversation_id;
        if (conversations == null)
            return (0, Response_util_1.ApiResponse)(res, 200, true, 'No chats available');
        const userMessages = yield Conversation_model_1.default.findById({
            _id: conversations
        });
        const participant = userMessages === null || userMessages === void 0 ? void 0 : userMessages.participants[1];
        const reciever = yield User_model_1.default.findById(participant).select('-password');
        return (0, Response_util_1.ApiResponse)(res, 200, true, 'data fetch successfully', reciever);
    }
    catch (error) {
        console.log(error, 'Error while fetching Users');
        return (0, Response_util_1.ApiResponse)(res, error.message ? 400 : 500, false, error.message || 'Internal Server Error', null, error);
    }
});
exports.getUsers = getUsers;
