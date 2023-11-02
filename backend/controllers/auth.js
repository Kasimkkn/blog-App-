import {db} from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";
  
    db.query(q, [req.body.email, req.body.username], (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Internal server Error" });
      }
      if (data.length) {
        return res.status(409).json({ message: "User already exists!" });
      }
  
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
  
      const insertQuery = "INSERT INTO users (`username`, `email`, `password`) VALUES ?";
      const values = [[req.body.username, req.body.email, hash]];
  
      db.query(insertQuery, [values], (err, data) => {
        if (err) {
          return res.status(500).json({ message: "Internal Server Error" });
        }
        return res.status(200).json({ message: "User has been created." });
      });
    });
  };
  
export const login = (req,res)=>{
    const q = "SELECT * FROM users WHERE username = ?";
    
    db.query(q,[req.body.username],(err,data) =>{
        if(err) return res.status(500).json(err)
        if(data.length===0 ) return res.status(404).json("User not found!");

        const isPassword = bcrypt.compareSync(req.body.password,data[0].password);

        if(!isPassword) return res.status(400).json("Wrong username or password!");

        const token = jwt.sign({id : data[0].id},"hellokasim");
        const {password,...other} = data[0];

        res.cookie("access_token",token,{
            httpOnly:true,
        }).status(200).json(other);
    })
}

export const logout = (req, res) => {
    res.clearCookie("access_token",{
      sameSite:"none",
      secure:true
    }).status(200).json("User has been logged out.")
  };