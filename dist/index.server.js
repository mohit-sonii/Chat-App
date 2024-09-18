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
const db_database_1 = require("./database/db.database");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const getUsers_routes_1 = __importDefault(require("./routes/getUsers.routes"));
const cors_1 = __importDefault(require("cors"));
const socket_1 = require("./socket/socket");
dotenv_1.default.config();
socket_1.app.use(express_1.default.json());
socket_1.app.use((0, cookie_parser_1.default)());
const corsOptions = {
    origin: ['https://social-messaging-application.netlify.app'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
};
socket_1.app.use((0, cors_1.default)(corsOptions));
socket_1.app.use('/api/auth', auth_routes_1.default);
socket_1.app.use('/api/messages', message_routes_1.default);
socket_1.app.use('/api/users', getUsers_routes_1.default);
socket_1.server.listen(process.env.PORT || 8000, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_database_1.dbConnect)();
        console.log(`Server is running on port ${process.env.PORT}`);
    }
    catch (error) {
        console.error('Failed to connect to the database', error);
        process.exit(1);
    }
}));
