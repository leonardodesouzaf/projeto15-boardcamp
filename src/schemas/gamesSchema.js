import joi from 'joi';

export default async function gamesSchema(req, res, next) {
    const gamesSchema = joi.object({
        name: joi.string().required(),
        image: joi.string().required(),
        stockTotal: joi.number().min(1).required(),
        categoryId: joi.number().required(),
        pricePerDay: joi.number().min(1).required()
    });
    const validation = gamesSchema.validate(req.body, { abortEarly: true });
    if (validation.error) {
        return res.status(400).send('Insira corretamente!');
    }
    next();
}