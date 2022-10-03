import dayjs from 'dayjs';
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
            return res.status(200).send(result); 
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
            return res.status(200).send(result); 
        }
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
                rentals."gameId" = games.id
            JOIN
                categories
            ON
                categories.id = games."categoryId";
            `);
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
        return res.status(200).send(result); 
    } catch (error) {
       return res.status(500).send('Não foi possível conectar ao servidor!');
    }
};

export async function postRentals (req, res){
    try {
        if(req.body.daysRented < 1){
            return res.status(400).send('Ação inválida!');
        }
        let result;
        const verificationCustomer = await connection.query(`
        SELECT 
            id 
        FROM
            customers
        WHERE
            id=$1
        `, [req.body.customerId]);
        const verificationGame = await connection.query(`
        SELECT
            id,"pricePerDay","stockTotal"
        FROM
            games
        WHERE
            id=$1
        `, [req.body.gameId]);
        if(verificationCustomer.rows.length === 0 || verificationGame.rows.length === 0){
            return res.status(400).send('Ação inválida!');
        }
        const verificationAvailability = await connection.query(`
        SELECT
            *
        FROM
            rentals
        WHERE
            id=$1
        `, [req.body.gameId]);
        let availabilityCounter = 0;
        for (let i = 0; i < verificationAvailability.rows.length; i++) {
            if(verificationAvailability.rows[i].returnDate === null){
                availabilityCounter++;
            }
        }
        if(availabilityCounter >= verificationGame.rows[0].stockTotal){
            return res.status(400).send('Jogo esgotado, tente outro jogo!');
        }
        await connection.query(`
		INSERT INTO 
            rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
		VALUES
            ($1, $2, $3, $4, $5, $6, $7)
		`, [req.body.customerId, req.body.gameId, dayjs().format('YYYY-MM-DD'), req.body.daysRented, null, (verificationGame.rows[0].pricePerDay*req.body.daysRented), null])
        return res.status(201).send(result); 
    } catch (error) {
       return res.status(500).send('Não foi possível conectar ao servidor!');
    }
};

export async function endRentals (req, res){
    try {
        let result;
        const verificationRental = await connection.query(`
        SELECT 
            *
        FROM
            rentals
        WHERE
            id=$1
        `, [req.params.id]);
        if(verificationRental.rows.length === 0 || verificationRental.rows[0].returnDate !== null){
            return res.status(400).send('Ação inválida!');
        }
        const rentDate = new Date(verificationRental.rows[0].rentDate)
		const today = new Date(verificationRental.rows[0].returnDate)
		const totalDays = (today-rentDate) / (1000 * 3600 * 24)
		const delayDays = totalDays-verificationRental.rows[0].daysRented
        if(delayDays > 0){
			verificationRental.rows[0].delayFee = delayDays * verificationRental.rows[0].originalPrice
		}
        await connection.query(`
		UPDATE
            rentals 
        SET 
            "customerId"=$1,"gameId"=$2,"rentDate"=$3,"daysRented"=$4,"returnDate"=$5,"originalPrice"=$6, "delayFee"=$7
        WHERE
            id=$8;
		`, [verificationRental.rows[0].customerId, verificationRental.rows[0].gameId, verificationRental.rows[0].rentDate, verificationRental.rows[0].daysRented, dayjs().format('YYYY-MM-DD'), verificationRental.rows[0].originalPrice, verificationRental.rows[0].delayFee, req.params.id]);
        return res.status(200).send(result); 
    } catch (error) {
       return res.status(500).send('Não foi possível conectar ao servidor!');
    }
};


