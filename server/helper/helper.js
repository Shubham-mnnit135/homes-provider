import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const hashPassword = (password) => {
  //    bcrypt.genSalt(12).then((salt) =>{
  //        console.log(salt);
  //        return bcrypt.hash(password,salt);
  //    }).then((hash => {
  //     console.log(hash);
  //     return  hash;
  //    })).catch(err => console.log(err));

  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      console.log("salt : ", salt);
      if (err) reject(err);
      bcrypt.hash(password, salt, (err, hash) => {
        console.log("hash : ", hash);
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
};

export const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};



export const verifyToken = async (req, res, next) => {
  const token = req.body.token;
  const userInfo = req.body.user;
  if (token) {
    console.log("yes token : ", token);
    jwt.sign({name:userInfo.name,email:userInfo.email,id:userInfo.id},process.env.JWT_SECRET_KEY,{},async (err, newToken) => {
        if (err) throw err;
        const match = await comparePassword(newToken, token);
        if (match) {        
          next();
        } else {
          res.send({
            message: "not authorized",
          });
          return ;
        }
      }
    );
   
  } else {
    console.log("notoken");
    res.send({
      message: "unothorized user",
    });
    return ;
  }
};
