require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");

const checkForSession = require("./middlewares/checkForSession");

const swagController = require("./controllers/swag_controller");
const authController = require("./controllers/auth_controller");
const cartController = require("./controllers/cart_controller");

let port = process.env.SERVER_PORT || 3005;

const app = express();
app.use(json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
// app.get('/api/swag').read.then((req,res,next)=>{
//     res.status(200).json()
// })

//Swag
app.get("/api/swag", swagController.read);

//Auth
app.get("/api/user", authController.getUser);
app.post("/api/login", authController.login);
app.post("/api/signout", authController.signout);
app.post("/api/register", authController.register);

// Cart
app.post("/api/cart", cartController.add);
app.post("/api/cart/checkout", cartController.checkout);
app.delete("/api/cart", cartController.delete);

// Search
app.get("/api/search", search_controller.search);

app.use(checkForSession);
app.use(express.static(`${__dirname}/build`));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
