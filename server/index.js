import express from 'express'
import admin from "./routes/admin.js"
import user from "./routes/user.js"
import home from "./routes/home.js"
import product from './routes/products.js'
import collection from './routes/collections.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import fileupload from 'express-fileupload'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(cors());
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '_temp/'
  }));

    app.use("/",home)
    app.use("/admin",admin)
    app.use("/user",user)
    app.use("/product", product);
    app.use("/collection", collection);
    app.use("/",express.static("assets/images/"));

    app.listen(5000,()=>{
    console.log("Server running...")
});