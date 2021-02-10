const db = require('./con');

class TodoModel {
    constructor(id, task, status, user_id){
        this.id = id;
        this.task = task;
        this.status = status;
        this.user_id = user_id;
    }

    
    static async getAll() {
        const response = await db.any(
            `SELECT * FROM to_do;`)
            return response;
        }
    
    static async addEntry(task, user_id) {
        const query = `INSERT INTO to_do (task, status, user_id) VALUES ('${task}', 'false', ${user_id}); `;
        const response = await db.result(query);
        return response;
    }

    static async updateStatus(task, status) {
        const response = await db.result(`UPDATE to_do SET status = ${status} WHERE type = '${task}';`);
        return response;
    }
}

module.exports = TodoModel;