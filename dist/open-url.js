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
Object.defineProperty(exports, "__esModule", { value: true });
exports.openUrl = void 0;
const axios_1 = require("axios");
const openUrl = (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (!message.data || !Buffer.isBuffer(message.data)) {
        console.error('No data or invalid data format in message');
        return;
    }
    try {
        const decodedData = message.data.toString('utf-8');
        let payload;
        try {
            payload = JSON.parse(decodedData);
        }
        catch (error) {
            console.error('Failed to parse message data:', error);
            return;
        }
        if (!payload.url) {
            console.error('No URL provided in the message');
            return;
        }
        const url = payload.url;
        try {
            const response = yield axios_1.default.get(url);
            console.log(`Accessed ${url} with status: ${response.status}`);
        }
        catch (error) {
            console.error(`Error accessing ${url}: `, error);
        }
    }
    catch (error) {
        console.error('Unexpected error:', error);
    }
});
exports.openUrl = openUrl;
