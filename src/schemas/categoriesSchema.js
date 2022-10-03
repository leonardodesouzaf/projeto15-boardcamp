import joi from 'joi';

export default async function categoriesSchema(req, res, next) {
    const categoriesSchema = joi.object({
        name: joi.string().required(),
    });
    const validation = categoriesSchema.validate(req.body, { abortEarly: true });
    if (validation.error) {
        return res.status(400).send('Insira corretamente!');
    }
    next();
}