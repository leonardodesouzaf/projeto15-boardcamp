import connection from '../database/database.js';

export async function getCustomersByCpf (req, res){
    try {
        let query;
        if(req.query.cpf){
            query = await connection.query(`SELECT * FROM customers WHERE lower(cpf) LIKE lower($1);`,[`${req.query.cpf}%`]);
        }else{
            query = await connection.query(`SELECT * FROM customers;`);
        }
        return res.status(200).send(query.rows); 
    } catch (error) {
       return res.status(500).send('Não foi possível conectar ao servidor!');
    }
};

export async function getCustomersById (req, res){
    try {
        let query = await connection.query(`SELECT * FROM customers WHERE id = $1;`,[req.params.id]);
        if(query.rows.length === 0){
            return res.status(404).send();
        }
        return res.status(200).send(query.rows); 
    } catch (error) {
       return res.status(500).send('Não foi possível conectar ao servidor!');
    }
};

export async function postCustomers (req, res){
    try {
        const verificationCpf = await connection.query(`SELECT * FROM customers WHERE cpf = $1;`,[req.body.cpf]);
        if(verificationCpf.rows.length != 0){
            return res.status(409).send('Cliente já cadastrado!');
        }
        let query = await connection.query(`INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4);`,[req.body.name,req.body.phone,req.body.cpf,req.body.birthday]);
        return res.status(201).send(); 
    } catch (error) {
       return res.status(500).send('Não foi possível conectar ao servidor!');
    }
};

export async function updateCustomers (req, res){
    try {
        const verificationCpf = await connection.query(`SELECT * FROM customers WHERE cpf = $1;`,[req.body.cpf]);
        if(verificationCpf.rows.length != 0 && verificationCpf.rows.id != req.params.id){
            return res.status(409).send(verificationCpf.rows);
        }
        await connection.query(`UPDATE customers SET name=$1,phone=$2,cpf=$3,birthday=$4 WHERE id=$5;`,[req.body.name,req.body.phone,req.body.cpf,req.body.birthday,req.params.id]);
        return res.status(201).send(); 
    } catch (error) {
       return res.status(500).send('Não foi possível conectar ao servidor!');
    }
};

