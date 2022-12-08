const { Router }     = require("express");
const ViewController = require("../controllers/view.controller");
const UserController = require("../controllers/user.controller");
const WallController = require("../controllers/wall.controller");

const WallRoute = Router();

WallRoute.get("/", (req, res) => { new ViewController(req, res).homepage(); });
WallRoute.post("/login", (req, res) => { new UserController(req, res).login(); });
WallRoute.post("/register", (req, res) => { new UserController(req, res).register(); });
WallRoute.get("/wall", (req, res) => { new WallController(req, res).wall(); });
WallRoute.post("/wall", (req, res) => { new WallController(req, res).wall(); });
WallRoute.get("/organized", (req, res) => { new WallController(req, res).organized(); });
WallRoute.post("/message_post", (req, res) => { new WallController(req, res).message_post(); });
WallRoute.post("/comment_post", (req, res) => { new WallController(req, res).comment_post(); });
WallRoute.get("/delete_comment/:id", (req, res) => { new WallController(req, res).delete_comment(); });
WallRoute.get("/logoff", (req, res) => { new UserController(req, res).logoff(); });


module.exports = WallRoute;