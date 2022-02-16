import Joi from 'joi';

export const ProductSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    cod: Joi.number()
        .required(),

    description: Joi.string()
        .min(10)
        .max(30)
        .required(),

    photos: Joi.array()
        .items(Joi.string()),
    
    price: Joi.number()
        .positive()
        .min(1)
        .required(),
    
    stock: Joi.number()
        .positive()
        .required()
    
}) 

export const updateProductSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    cod: Joi.number()
        .required(),

    description: Joi.string()
        .min(10)
        .max(30)
        .required(),

    photo: Joi.string(),
    
    price: Joi.number()
        .positive()
        .min(1)
        .required(),
    
    stock: Joi.number()
        .positive()
        .required()
})
