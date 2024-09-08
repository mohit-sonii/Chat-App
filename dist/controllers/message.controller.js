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
exports.getMessage = exports.sendMessage = void 0;
const Conversation_model_1 = __importDefault(require("../models/Conversation.model"));
const Response_util_1 = require("../utils/Response.util");
const Message_model_1 = __importDefault(require("../models/Message.model"));
const User_model_1 = __importDefault(require("../models/User.model"));
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const senderId = req.userData._id;
        const { id: receiverId } = req.params;
        const { message } = req.body;
        let conversation = yield Conversation_model_1.default.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        });
        if (!conversation) {
            conversation = yield Conversation_model_1.default.create({
                participants: [senderId, receiverId],
                messages: []
            });
            yield User_model_1.default.updateMany({ _id: { $in: [senderId, receiverId] } }, { $set: { conversation_id: conversation._id } });
        }
        const newMessage = yield Message_model_1.default.create({
            senderId,
            receiverId,
            message
        });
        if (newMessage && conversation) {
            conversation.messages.push(newMessage._id);
        }
        yield Promise.all([conversation.save(), newMessage.save()]);
        return (0, Response_util_1.ApiResponse)(res, 200, true, 'Message Sent Successfully', conversation);
    }
    catch (error) {
        console.log(error, 'Error while sending message');
        return (0, Response_util_1.ApiResponse)(res, 500, false, error.message || 'Internal Server Error');
    }
});
exports.sendMessage = sendMessage;
const getMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.userData._id;
        const conversation = yield Conversation_model_1.default.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        }).populate('messages');
        if (!conversation)
            return (0, Response_util_1.ApiResponse)(res, 200, true, 'Start to Chat', []);
        return (0, Response_util_1.ApiResponse)(res, 200, true, 'Data fetched successfully', conversation.messages);
    }
    catch (error) {
        console.log(error, 'Error while sending message');
        return (0, Response_util_1.ApiResponse)(res, error.message ? 400 : 500, false, error.message || 'Internal Server Error');
    }
});
exports.getMessage = getMessage;
