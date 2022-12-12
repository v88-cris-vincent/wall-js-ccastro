const WallModel         = require("../models/wall.model");
const session           = require("express");

class ViewController {
    #req;
    #res;

    constructor(req, res){
        this.#req = req;
        this.#res = res;
    }

    homepage = async () => {
        if(this.#req.session.user === undefined) {
            this.#res.render("login.ejs");
        }
        else {
            this.#res.redirect("/wall");
        }
    }

    wall = async () => {
        var organized_contents = await WallModel.organized();
        var result = new Array;

        if(organized_contents !== undefined) {
            result = organized_contents.result;
        }
        
        var message_id = await WallModel.get_next_id();

        if(message_id >0) {
            var next_id = message_id[0].id + 1;
        }
        else {
            var next_id = 1;
        }

        if(this.#req.session.user !== undefined || this.#req.session.user === null) {
            let user = this.#req.session.user;
            this.#res.render("wall.ejs",{result,user, next_id});
        }
        else {
            this.#res.redirect("/");
        }        
    }

    logoff = async () => {
        this.#req.session.user = undefined;
        this.#res.redirect("/");
        
    }
}

module.exports = ViewController;