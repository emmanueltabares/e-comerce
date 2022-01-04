import Joi from 'joi';

const PASS_RE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const userSchema = Joi.object({
    firstName: Joi.string().min(4).max(15).required(),
    lastName: Joi.string().min(4).max(15).required(),
    email: Joi.string().email().required(),
    username: Joi.string().min(5).max(10).required(),
    password: Joi.string().regex(PASS_RE).required(),
})

export const authSchema = Joi.object({
    firstname: Joi.string().min(5).required(),
    lastname: Joi.string().min(5).required(),
    phone: Joi.string().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required(),
    username: Joi.string().required(),
    calle: Joi.string().required(),
    altura: Joi.string().required(),
    cp: Joi.string().required(),
    piso: Joi.string(),
    depto: Joi.string(),
    admin: Joi.boolean(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    repeat_password: Joi.ref('password'),
  }).with('password', 'repeat_password');

export const loginSchema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required(),
    password: Joi.string().required(),
  });
