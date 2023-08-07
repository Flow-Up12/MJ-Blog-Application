const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://Marcosje2005:Marcosjim1@cluster0.hdub5ju.mongodb.net/")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})


const userInfo=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password: {
      type: Number,
      default: 0
    },
})

const UserInfoCollection =new mongoose.model('userInfo',userInfo)

module.exports=UserInfoCollection