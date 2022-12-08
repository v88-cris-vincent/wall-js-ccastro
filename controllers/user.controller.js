const MD5               = require("md5");
const UserModel         = require("../models/user.model");
const { checkFields }   = require("../helpers/index.helper");
const e                 = require("express");

class UserController {
    #req;
    #res;

    constructor (req, res) {
        this.#req = req;
        this. #res = res;
    }

    login = async () => {
        let response_data = { status: false, result: {}, error: null };

        try {
            let check_fields = checkFields(["email_address", "password"], this.#req.body);

            if(check_fields.result && check_fields.result.password !== undefined) {
                let user = await UserModel.getUser(["email = ? AND password = ?"], [check_fields.result.email_address, MD5(check_fields.result.password)]);
                
                if(user.result.length) {
                    response_data.status = true;
                    this.#req.session.user = user.result;
                    response_data.user = this.#req.session.user;
                }
                else {
                    response_data.status = false;
                    response_data.error = "Incorret Email Address / Password, please try again.";
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

    register = async () => {
        let response_data = { status: false, result: {}, error: null };

        try {
            let check_fields = checkFields(["first_name", "last_name", "email_address", "password"], this.#req.body);

            if(check_fields.status){
                let user = await UserModel.getUser("email = ?", [check_fields.result.email_address]);

                if(user.status && user.result.length) {
                    response_data.error = "Email Address already exist.";
                }
                else {
                    let create_user = await UserModel.createUser({ ...check_fields.result, password: check_fields.result.password});
                    
                    if(create_user.status) {
                        response_data.status = true;
                    }
                    else {
                        response_data.error = "Error encountered while creating a new user.";
                    }
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

    logoff = async () => {
        this.#req.session.user = null;
        this.#res.redirect("/");
    }


}
module.exports = UserController;