import { Request, Response } from "express";
import pool from "../connectGEL";
//import pool3 from "../connectMySQL";

class PortalController {
    
/*========================================================================*/
  /*-------- MyApp --------*/
  public async createNewPost(req: Request, res: Response): Promise<void> {
    try {
      const result = await pool.query("INSERT INTO my3plus.post_news set ?", [
        req.body
      ]);
      console.log(result);
      res.json({ message: "Post News Success = " + [req.body] });
    } catch (error) {
      console.log(error);
    }
  }

  /*-------- Backend Website --------*/
  public async createUserWeb(req: Request, res: Response): Promise<void> {
    try {
      const result = await pool.query("INSERT INTO my3plus.user_login set ?", [
        req.body
      ]);
      console.log(result);
      res.json({ message: "Create new user login success = " + [req.body] });
    } catch (error) {
      console.log(error);
    }
  }

  public async getListUserWeb(req: Request, res: Response): Promise<any> {
    try {
        await pool.query("SELECT * FROM my3plus.user_login", function(err: any, row: any) {
          const listuserweb = JSON.parse(JSON.stringify(row, null, 4));
          res.json(listuserweb);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  public async findUserLogin(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const { pass } = req.params;
        await pool.query("SELECT * FROM my3plus.user_login where username = '" + [id] + "' and password = '" + [pass] + "' ", 
        function(err: any, row: any) {
          const listuserweb = JSON.parse(JSON.stringify(row, null, 4));
          res.json(listuserweb);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  public async findByUsername(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
        await pool.query("SELECT empId FROM my3plus.user_login where username = '" + [id] + "' ", 
        function(err: any, row: any) {
          const listuserweb = JSON.parse(JSON.stringify(row, null, 4));
          res.json(listuserweb);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  

  public async fileUploads(req: Request, res: Response): Promise<void> {
    try {
      const result = await pool.query("INSERT INTO my3plus.fileupload set ?", [
        req.body
      ]);
      console.log(result);
      res.json({ message: "Post News Success = " + [req.body] });
    } catch (error) {
      console.log(error);
    }
  }

  public async getPostCategory(req: Request, res: Response): Promise<any> {
    try {
        await pool.query("SELECT * FROM my3plus.post_category", function(err: any, row: any) {
          const listproject = JSON.parse(JSON.stringify(row, null, 4));
          res.json(listproject);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  public async getAllPost(req: Request, res: Response): Promise<any> {
    try {
        await pool.query("SELECT * FROM my3plus.post_news order by postId desc", function(err: any, row: any) {
          const listproject = JSON.parse(JSON.stringify(row, null, 4));
          res.json(listproject);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  public async getPostById(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
        await pool.query("SELECT * FROM my3plus.post_news where postId = "+ [id], function(err: any, row: any) {
          const listproject = JSON.parse(JSON.stringify(row, null, 4));
          res.json(listproject);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  public async getPostByCategory(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
        await pool.query("SELECT * FROM my3plus.post_news where post_category like '%"+ [id] + "%'", function(err: any, row: any) {
          const listproject = JSON.parse(JSON.stringify(row, null, 4));
          res.json(listproject);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  public async deletePost(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      await pool.query(
        "delete from my3plus.post_news where postId =" + [id],
        function (err: any, row: any) {
          const listproject = JSON.parse(JSON.stringify(row, null, 4));
          console.log(listproject);
          res.json(listproject);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  public async updatPost(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    console.log([req.body]);
    try {
      const result = await pool.query(
        "UPDATE my3plus.post_news set ? ",[req.body] + " where postId = " + [id]
      );
      console.log(result);
      res.json({ message: "update Project Success = " + [req.body] });
    } catch (error) {
      console.log(error);
    }
  }
}

const portalController = new PortalController();
export default portalController;