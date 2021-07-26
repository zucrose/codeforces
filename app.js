const express=require("express");
const bodyparser=require("body-parser");
const https=require("https");
const ejs=require("ejs");
const { urlencoded } = require("body-parser");
const app=express();
app.set('view engine' ,'ejs')
app.use(express.urlencoded({extended:true}));
app.post("/",(req,res)=>{
    const user1=req.body.user1;
    const user2=req.body.user2;
    let userobj1,userobj2;
    https.get("https://codeforces.com/api/user.rating?handle="+user1,(response)=>{
        response.on("data",(data)=>{
          userobj1=JSON.parse(data);
          https.get("https://codeforces.com/api/user.rating?handle="+user2,(response1)=>{
            response1.on("data",(data)=>{
             userobj2=JSON.parse(data);
           const arr=[];
           userobj2.result.forEach(element => {
             //   console.log(element.contestId);
                const bruh=userobj1.result.map(x=>x.contestId).indexOf(element.contestId);
                if(bruh!=-1)
                arr.push( { cName:element.contestName,frank:userobj1.result[bruh].rank,srank:element.rank});
            });
            
                  
            res.render("result",{user1:user1,user2:user2 ,arr:arr});
         })
        })
        })
    })
   
        
        
})
   
   
app.get("/",(req,res)=>{
    res.render("home");

})
app.listen(3000,()=>{console.log("server running")})