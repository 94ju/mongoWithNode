const mongoose=require("mongoose");
const exprees = require("express");
const app=exprees();

app.get('/',async(req,res)=>{
    const cousers=await getCourses();
    res.send(cousers);
});

app.get('/home',(req,res)=>{
    getCourses().then(
        (respose)=>res.send(respose)
    )
})

app.get('/users',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    const user=await getuser();
    res.send(user);
})


mongoose.connect(
    'mongodb://localhost/mongo-exercises'
).then(
    ()=>console.log('connected to mongodb')
).catch(
    (error)=>console.log(error)
)
const courseSchema=new mongoose.Schema(
    {
        tags:[String],
        date:{
            type:Date,
            default:Date.now
        },
        name:String,
        isPublished:Boolean,
        price:Number
    }
);

const Course=mongoose.model('Course',courseSchema);

async function getCourses(){
    const courses=await Course.find().
    select({name:1,author:1,price:1})
    .sort({price:-1});
    return courses;  
}

async function getuser(){
    // const user =await Course.find({name:"Node.js Course"});
    const user =await Course.find();
    return user;
}
getuser();
//getCourses();

app.listen(3000);


