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
const connectBPlus_1 = __importDefault(require("../connectBPlus"));
const connectAX_1 = __importDefault(require("../connectAX"));
class IndexController {
    /*========================================================================*/
    /*-------- Business Plus --------*/
    getEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connectBPlus_1.default.query("select * from GEL.dbo.EMPFILE", function (err, row, fields) {
                const listproject = JSON.parse(JSON.stringify(row, null, 4));
                console.log(row.recordsets[0]);
                res.json(row.recordsets[0]);
            });
        });
    }
    listAllEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connectBPlus_1.default.query("select PRS_NO,EMP_I_CARD,EMP_INTL,EMP_NAME,EMP_SURNME,EMP_GENDER," +
                "EMP_MARITAL,EMP_BIRTH,PRS_JBT,JBT_THAIDESC,PRS_DEPT,DEPT_THAIDESC " +
                "from GEL.dbo.PERSONALINFO " +
                "inner join GEL.dbo.EMPFILE on EMP_KEY = PRS_EMP " +
                "inner join GEL.dbo.JOBTITLE on PRS_JBT = JBT_KEY " +
                "inner join GEL.dbo.DEPTTAB on PRS_DEPT = DEPT_KEY " +
                "order by PRS_NO", function (err, row, fields) {
                const listproject = JSON.parse(JSON.stringify(row, null, 4));
                console.log(row.recordsets[0]);
                res.json(row.recordsets[0]);
            });
        });
    }
    getEmpByDept(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield connectBPlus_1.default.query("select PRS_NO,EMP_I_CARD,EMP_INTL,EMP_NAME,EMP_SURNME,EMP_GENDER," +
                "EMP_MARITAL,EMP_BIRTH,PRS_JBT,JBT_THAIDESC,PRS_DEPT,DEPT_THAIDESC " +
                "from GEL.dbo.PERSONALINFO " +
                "inner join GEL.dbo.EMPFILE on EMP_KEY = PRS_EMP " +
                "inner join GEL.dbo.JOBTITLE on PRS_JBT = JBT_KEY " +
                "inner join GEL.dbo.DEPTTAB on PRS_DEPT = DEPT_KEY " +
                "where DEPT_KEY = " + [id] +
                " order by PRS_NO", function (err, row, fields) {
                const listproject = JSON.parse(JSON.stringify(row, null, 4));
                console.log(row.recordsets[0]);
                res.json(row.recordsets[0]);
            });
        });
    }
    getEmpId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const result = yield connectBPlus_1.default.query("select PRS_NO,EMP_I_CARD,EMP_INTL,EMP_NAME,EMP_SURNME,EMP_GENDER," +
                    "EMP_MARITAL,EMP_BIRTH,EMP_ADDR_1,EMP_ADDR_2,EMP_ADDR_3,PRS_JBT,JBT_THAIDESC,PRS_DEPT,DEPT_THAIDESC " +
                    "from GEL.dbo.PERSONALINFO " +
                    "inner join GEL.dbo.EMPFILE on EMP_KEY = PRS_EMP " +
                    "inner join GEL.dbo.JOBTITLE on PRS_JBT = JBT_KEY " +
                    "inner join GEL.dbo.DEPTTAB on PRS_DEPT = DEPT_KEY " +
                    "where PRS_NO = " +
                    [id]);
                console.log(result);
                res.json(result.recordsets[0]);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAllDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connectBPlus_1.default.query("select * from GEL.dbo.DEPTTAB", function (err, row) {
                const listproject = JSON.parse(JSON.stringify(row, null, 4));
                console.log(row.recordsets[0]);
                res.json(row.recordsets[0]);
            });
        });
    }
    getDepartmentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield connectBPlus_1.default.query("select * from GEL.dbo.DEPTTAB where DEPT_KEY=" + [id], function (err, row) {
                const listproject = JSON.parse(JSON.stringify(row, null, 4));
                console.log(row.recordsets[0]);
                res.json(row.recordsets[0]);
            });
        });
    }
    getUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { pass } = req.params;
            try {
                const result = yield connectBPlus_1.default.query("select PRS_NO,EMP_I_CARD,EMP_INTL,EMP_NAME,EMP_SURNME,EMP_GENDER," +
                    "EMP_MARITAL,EMP_BIRTH,PRS_JBT,JBT_THAIDESC,PRS_DEPT,DEPT_THAIDESC, " +
                    "EMP_I_CARD as username, PRS_NO as password " +
                    "from GEL.dbo.PERSONALINFO " +
                    "inner join GEL.dbo.EMPFILE on EMP_KEY = PRS_EMP " +
                    "inner join GEL.dbo.JOBTITLE on PRS_JBT = JBT_KEY " +
                    "inner join GEL.dbo.DEPTTAB on PRS_DEPT = DEPT_KEY " +
                    "where EMP_I_CARD = " +
                    [id] +
                    " and PRS_NO = " +
                    [pass]);
                console.log(result);
                res.setHeader('Content-Type', 'application/json');
                res.json(result.recordsets[0]);
                //res.status(404).json({ text: "Username doesn't exits" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getUsernameApp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { pass } = req.params;
            try {
                const result = yield connectBPlus_1.default.query("select PRS_NO,EMP_I_CARD,EMP_INTL,EMP_NAME,EMP_SURNME,EMP_GENDER," +
                    "EMP_MARITAL,EMP_BIRTH,PRS_JBT,JBT_THAIDESC,PRS_DEPT,DEPT_THAIDESC, " +
                    "EMP_I_CARD as username, PRS_NO as password " +
                    "from GEL.dbo.PERSONALINFO " +
                    "inner join GEL.dbo.EMPFILE on EMP_KEY = PRS_EMP " +
                    "inner join GEL.dbo.JOBTITLE on PRS_JBT = JBT_KEY " +
                    "inner join GEL.dbo.DEPTTAB on PRS_DEPT = DEPT_KEY " +
                    "where EMP_BIRTH = '" + [id] + "' and PRS_NO = '" + [pass] + "' ");
                console.log(result);
                res.setHeader('Content-Type', 'application/json');
                res.json(result.recordsets[0]);
                //res.status(404).json({ text: "Username doesn't exits" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const result = yield connectBPlus_1.default.query("select PRS_NO,EMP_I_CARD,EMP_INTL,EMP_NAME,EMP_SURNME,EMP_GENDER," +
                    "EMP_MARITAL,EMP_BIRTH,PRS_JBT,JBT_THAIDESC,PRS_DEPT,DEPT_THAIDESC " +
                    "from GEL.dbo.PERSONALINFO " +
                    "inner join GEL.dbo.EMPFILE on EMP_KEY = PRS_EMP " +
                    "inner join GEL.dbo.JOBTITLE on PRS_JBT = JBT_KEY " +
                    "inner join GEL.dbo.DEPTTAB on PRS_DEPT = DEPT_KEY " +
                    "where EMP_I_CARD = " +
                    [id]);
                console.log(result);
                res.json(result.recordsets[0]);
                //res.status(404).json({ text: "Username doesn't exits" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    /*========================================================================*/
    /*-------- ERP AX --------*/
    getProjectInAX(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connectAX_1.default.query("select ProjId,PROJGROUPID,NAME," +
                    "DLVNAME,Status from ProjTable where PARENTID =' '", function (err, row) {
                    const listproject = JSON.parse(JSON.stringify(row, null, 4));
                    console.log(row.recordsets[0]);
                    res.json(row.recordsets[0]);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getIDAX(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield connectAX_1.default.query("select ProjId,PROJGROUPID,NAME," +
                    "DLVNAME,Status from ProjTable where PARENTID =' ' and ProjId = '" +
                    [id] +
                    "'");
                console.log(result);
                res.json(result.recordsets[0]);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getGroupAX(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { group } = req.params;
                const result = yield connectAX_1.default.query("select ProjId,PROJGROUPID,NAME," +
                    "DLVNAME,Status from ProjTable where PARENTID =' ' and PROJGROUPID = '" +
                    [group] +
                    "'");
                console.log(result);
                res.json(result.recordsets[0]);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    listGroupProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connectAX_1.default.query("SELECT distinct PROJGROUPID FROM ProjTable where PARENTID =' '", function (err, row) {
                const listproject = JSON.parse(JSON.stringify(row, null, 4));
                console.log(row.recordsets[0]);
                res.json(row.recordsets[0]);
            });
        });
    }
}
const indexController = new IndexController();
exports.default = indexController;
