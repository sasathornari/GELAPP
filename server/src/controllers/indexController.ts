import { Request, Response } from "express";

import pool1 from "../connectBPlus";
import pool2 from "../connectAX";


class IndexController {
 
  /*========================================================================*/
  /*-------- Business Plus --------*/
  public async getEmployee(req: Request, res: Response) {
    await pool1.query("select * from GEL.dbo.EMPFILE", function(
      err: any,
      row: any,
      fields: any
    ) {
      const listproject = JSON.parse(JSON.stringify(row, null, 4));
      console.log(row.recordsets[0]);
      res.json(row.recordsets[0]);
    });
  }

  public async listAllEmployees(req: Request, res: Response) {
    await pool1.query(
      "select PRS_NO,EMP_I_CARD,EMP_INTL,EMP_NAME,EMP_SURNME,EMP_GENDER," +
        "EMP_MARITAL,EMP_BIRTH,PRS_JBT,JBT_THAIDESC,PRS_DEPT,DEPT_THAIDESC " +
        "from GEL.dbo.PERSONALINFO " +
        "inner join GEL.dbo.EMPFILE on EMP_KEY = PRS_EMP " +
        "inner join GEL.dbo.JOBTITLE on PRS_JBT = JBT_KEY " +
        "inner join GEL.dbo.DEPTTAB on PRS_DEPT = DEPT_KEY " +
        "order by PRS_NO",
      function(err: any, row: any, fields: any) {
        const listproject = JSON.parse(JSON.stringify(row, null, 4));
        console.log(row.recordsets[0]);
        res.json(row.recordsets[0]);
      }
    );
  }

  public async getEmpByDept(req: Request, res: Response) {
    const {id} = req.params;
    await pool1.query(
      "select PRS_NO,EMP_I_CARD,EMP_INTL,EMP_NAME,EMP_SURNME,EMP_GENDER," +
        "EMP_MARITAL,EMP_BIRTH,PRS_JBT,JBT_THAIDESC,PRS_DEPT,DEPT_THAIDESC " +
        "from GEL.dbo.PERSONALINFO " +
        "inner join GEL.dbo.EMPFILE on EMP_KEY = PRS_EMP " +
        "inner join GEL.dbo.JOBTITLE on PRS_JBT = JBT_KEY " +
        "inner join GEL.dbo.DEPTTAB on PRS_DEPT = DEPT_KEY " +
        "where DEPT_KEY = " + [id] +
        " order by PRS_NO",
      function(err: any, row: any, fields: any) {
        const listproject = JSON.parse(JSON.stringify(row, null, 4));
        console.log(row.recordsets[0]);
        res.json(row.recordsets[0]);
      }
    );
  }

   public async getEmpId(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    try {
      const result = await pool1.query(
        "select PRS_NO,EMP_I_CARD,EMP_INTL,EMP_NAME,EMP_SURNME,EMP_GENDER," +
          "EMP_MARITAL,EMP_BIRTH,PRS_JBT,JBT_THAIDESC,PRS_DEPT,DEPT_THAIDESC " +
          "from GEL.dbo.PERSONALINFO " +
          "inner join GEL.dbo.EMPFILE on EMP_KEY = PRS_EMP " +
          "inner join GEL.dbo.JOBTITLE on PRS_JBT = JBT_KEY " +
          "inner join GEL.dbo.DEPTTAB on PRS_DEPT = DEPT_KEY " +
          "where PRS_NO = " +
          [id]
      );
      console.log(result);
      res.json(result.recordsets[0]);
    } catch (error) {
      console.log(error);
    }
  }

  public async getAllDepartment(req: Request, res: Response): Promise<any> {
    await pool1.query("select * from GEL.dbo.DEPTTAB", function(
      err: any,
      row: any
    ) {
      const listproject = JSON.parse(JSON.stringify(row, null, 4));
      console.log(row.recordsets[0]);
      res.json(row.recordsets[0]);
    });
  }

