const express= require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app =express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  const query=req.body.cityName;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=98c66e5a78eb99f1640d887dd47e4312&units=metric";
  https.get(url,function(response){
  console.log(response.statusCode);
  response.on("data",function(data){
  const weatherdata=JSON.parse(data)//to covert hexadecimal data into strings.
   console.log(weatherdata);
   const temp=weatherdata.main.temp;
   console.log(temp);
   const description=weatherdata.weather[0].description;
   console.log(description);
   const icon=weatherdata.weather[0].icon;
   const imageurl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
   res.write("<p>The weather is currently "+ description +" </p>");
   res.write("<h1>The temperature in "+query+" is " + temp + " degrees Celsius.</h1>");
   res.write("<img src="+imageurl+">");
   res.send();
  })
  })


})


app.listen(3000,function(){
  console.log("server is running in port 3000");
})
