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
exports.register = void 0;
const users_1 = require("../database/users");
const authentication_helpers_1 = require("../helpers/authentication.helpers");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.sendStatus(400);
        }
        const existingUser = yield (0, users_1.getUsersByEmail)(email);
        if (existingUser) {
            return res.sendStatus(400);
        }
        const salt = (0, authentication_helpers_1.random)();
        const user = yield (0, users_1.createUser)({
            email,
            username,
            authentication: {
                salt,
                password: (0, authentication_helpers_1.authentication)(salt, password),
            },
        });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log("error");
        return res.sendStatus(400);
    }
});
exports.register = register;
