const pool =  require('../db');

exports.addItem =async (req,res)=>{
    try {
       const {name,discription} =req.body;

       const itemRecord= await pool.query("INSERT INTO items (name,discription) VALUES($1,$2) RETURNING *", [name,discription]);
       res.status(200).json( itemRecord.rows[0]);
         
       console.log("record updated") 

    } catch (error) {
        console.log(error);
    }
    
}
exports.showItem = async (req,res) => {
    try{
        const data = await pool.query("SELECT * FROM items")
        res.json(data.rows)
        console.log(data.rows)
    }
    catch(err){
        console.log(err)
    }
}

exports.showOneItem =async (req,res) => {
    try{
        const {id}= req.params;
        const data = await pool.query("SELECT * FROM items WHERE id = $1",[id]);
        res.json(data.rows[0]);
    }
    catch(err){
        console.log(err)
    }

}

exports.editItem = async (req, res) => {
    try {
        
        const {id} = req.params;
        const {name, discription} = req.body;
        const reqItem = pool.query("SELECT * FROM items WHERE id = $1",[id])

        const updatedItem ={
            name :name||reqItem.name,
            discription :discription||reqItem.discription
        }

        pool.query("UPDATE items SET name =$1 ,discription = $2 WHERE id = $3",[updatedItem.name,updatedItem.discription,id])
        res.status(200).send("data updated")
        console.log("data updated")

    } catch (error) {
        console.log(error)
    }
}

exports.deleteItem = async(req,res)=>{

   try{ 
    const {id} = req.params;
    const record =await pool.query("DELETE FROM items WHERE id = $1",[id])
    res.status(200).send({msj:"data deleted",
        log_deleted : record.rows[0]
    })
    console.log("item deleted")
    }
    catch(error) {
        console.log(error);
    }
}