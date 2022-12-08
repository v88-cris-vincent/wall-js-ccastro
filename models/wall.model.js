const Mysql         = require("mysql");
const DBConnection  = require("./connection");

class WallModel {

    constructor () {}

    get_all_messages = async () => {
        let response_data = { status: false, result: {}, error: null };

        try {
            let get_user_query = Mysql.format(` SELECT messages.id AS message_id,
                                                    message AS message_content,
                                                    DATE_FORMAt(messages.created_at, "%M %D %Y") AS message_date,
                                                    messages.user_id,
                                                    CONCAT(u1.first_name," ",u1.last_name) AS message_sender_name
                                                    FROM messages
                                                    LEFT JOIN users u1 on messages.user_id = u1.id;`);
            response_data = await DBConnection.executeQuery(get_user_query);
        }
        catch(error) {
            response_data.error = error;
        }
        return response_data;
    }
    
    get_all_comments = async () => {
        let response_data = { status: false, result: {}, error: null };

        try {
            let get_user_query = Mysql.format(` SELECT comments.id AS comment_id,
                                                    comments.user_id,
                                                    comments.message_id,
                                                    comment AS comment_content,
                                                    DATE_FORMAt(comments.created_at, "%M %D %Y") AS comment_date,
                                                    CONCAT(u1.first_name," ",u1.last_name) AS comment_sender_name
                                                    FROM comments
                                                    LEFT JOIN users u1 on comments.user_id = u1.id
                                                    ORDER BY comments.message_id DESC, comments.created_at ASC;`);
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
                                                    VALUES ("${user_data.user_id}", "${user_data.message}", NOW());`);
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
                                                    VALUES ("${user_data.user_id}", "${user_data.message_id}", "${user_data.comment}", NOW());`);
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
            let deletecomment = Mysql.format(`  DELETE FROM comments WHERE id = "${user_data.comment_id}";` );

            response_data = await DBConnection.executeQuery(deletecomment);
        }
        catch (error) {
            response_data.error = error;
        }
        return response_data;
    }

    deleteMessage = async (user_data) => {
        let response_data = { status: false, result: {}, error: null };

        try {
            let deletecomment = Mysql.format(`  DELETE FROM messages WHERE id = "${user_data.message_id}";` );

            response_data = await DBConnection.executeQuery(deletecomment);
        }
        catch (error) {
            response_data.error = error;
        }
        return response_data;
    }

    organized = async () => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let all_messages = await this.get_all_messages();
            let all_comments = await this.get_all_comments();
            let organized_contents = {};
            let organized_comments = {};
            let messages = all_messages.result;
            let comments = all_comments.result;

            for(let message_index in messages){
                let message = messages[message_index];

                organized_contents[message.message_id] = {...message};
                organized_comments.comments = {};
                
                for(let comment_index in comments) {
                    let comment = comments[comment_index];

                    if(message.message_id === comment.message_id) {
                        organized_contents[message.message_id].comment = [{...comment}];
                    }
                }
            }
            console.log("2 "+organized_contents);
            response_data.result = organized_contents;
        }
        catch (error) {
            response_data.error = error;
        }
        return response_data;
    }
}
module.exports = new WallModel();