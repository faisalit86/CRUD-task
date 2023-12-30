
const addProduct=async(req,res)=>{
    const {product_name}=req.body
    try {
        return res.status(200).send("product name is:",product_name)        
    } catch (error) {
        console.log("error")
        return res.send(400).send(error.message)
    }
}


module.exports={
    addProduct
}