const Mysql         = require("mysql");
const DBConnection  = require("./connection");

class WallModel {

    constructor () {}

    get_all_details = async () => {
        let response_data = { status: false, result: {}, error: null };

        try {
            let get_user_query = Mysql.format(` SELECT * FROM walls;`);
            response_data = await DBConnection.executeQuery(get_user_query);
        }
        catch(error) {
            response_data.error = error;
        }
        return response_data;
    }
    
    get_next_id = async () => {
        let response_data = { status: false, result: {}, error: null };

        try {
            let get_user_query = Mysql.format(` SELECT * FROM messages ORDER BY id DESC LIMIT 0,1;`);

            response_data = await DBConnection.executeQuery(get_user_query);
        }
        catch (error) {
            response_data.error = error;
        }
        response_data = response_data.result;
        return response_data;
    }

    addMessage = async (user_data) => {
        let response_data = { status: false, result: {}, error: null };

        try {
            let addingmessage = Mysql.format(`  INSERT INTO messages (user_id, message, created_at)
                                                    VALUES (?, ?, NOW())`,
                                                    [
                                                        user_data.user_id,
                                                        user_data.message
                                                    ]);
            response_data = await DBConnection.executeQuery(addingmessage);
        }
        catch (error) {
            response_data.error = error;
        }
        return response_data;
    }

    addComment = async (user_data) => {
        let response_data = { status: false, result: {}, error: null };

        try {
            let addingcomment = Mysql.format(`  INSERT INTO comments (user_id, message_id, comment, created_at)
                                                    VALUES (?, ?, ?, NOW())`,
                                                    [
                                                        user_data.user_id,
                                                        user_data.message_id,
                                                        user_data.comment
                                                    ]);
            response_data = await DBConnection.executeQuery(addingcomment);
        }
        catch (error) {
            response_data.error = error;
        }
        return response_data;
    }

    deleteComment = async (user_data) => {
        let response_data = { status: false, result: {}, error: null };

        try {
            let delete_comment = Mysql.format(`  DELETE FROM comments WHERE id = ?`, user_data.comment_id );

            response_data = await DBConnection.executeQuery(delete_comment);
        }
        catch (error) {
            response_data.error = error;
        }
        return response_data;
    }

    deleteMessage = async (user_data) => {
        let response_data = { status: false, result: {}, error: null };

        try {
            let delete_message = Mysql.format(`  DELETE FROM messages WHERE id = ?` , user_data.message_id );

            response_data = await DBConnection.executeQuery(delete_message);
        }
        catch (error) {
            response_data.error = error;
        }
        return response_data;
    }

    organized = async () => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let all_data = await this.get_all_details();
            response_data.result = all_data.result;
        }
        catch (error) {
            response_data.error = error;
        }
        return response_data;
    }
}
module.exports = new WallModel();