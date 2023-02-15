const mongoose=require("mongoose");
require("dotenv").config();
const connection=mongoose.connect(process.env.DBURL);
module.exports={connection}; 