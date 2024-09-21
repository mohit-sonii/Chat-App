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
exports.searchResult = searchResult;
const Response_util_1 = require("../utils/Response.util");
const Conversation_model_1 = __importDefault(require("../models/Conversation.model"));
const User_model_1 = __importDefault(require("../models/User.model"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const conversations = ((_a = req.userData) === null || _a === void 0 ? void 0 : _a.conversation_id) || [];
        if (conversations.length === 0) {
            return (0, Response_util_1.ApiResponse)(res, 204, true, 'No chats available');
        }
        const conversationResult = yield Conversation_model_1.default.find({ _id: { $in: conversations } });
        const usersResult = yield Promise.all(conversationResult.map((conversation) => __awaiter(void 0, void 0, void 0, function* () {
            if (conversation && 'participants' in conversation) {
                const [senderId, receiverId] = conversation.participants;
                const sender = yield User_model_1.default.findById(senderId).select("-password");
                // Check if the current user is the sender
                if ((sender === null || sender === void 0 ? void 0 : sender.username) === req.userData.username) {
                    // Current user is the sender, fetch the receiver
                    const receiver = yield User_model_1.default.findById(receiverId).select("-password");
                    return receiver;
                }
                else {
                    // Current user is the receiver, fetch the sender
                    return sender;
                }
            }
        })));
        // Filter out any null values (in case of missing users)
        const filteredUsers = usersResult.filter(user => user !== null);
        return (0, Response_util_1.ApiResponse)(res, 200, true, 'Users fetched successfully', filteredUsers);
    }
    catch (error) {
        return (0, Response_util_1.ApiResponse)(res, error.message ? 400 : 500, false, error.message || 'Internal Server Error', null, error);
    }
});
exports.getUsers = getUsers;
function searchResult(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const username = req.query.username;
            const user = yield User_model_1.default.findOne({ username });
            if (user)
                return (0, Response_util_1.ApiResponse)(res, 202, true, 'User Found', user);
            else
                return (0, Response_util_1.ApiResponse)(res, 200, false, 'No User Found');
        }
        catch (error) {
            return (0, Response_util_1.ApiResponse)(res, error.message ? 400 : 500, false, error.response.data.message || 'Internal Server Error', null, error);
        }
    });
}
