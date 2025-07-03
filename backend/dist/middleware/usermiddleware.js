"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = userMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_USER_PASSWORD = "ankit123";
//@ts-ignore
function userMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        // Check if the Authorization header exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authorization token is missing or invalid." });
        }
        const token = authHeader.split(" ")[1];
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, JWT_USER_PASSWORD);
        //@ts-ignore
        if (!decoded || !decoded.id) {
            return res.status(403).json({ message: "Invalid token." });
        }
        //@ts-ignore
        req.userId = decoded.id;
        console.log(decoded);
        next();
    }
    catch (error) {
        // Handle token verification errors
        return res.status(403).json({ message: "Token verification failed.", error: error });
    }
}
