const express=require("express");
const app=express();
const env=require("dotenv")
const multer=require("multer")
const path=require("path")


env.config()
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")));
require("./db")

const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"images");
    },
    filename: (req,file,cb)=>{
        cb(null,req.body.name)
    },
});
   
const upload=multer({storage:storage});


app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("file uploaded successfully")
})

app.use("/api/auth",require("./routes/auth"))
app.use("/api/user",require("./routes/user"))
app.use("/api/post",require("./routes/post"))
app.use("/api/categories",require("./routes/categories"))


app.listen(process.env.PORT,()=>{
    console.log(`backend is running on ${process.env.PORT}`);
})