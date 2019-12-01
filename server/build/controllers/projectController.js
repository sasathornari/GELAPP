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
const connectMySQL_1 = __importDefault(require("../connectMySQL"));
class ProjectController {
    /*========================================================================*/
    /*-------- My3PLUS --------*/
    getAllUserLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connectMySQL_1.default.query("select * from stplusc1_myapp.user_login", function (err, row) {
                const listuser = JSON.parse(JSON.stringify(row, null, 4));
                res.json(listuser);
            });
        });
    }
    getUserLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user } = req.params;
                const { pass } = req.params;
                yield connectMySQL_1.default.query("SELECT * FROM stplusc1_myapp.user_login WHERE username = '" +
                    [user] +
                    "' and password = '" +
                    [pass] +
                    "'", function (err, row) {
                    const listuser = JSON.parse(JSON.stringify(row, null, 4));
                    res.json(listuser);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getUserLoginByEmpId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { empId } = req.params;
                yield connectMySQL_1.default.query("SELECT * FROM stplusc1_myapp.user_login WHERE PRS_NO = '" +
                    [empId] +
                    "'", function (err, row) {
                    const listuser = JSON.parse(JSON.stringify(row, null, 4));
                    res.json(listuser);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getUserLoginByUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.params;
                yield connectMySQL_1.default.query("select * from stplusc1_myapp.user_login where username = '" + [name] + "'", function (err, row) {
                    const listuser = JSON.parse(JSON.stringify(row, null, 4));
                    res.json(listuser);
                });
                //console.log(result);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getUserLoginByRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { role } = req.params;
                yield connectMySQL_1.default.query("SELECT * FROM stplusc1_myapp.user_login WHERE role = " + [role], function (err, row) {
                    const listuser = JSON.parse(JSON.stringify(row, null, 4));
                    res.json(listuser);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getEmpIdByUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user } = req.params;
                yield connectMySQL_1.default.query("select PRS_NO from stplusc1_myapp.user_login where username = '" + [user] + "'", function (err, row) {
                    const listuser = JSON.parse(JSON.stringify(row, null, 4));
                    res.json(listuser);
                });
                //console.log(result);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getProjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connectMySQL_1.default.query("select * from stplusc1_myapp.projects where onProject = 1t", function (err, row) {
                const listproject = JSON.parse(JSON.stringify(row, null, 4));
                console.log(listproject);
                res.json(listproject);
            });
        });
    }
    getProjectsId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield connectMySQL_1.default.query("SELECT * FROM stplusc1_myapp.projects WHERE ProjId = '" + [id] + "'", function (err, row) {
                    console.log(row);
                    const listproject = JSON.parse(JSON.stringify(row, null, 4));
                    res.json(listproject);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getProjectsById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield connectMySQL_1.default.query("SELECT * FROM stplusc1_myapp.projects WHERE proId = '" + [id] + "'", function (err, row) {
                    console.log(row);
                    const listproject = JSON.parse(JSON.stringify(row, null, 4));
                    res.json(listproject);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getProjectsAssign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connectMySQL_1.default.query("select * from stplusc1_myapp.projassign", function (err, row) {
                const listproject = JSON.parse(JSON.stringify(row, null, 4));
                console.log(listproject);
                res.json(listproject);
            });
        });
    }
    getProjectsAssignById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield connectMySQL_1.default.query("SELECT * FROM stplusc1_myapp.projassign WHERE PRS_NO = '" + [id] + "'", function (err, row) {
                    console.log(row);
                    const listproject = JSON.parse(JSON.stringify(row, null, 4));
                    res.json(listproject);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ceateProjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield connectMySQL_1.default.query("INSERT INTO stplusc1_myapp.projects set ?", [req.body]);
                console.log(result);
                res.json({ message: "Create Project Success = " + [req.body] });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ceateProjectsAssign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield connectMySQL_1.default.query("INSERT INTO stplusc1_myapp.projassign set ?", [req.body]);
                console.log(result);
                res.json({
                    message: "Assign Employee to Project Success = " + [req.body]
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    createUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield connectMySQL_1.default.query("INSERT INTO stplusc1_myapp.user_login set ?", [req.body]);
                console.log(result);
                res.json({ message: "Create user success = " + [req.body] });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    createTimeAttendance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield connectMySQL_1.default.query("INSERT INTO stplusc1_myapp.tma set ?", [
                    req.body
                ]);
                console.log(result);
                res.json({ message: "Time Attendance Success = " + [req.body] });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getTimeAttendance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connectMySQL_1.default.query("select * from stplusc1_myapp.tma", function (err, row) {
                const listproject = JSON.parse(JSON.stringify(row, null, 4));
                console.log(listproject);
                res.json(listproject);
            });
        });
    }
    getTimeByEmpId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield connectMySQL_1.default.query("select * from stplusc1_myapp.tma WHERE empId = '" + [id] + "'", function (err, row) {
                    const listproject = JSON.parse(JSON.stringify(row, null, 4));
                    console.log(listproject);
                    res.json(listproject);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getTimeByProjId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield connectMySQL_1.default.query("select * from stplusc1_myapp.tma WHERE ProjId = '" + [id] + "'", function (err, row) {
                    const listproject = JSON.parse(JSON.stringify(row, null, 4));
                    console.log(listproject);
                    res.json(listproject);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getLocationInProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { lat } = req.params;
                const { latAdd } = req.params;
                const { lng } = req.params;
                const { lngAdd } = req.params;
                yield connectMySQL_1.default.query("SELECT * FROM stplusc1_myapp.projects" +
                    " where latitude  >= " + [lat] + " and latitude <= " + [latAdd] +
                    " and longitude >= " + [lng] + " and longitude <= " + [lngAdd] +
                    " and onProject = 1 ", function (err, row) {
                    console.log(row);
                    const listproject = JSON.parse(JSON.stringify(row, null, 4));
                    console.log(listproject);
                    res.json(listproject);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteUserLoginById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield connectMySQL_1.default.query("delete from stplusc1_myapp.user_login where Id =" + [id], function (err, row) {
                    const listproject = JSON.parse(JSON.stringify(row, null, 4));
                    console.log(listproject);
                    res.json(listproject);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteAssgingById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield connectMySQL_1.default.query("delete from stplusc1_myapp.projassign where assignId =" + [id], function (err, row) {
                    const listproject = JSON.parse(JSON.stringify(row, null, 4));
                    console.log(listproject);
                    res.json(listproject);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updateProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const sql = "update stplusc1_myapp.projects set ? where proId = ? ";
                const result = yield connectMySQL_1.default.query(sql, [req.body, id]);
                // const result = await pool3.query(
                //   "UPDATE stplusc1_myapp.projects set ? ",
                //   [req.body] + " WHERE ProjId = '" + [id] + "' "
                // );
                console.log(result);
                res.json({ message: "update Project Success = " + result });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updateProjectApp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                // const result = await pool3.query(
                //   "UPDATE stplusc1_myapp.projects set ? ",
                //   [req.body] + " WHERE proId = '" + [id] + "' "
                // );
                const sql = "update stplusc1_myapp.projects set ? where proId = ? ";
                console.log(sql);
                const result = yield connectMySQL_1.default.query(sql, [req.body, id]);
                console.log(result);
                res.json({ message: "update Project Success = " + [req.body] + ' , ' + [id] });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updateUserLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const result = yield connectMySQL_1.default.query("UPDATE stplusc1_myapp.user_login set ? ", [req.body] + " WHERE PRS_NO = '" + [id] + "' ");
                console.log(result);
                res.json({ message: "update Project Success = " + [req.body] });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updateTimeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const result = yield connectMySQL_1.default.query("UPDATE stplusc1_myapp.tma set ? ", [req.body] + " WHERE empId = '" + [id] + "' ");
                console.log(result);
                res.json({ message: "update Project Success = " + [req.body] });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updateAssignById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const result = yield connectMySQL_1.default.query("UPDATE stplusc1_myapp.projassign set ? ", [req.body] + "WHERE proId = '" + [id] + "' ");
                console.log(result);
                res.json({ message: "update Project Success = " + [req.body] });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
const projectController = new ProjectController();
exports.default = projectController;
