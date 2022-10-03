import connection from '../database/database.js';

export async function getRentals (req, res){
    try {
        let query;
        let result = [];
        if(req.query.gameId){
            query = await connection.query(`
            SELECT 
                rentals.*,customers.name as "customername",customers.id as "customerid",games.name as "gamename",games.id as "gameid",games."categoryId" as "gamecategoryId",categories.name as "gamecategoryName"
            FROM 
                rentals
            JOIN
                customers
            ON
                customers.id = rentals."customerId"
            JOIN
                games
            ON 
                rentals."gameId" = $1 
            JOIN
                categories
            ON
                categories.id = games."categoryId";
            `,[req.query.gameId]);
            for (let i = 0; i < query.rows.length; i++) {
                let data = query.rows[i];
                let rental = {
                    id: data.id,
                    customerId: data.customerId,
                    gameId: data.gameId,
                    rentDate: data.rentDate,
                    daysRented: data.daysRented,
                    returnDate: data.returnDate,
                    originalPrice: data.originalPrice,
                    delayFee: data.delayFee,
                    customer: {
                        id: data.customerid,
                        name: data.customername
                    },
                    game: {
                        id: data.gameid,
                        name: data.gamename,
                        categoryId: data.gamecategoryId,
                        categoryName: data.gamecategoryName
                    }
                };
                result.push(rental);
            }
        }if(req.query.customerId){
            query = await connection.query(`
            SELECT 
                rentals.*,customers.name as "customername",customers.id as "customerid",games.name as "gamename",games.id as "gameid",games."categoryId" as "gamecategoryId",categories.name as "gamecategoryName"
            FROM 
                rentals
            JOIN
                customers
            ON
                customers.id = $1
            JOIN
                games
            ON 
                rentals."gameId" = games.id 
            JOIN
                categories
            ON
                categories.id = games."categoryId";
            `,[req.query.customerId]);
            for (let i = 0; i < query.rows.length; i++) {
                let data = query.rows[i];
                let rental = {
                    id: data.id,
                    customerId: data.customerId,
                    gameId: data.gameId,
                    rentDate: data.rentDate,
                    daysRented: data.daysRented,
                    returnDate: data.returnDate,
                    originalPrice: data.originalPrice,
                    delayFee: data.delayFee,
                    customer: {
                        id: data.customerid,
                        name: data.customername
                    },
                    game: {
                        id: data.gameid,
                        name: data.gamename,
                        categoryId: data.gamecategoryId,
                        categoryName: data.gamecategoryName
                    }
                };
                result.push(rental);
            }
        }
        return res.status(200).send(result); 
    } catch (error) {
       return res.status(500).send('Não foi possível conectar ao servidor!');
    }
};


