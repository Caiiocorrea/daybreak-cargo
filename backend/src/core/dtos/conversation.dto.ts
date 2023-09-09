import * as Joi from 'joi';

export const conversationSchema = Joi.object({
    offset: Joi.number().integer().messages({
        'number.base': 'O campo offset deve ser do tipo inteiro'
    }),
    limit: Joi.number().integer().messages({
        'number.base': 'O campo limit deve ser do tipo inteiro'
    }),
    _id: Joi.string().optional().messages({
        'string.base': 'O campo _id deve ser do tipo string'
    }),
    nome: Joi.string().optional().messages({
        'string.base': 'O campo nome deve ser do tipo string'
    }),
    sobrenome: Joi.string().optional().messages({
        'string.base': 'O campo sobrenome deve ser do tipo string'
    }),
    email: Joi.string().optional().messages({
        'string.base': 'O campo email deve ser do tipo string'
    }),
});