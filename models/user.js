const db = require('../config/config');

const bcrypt = require('bcryptjs');

const User = {};

User.findById = (id, result) => {
    const sql = `
    
       SELECT
           id,
           email,
           name,
           lastname,
           image,
           password
       FROM
        users
       WHERE
           id = ?  

    `;

    db.query
        sql,
        [id],
        (err, user) => {
            if (err){
                console.log('ERROR: ', err);
                result(err, null);
            }
            else{
                console.log('Usuario Obtenido: ', user[0]);
                result(null, user[0]);
            }
        }
        
}

User.findByEmail = (email, result) => {
    const sql = `
    
       SELECT
           id,
           email,
           name,
           lastname,
           image,
           password
       FROM
        users
       WHERE
           email = ?  

    `;

    db.query
        sql,
        [email],
        (err, user) => {
            if (err){
                console.log('ERROR: ', err);
                result(err, null);
            }
            else{
                console.log('Usuario Obtenido: ', user);
                result(null, user);
            }
        }
        
        
       

}


User.create = async (user, result) => {

    const hash = await bcrypt.hash(user.password, 10);
    const sql = `
        INSERT INTO 
            users(
                email,
                name,
                lastname,
                phone,
                image,
                password,
                created_at,
                updated_at
            )

        VALUES(?, ?, ?, ?, ?, ?, ?, ?)    
    
    `;

    db.query(
        
        sql,
        [
            user.email,
            user.name,
            user.lastname,
            user.phone,
            user.image,
            hash,
            new Date (),
            new Date ()
        ],
        (err, res) => {
            if (err){
                console.log('ERROR: ', err);
                result(err, null);
            }
            else{
                console.log('Id del nuevo usuario: ', res.insertId);
                result(null, res.insertId);
            }
        }
        
        
        )
}

module.exports = User;