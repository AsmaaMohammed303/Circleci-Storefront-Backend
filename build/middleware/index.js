"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
console.log(config_1.default);
//application ==> عشان احنا بنستخدم ال typescript
//وممكن ما نستخدمهوش
//, { application }
//create instance of server
const app = (0, express_1.default)();
const port = config_1.default.port || 3000;
app.use(express_1.default.json());
//start express server
//ممكن نقوله ابعتلي callback فانكشن بيحصلها لما السيرفر يشتغل
app.listen(port, () => {
    console.log(`server is run at port ${port}`);
});
exports.default = app;
