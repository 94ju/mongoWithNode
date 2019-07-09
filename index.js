const mongoose=require("mongoose");
const exprees = require("express");
const bodyParser=require("body-parser");
const app=exprees();
const cors=require("cors");
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json())

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
app.post('/users',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    // header.Add("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
    const course=await new Course(
        {
            // "tags":req.body.tags,
            // "date":req.body.date,
            "name":req.body.name,
            "author":req.body.author,
            "isPublished":req.body.isPublished,
            "price":req.body.price

        }
    )
    await console.log(req.body)
    await console.log("check")
    await console.log(course)
    await course.save();
    await res.send(course)
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
        // tags:[String],
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
 function addUser(){
    const user=new Course({"tags":["angular check","frontend"],
    "date":"2018-01-24T21:56:15.353Z",
    "name":"Flask",
    "author":"Janith",
    "isPublished":true,
    "price":15});
    user.save();
}
// addUser();
getuser();
//getCourses();

app.listen(3000);


