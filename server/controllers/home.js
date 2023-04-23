import db from "./database.js"

export const get = async(req, res)=>{

   console.log("Retriving Homepage: ")

    db.collection("home").findOne({type: "homepage"},(err, data)=>{
      //  console.log(data, "Home page")
       if(data){
          const home = data.data;
 
          db.collection("collections").find({id:{$in:home.collections}}).toArray()
          .then((result)=>{
            //  console.log(result)
             if(result){
                home.collections = result
                res.send(home);
             }else{
                   res.send("-1");
             }
          })
       }
       else{
          res.send(null)}
    })
 }

 
export const home = async(req, res)=>{
   res.send("Welcome to Roy's Creation")
}