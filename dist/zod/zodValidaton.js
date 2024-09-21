"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterValidation = void 0;
const zod_1 = require("zod");
exports.RegisterValidation = zod_1.z.object({
    username: zod_1.z.string().max(15, { message: 'Username Cannot have more than 15 characters' }).toLowerCase().trim().min(3, { message: 'Username must be atleast 3 characters' }),
    fullname: zod_1.z.string(),
    gender: zod_1.z.enum(['male', 'female', 'others'], { message: 'Gender must be either male, female, or others' }),
    password: zod_1.z.string().min(6, { message: 'Password must be atleast 6 characters long' })
});
