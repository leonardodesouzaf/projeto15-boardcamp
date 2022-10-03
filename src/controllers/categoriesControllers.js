import connection from '../database/database.js';

export async function getCategories (req, res){
    try {
        const query = await connection.query('SELECT * FROM categories;');
        return res.status(200).send(query.rows);
    } catch (error) {
       return res.status(500).send('Não foi possível conectar ao servidor!');
    }
};

export async function postCategories (req, res){
    try {
        const query = await connection.query('INSERT INTO categories (name) VALUES ($1)',[req.body.name]);
        return res.status(201).send();
    } catch (error) {
       return res.status(500).send('Não foi possível conectar ao servidor!');
    }
};

