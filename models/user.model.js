const Mysql         = require("mysql");
const MD5           = require("md5");
const DBConnection  = require("./connection");

class UserModel {

    constructor () {

    }

    //for validation if user is existing and reuse in other function
    getUser = async (where_fields, where_params) => {
        let response_data = { status: false, result: {}, error: null };

        try {
            let get_user_query = Mysql.format(` SELECT * FROM users WHERE ${where_fields};`, where_params);

            response_data = await DBConnection.executeQuery(get_user_query);
        }
        catch (error) {
            response_data.error = error;
        }
        return response_data;
    }

    //registration of user
    createUser = async (user_data) => {
        let response_data = { status: false, result: {}, error: null };

        try {
            let create_user_query = Mysql.format(`  INSERT INTO users (first_name, last_name, email, password, created_at)
                                                        VALUES ("${user_data.first_name}", "${user_data.last_name}", "${user_data.email_address}", MD5("${user_data.password}"), NOW())`);

            response_data = await DBConnection.executeQuery(create_user_query);
        }
        catch (error) {
            response_data.error = error;
        }
        return response_data;
    }
}
module.exports = new UserModel();