import joi from 'joi';

export default async function customersSchema(req, res, next) {
    const customersSchema = joi.object({
        name: joi.string().required(),
        phone: joi.string().min(10).max(11).required(),
        cpf: joi.string().length(11).required(),
        birthday: joi.date().required()
    });
    const validation = customersSchema.validate(req.body, { abortEarly: true });
    if (validation.error) {
        return res.status(400).send('Insira corretamente!');
    }
    next();
}