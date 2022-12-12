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
    #user;

    constructor (req, res) {
        this.#req = req;
        this.#res = res;

        if(this.#req.session && this.#req.session.user !== undefined) {
            this.#user = this.#req.session.user;
        }
        else {
            this.#res.json({error: "You must be log in."});
        }
    }

    messagePost = async () => {
        let response_data = { status: false, result: {}, error: null };
        
        try {
            let check_fields = checkFields(["message", "user_id"], this.#req.body);

            if(check_fields.status) {
                let message = await WallModel.addMessage({message:check_fields.result.message, user_id:check_fields.result.user_id});
            
                if(message.status && message.result.affectedRows) {
                    response_data.status = true;
                }
                else {
                    response_data.error = "No message has added, something went wrong!";
                }
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

    commentPost = async () => {
        let response_data = { status: false, result: {}, error: null };

        try {
            let check_fields = checkFields(["comment", "user_id", "message_id"], this.#req.body);

            if(check_fields.status) {
                let comment = await WallModel.addComment({comment: check_fields.result.comment, user_id: check_fields.result.user_id, message_id: check_fields.result.message_id});
                
                if(comment.status && comment.result.affectedRows) {
                    response_data.status = true;
                }
                else {
                    response_data.error = "No comment has added, something went wrong!";
                }
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

    deleteMessage = async () => {
        let response_data = { status: false, result: {}, error: null };
        let user_id = this.#req.session.user;
        let id=user_id[0].id;

        try {
            let check_fields = checkFields(["message_id", "message_user_id"], this.#req.body);
            
            if(check_fields.status) {
                let delele_a_message = await WallModel.deleteMessage({message_id: check_fields.result.message_id, message_user_id: check_fields.result.message_user_id});
                
                if(delele_a_message.status && delele_a_message.result.affectedRows) {
                    response_data.status = true;
                }
                else {
                    response_data.error = "No message has deleted!";
                }
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

    deleteComment = async () => {
        let response_data = { status: false, result: {}, error: null };
        let user_id = this.#req.session.user;
        let id=user_id[0].id;

        try {
            let check_fields = checkFields(["comment_id", "comment_user_id"], this.#req.body);
            
            if(check_fields.status) {
                let delele_a_comment = await WallModel.deleteComment({comment_id: check_fields.result.comment_id, comment_user_id: check_fields.result.comment_user_id});
                
                if(delele_a_comment.status && delele_a_comment.result.affectedRows) {
                    response_data.status = true;
                }
                else {
                    response_data.error = "No comment has  deleted!";
                }
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