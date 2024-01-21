

express = require('express');
eobj = express();
port = 5555;

const {MongoClient}=require("mongodb");
const URL="mongodb://localhost:27017";
var bodyParser = require("body-parser");
const client=new MongoClient(URL);
///////////////////////////////////////////////
// GetConnection
// it is used to connect node + express server
///////////////////////////////////////////////

async function getConnection(){
    let result=await client.connect();
    let db = result.db("MarvellousInfosystems");
    return db.collection("batches");
}
/////////////////////////////////////////////////
// readData
// it entery point function
/////////////////////////////////////////////////
let result;
async function readData(){
    let data = await getConnection();
    
    data = await data.find().toArray();
    console.log("Data from the database is as below");
    console.log(data);
    result=data;
    //return data.toString();

}
/////////////////////////////////////////////////
// main
// it entery point function
/////////////////////////////////////////////////
function main(){
    let ret;
    ret=getConnection();
    console.log("Database Connected");  
    
}
main()



// To handle CORS
// Cross Origin Resource Sharing
eobj.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin",
    "http://localhost:4200");

    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept");

    next();
});

function Starter()
{
    console.log("Marvellous serever is in listening mode at : "+port);
}

eobj.connect(client);
eobj.listen(port,Starter);


function MarvellousGet(req,res)
{
    res.send("Marvellous server started...");
}


eobj.get('/',MarvellousGet);

function MarvellousBatches(req,res)
{
    readData(); 
    res.send(result)
}

eobj.get('/getBatches',MarvellousBatches);