  public async getDepartmentById(req: Request, res: Response): Promise<any> {
    const {id} = req.params;
    await pool1.query("select * from GEL.dbo.DEPTTAB where DEPT_KEY="+[id], function(
      err: any,
      row: any
    ) {
      const listproject = JSON.parse(JSON.stringify(row, null, 4));
      console.log(row.recordsets[0]);
      res.json(row.recordsets[0]);
    });
  }

  public async getUsername(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const { pass } = req.params;
    try {
      const result = await pool1.query(
        "select PRS_NO,EMP_I_CARD,EMP_INTL,EMP_NAME,EMP_SURNME,EMP_GENDER," +
          "EMP_MARITAL,EMP_BIRTH,PRS_JBT,JBT_THAIDESC,PRS_DEPT,DEPT_THAIDESC, " +
          "EMP_I_CARD as username, PRS_NO as password " +
          "from GEL.dbo.PERSONALINFO " +
          "inner join GEL.dbo.EMPFILE on EMP_KEY = PRS_EMP " +
          "inner join GEL.dbo.JOBTITLE on PRS_JBT = JBT_KEY " +
          "inner join GEL.dbo.DEPTTAB on PRS_DEPT = DEPT_KEY " +
          "where EMP_I_CARD = " +
          [id] +
          " and PRS_NO = " +
          [pass]
      );

      console.log(result);
      res.setHeader('Content-Type', 'application/json');
      res.json(result.recordsets[0]);

      //res.status(404).json({ text: "Username doesn't exits" });
    } catch (error) {
      console.log(error);
    }
  }

  public async getProfile(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    try {
      const result = await pool1.query(
        "select PRS_NO,EMP_I_CARD,EMP_INTL,EMP_NAME,EMP_SURNME,EMP_GENDER," +
          "EMP_MARITAL,EMP_BIRTH,PRS_JBT,JBT_THAIDESC,PRS_DEPT,DEPT_THAIDESC " +
          "from GEL.dbo.PERSONALINFO " +
          "inner join GEL.dbo.EMPFILE on EMP_KEY = PRS_EMP " +
          "inner join GEL.dbo.JOBTITLE on PRS_JBT = JBT_KEY " +
          "inner join GEL.dbo.DEPTTAB on PRS_DEPT = DEPT_KEY " +
          "where EMP_I_CARD = " +
          [id]
      );

      console.log(result);
      res.json(result.recordsets[0]);

      //res.status(404).json({ text: "Username doesn't exits" });
    } catch (error) {
      console.log(error);
    }
  }

  
    /*========================================================================*/
  /*-------- ERP AX --------*/
  public async getProjectInAX(req: Request, res: Response): Promise<any> {
    try {
      await pool2.query(
        "select ProjId,PROJGROUPID,NAME," +
          "DLVNAME,Status from ProjTable where PARENTID =' '",
        function(err: any, row: any) {
          const listproject = JSON.parse(JSON.stringify(row, null, 4));
          console.log(row.recordsets[0]);
          res.json(row.recordsets[0]);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  public async getIDAX(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const result = await pool2.query(
        "select ProjId,PROJGROUPID,NAME," +
          "DLVNAME,Status from ProjTable where PARENTID =' ' and ProjId = '" +
          [id] +
          "'"
      );
      console.log(result);
      res.json(result.recordsets[0]);
    } catch (error) {
      console.log(error);
    }
  }

  public async getGroupAX(req: Request, res: Response): Promise<any> {
    try {
      const { group } = req.params;
      const result = await pool2.query(
        "select ProjId,PROJGROUPID,NAME," +
          "DLVNAME,Status from ProjTable where PARENTID =' ' and PROJGROUPID = '" +
          [group] +
          "'"
      );
      console.log(result);
      res.json(result.recordsets[0]);
    } catch (error) {
      console.log(error);
    }
  }

  public async listGroupProject(req: Request, res: Response) {
    await pool2.query(
      "SELECT distinct PROJGROUPID FROM ProjTable where PARENTID =' '",
      function(err: any, row: any) {
        const listproject = JSON.parse(JSON.stringify(row, null, 4));
        console.log(row.recordsets[0]);
        res.json(row.recordsets[0]);
      }
    );
  }

 

  
}

const indexController = new IndexController();
export default indexController;
