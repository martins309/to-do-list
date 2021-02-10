
const db = require('./con'),
bcrypt = require('bcryptjs');

class User {
constructor (id, email, password, first_name, last_name) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
}


static async addUser(email, password, first_name, last_name) {
    try {
        const query = `INSERT INTO users (email, password, first_name, last_name) VALUES ('${email}', '${password}', '${first_name}', '${last_name}') RETURNING id;`;
        const response = await db.one(query);
        return response;
    }catch (error){
        return error.message;
    }
}

checkPassword(hashedPassword) {
    return bcrypt.compareSync(this.password, hashedPassword);
}

async login() {
    try {
        const query = `SELECT * FROM users WHERE email = ${this.email}`;
        const response = await db.one(query);

        const isValid = this.checkPassword(response.password);
        if(!!isValid) {
            const { id, first_name, last_name } = response;
            return { isValid, user_id: id, first_name, last_name }
        }else {
            return { isValid }
        }
    } catch (error) {
        return error.message;
    }
}
}

module.exports = User;