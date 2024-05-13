const pool =  require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = 'this_is_my_secret_key';

exports.signup = async(req, res)=>{
    try {
        const {username,role,password} = req.body;
        const salt=await bcrypt.genSalt(10);
        const value=await bcrypt.hash(password, salt);  

        const userRecord = await pool.query("INSERT INTO users (username,role,password) VALUES($1,$2,$3) RETURNING *",[username,role,value]);

        res.status(200).json(userRecord.rows[0]);
        console.log('user added')
    }
     catch (error) {
        console.log(error)
    }
 
}


exports.login = async  (req, res) => {
    try {
        const user = req.body;
        const {username , role , password} = user
    
        const reqRecord = await pool.query("SELECT * FROM users WHERE username =$1",[username]);
        if((await reqRecord).rows.length===0 ) {
            console.log("no user with this name exist")
            return res.send("no such user exist")
        }
        const ismatch = await bcrypt.compare(password,reqRecord.rows[0].password)
        if(!ismatch){
            console.log("password mismatch"  )
            return res.send("password doesnot match");
        }
        
        // generate token
        const token = jwt.sign({username,role}, secretKey);
        res.json(token)

    } catch (error) {
        console.log(error)
    }
   
}


