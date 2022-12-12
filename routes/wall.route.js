const { Router }     = require("express");
const ViewController = require("../controllers/view.controller");
const UserController = require("../controllers/user.controller");
const WallController = require("../controllers/wall.controller");

const WallRoute = Router();

WallRoute.get("/", (req, res) => { new ViewController(req, res).homepage(); });
WallRoute.get("/wall", (req, res) => { new ViewController(req, res).wall(); });
WallRoute.get("/logoff", (req, res) => { new ViewController(req, res).logoff(); });

WallRoute.post("/login", (req, res) => { new UserController(req, res).login(); });
WallRoute.post("/register", (req, res) => { new UserController(req, res).register(); });

WallRoute.post("/message_post", (req, res) => { 
    try{
        new WallController(req, res).messagePost()
    }
    catch(error) {
        res.json({error: error.message})
    }; });
WallRoute.post("/delete_message", (req, res) => {
    try{
        new WallController(req, res).deleteMessage()
    }
    catch(error) {
        res.json({error: error.message})
    }; });

WallRoute.post("/comment_post", (req, res) => {
    try{
        new WallController(req, res).commentPost()
    }
    catch(error) {
        res.json({error: error.message})
    }; });
WallRoute.post("/delete_comment", (req, res) => {
    try {
        new WallController(req, res).deleteComment()
    }
    catch(error) {
        res.json({error: error.message})
    }; });



module.exports = WallRoute;