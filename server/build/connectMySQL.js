"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql1 = __importStar(require("mysql"));
// connection localhost
const pool3 = mysql1.createPool({
    host: 'ns17.hostinglotus.net',
    user: 'stplusc1_my3plus',
    password: '0tvpkdi^hwxmew,;jt',
    database: 'stplusc1_myapp',
    port: 3306
});
pool3.getConnection((err, connection) => {
    if (err)
        throw err;
    connection.release();
    console.log('MySQL of 3STPLUS is connected');
});
exports.default = pool3;
