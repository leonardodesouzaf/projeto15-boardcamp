import connection from '../database/database.js';

export async function getGames (req, res){
    try {
        let query;
        if(req.query.name){
            query = await connection.query(`SELECT * FROM games WHERE lower(name) LIKE lower($1);`,[`${req.query.name}%`]);
            /* query = await connection.query(`
            SELECT 
                games.*,categories.name as "categoryName"
            FROM 
                categories 
            JOIN 
                games
            ON 
                games."categoryId" = categories.id;
            WHERE 
                lower(games.name) LIKE lower($1);
        `,[`${req.query.name}%`]); */
        }else{
            query = await connection.query(`SELECT * FROM games;`);
        }
        query = await connection.query(`
            SELECT 
                games.*,categories.name as "categoryName"
            FROM 
                categories 
            JOIN 
                games
            ON 
                games."categoryId" = categories.id;
        `);
        return res.status(200).send(query.rows); 
    } catch (error) {
       return res.status(500).send('Não foi possível conectar ao servidor!');
    }
};

export async function postGames (req, res){
    try {
        const verificationName = await connection.query(`SELECT * FROM games WHERE name = $1;`,[req.body.name]);
        if(verificationName.rows.length != 0){
            return res.status(409).send('Nome já utilizado, digite outro!');
        }
        const verificationId = await connection.query(`SELECT id FROM categories WHERE id = $1;`,[req.body.categoryId]);
        if(verificationId.rows.length === 0){
            return res.status(400).send('Categoria de jogo não existe!');
        }
        await connection.query(`INSERT INTO games (name,image,"stockTotal","categoryId","pricePerDay") VALUES ($1,$2,$3,$4,$5);`,[req.body.name,req.body.image,req.body.stockTotal,req.body.categoryId,req.body.pricePerDay]);
        return res.status(201).send(); 
    } catch (error) {
       return res.status(500).send('Não foi possível conectar ao servidor!');
    }
};