const pool = require('../db')

const pagination =async (req,res,next) => {
    try{
        var {page , limit} = req.query;
        page = Number(page);
        limit = Number(limit);
        const offset =(page-1)*limit;

        const data =await pool.query("SELECT * FROM items ORDER BY id limit $1 offset $2",[limit,offset]);
        res.json(data.rows);
        next();
    }
    catch(err){
        console.log(err)
    }
}

module.exports = pagination;