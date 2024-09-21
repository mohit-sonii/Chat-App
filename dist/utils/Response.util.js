"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
const ApiResponse = (res, statusCode, success, message, data, error) => {
    const extract = { statusCode, success, message, data, error };
    if (data)
        extract.data = data;
    if (error)
        extract.error = error;
    return res.json(extract);
};
exports.ApiResponse = ApiResponse;
