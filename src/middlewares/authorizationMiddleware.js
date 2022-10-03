import postgres from "../db/db.js";

let db = await postgres();

export default async function authorizationMiddleware(req, res, next) {
    /* const token = req.headers.authorization?.replace('Bearer ', '');
    if(!token) return res.status(401).send('Login não autorizado!');
    const session = await db.collection("sessions").findOne({ token : token });       
    if (!session) {
        return res.status(401).send('Login não autorizado!'); 
    }
    const user = await db.collection("users").findOne({ _id: new ObjectId(session.userId )});

    delete user.password;
    res.locals.user = user;
  
    next(); */
  }