const express=require("express");
const app=express();
const env=require("dotenv")
const multer=require("multer")
const cloudinary=require("./utils/cloudinary")
const cors=require("cors");
const path=require("path");
const { urlencoded } = require("express");


env.config()
app.use(express.json())
app.use(cors())
app.use("/images",express.static(path.join(__dirname,"/images")));
app.use(urlencoded({limit:"50mb",extended:false}))
require("./db")

const storage=multer.diskStorage({})

const upload=multer({storage:storage});

// app.post("/api/upload",upload.single("file"),(req,res)=>{
//     res.status(200).json("file uploaded successfully")
// }) 
app.post('/api/upload', upload.single("img"),async (req, res) => {
    try{
    // console.log("file details: ", req.file);
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // console.log("result: ", result);
    res.status(200).send(result.url);
}
catch(err){console.log("this   ",err)}
  });  
  


app.use("/api/auth",require("./routes/auth"))
app.use("/api/user",require("./routes/user"))
app.use("/api/post",require("./routes/post"))
app.use("/api/categories",require("./routes/categories"))


app.listen(process.env.PORT,()=>{
    console.log(`backend is running on ${process.env.PORT}`);
})