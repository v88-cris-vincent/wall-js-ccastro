const MD5               = require("md5");
const UserModel         = require("../models/user.model");
const WallModel         = require("../models/wall.model");
const { checkFields }   = require("../helpers/index.helper");
const session           = require("express-session");
const DBconnection = require("../models/connection");
const wallModel = require("../models/wall.model");

class WallController {
    #req;
    #res;

    constructor (req, res) {
        this.#req = req;
        this.#res = res;
    }

    wall = async () => {
        let response_data = { status: false, result: {}, error: null };
        var organized_contents = await WallModel.organized();
        var user = this.#req.session.user;
        
        if(organized_contents !== undefined) {
            var result = organized_contents.result;
        }
        
        var message_id = await WallModel.get_next_id();

        if(message_id >0) {
            var next_id = message_id[0].id + 1;
        }
        else {
            var next_id = 1;
        }

        if(user !== undefined) {
            this.#res.render("wall.ejs",{result, user, next_id});
        }
        else {
            this.#res.redirect("/");
        }        
    }

    message_post = async () => {
        let response_data = { status: false, result: {}, error: null };
        let user_id = this.#req.session.user;
        let id = user_id[0].id;

        try {
            let check_fields = checkFields(["message", "user_id"], this.#req.body);

            if(check_fields.status) {
                response_data.status = true;
                let message = await WallModel.addMessage({message:check_fields.result.message, user_id:check_fields.result.user_id});
            }
            else {
                response_data = check_fields;
            }
        }
        catch (error) {
            response_data.error = error;
        }
        this.#res.json(response_data);
    }

    comment_post = async () => {
        let response_data = { status: false, result: {}, error: null };
        let user_id = this.#req.session.user;
        let id=user_id[0].id;

        try {
            let check_fields = checkFields(["comment", "user_id", "message_id"], this.#req.body);

            if(check_fields.status) {
                response_data.status = true;
                let comment = await WallModel.addComment({comment: check_fields.result.comment, user_id: check_fields.result.user_id, message_id: check_fields.result.message_id});
            }
            else {
                response_data = check_fields;
            }
        }
        catch (error) {
            response_data.error = error;
        }
        this.#res.json(response_data);
    }

    delete_comment = async (comment_id) => {
        let response_data = { status: false, result: {}, error: null };
        let user_id = this.#req.session.user;
        let id=user_id[0].id;

        try {
            let check_fields = checkFields(["comment_id", "comment_user_id"], this.#req.body);
            console.log(check_fields);
            if(check_fields.status) {
                response_data.status = true;
                let delele_a_comment = await WallModel.deleteComment({comment_id: comment_id, comment_user_id: check_fields.result.comment_user_id});
                //console.log(delele_a_comment);
            }
            else {
                response_data = check_fields;
            }
        }
        catch (error) {
            response_data.error = error;
        }
        this.#res.json(response_data);
    }

    delete_message = async (message_id) => {
        let response_data = { status: false, result: {}, error: null };
        let user_id = this.#req.session.user;
        let id=user_id[0].id;

        try {
            let check_fields = checkFields(["message_id", "message_user_id"], this.#req.body);
            console.log(check_fields);
            if(check_fields.status) {
                response_data.status = true;
                let delele_a_message = await WallModel.deleteMessage({message_id: message_id, message_user_id: check_fields.result.message_user_id});
                //console.log(delele_a_message);
            }
            else {
                response_data = check_fields;
            }
        }
        catch (error) {
            response_data.error = error;
        }
        this.#res.json(response_data);
    }
}
module.exports = WallController;