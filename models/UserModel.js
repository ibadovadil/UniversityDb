import Joi from "joi";
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";


const userSchema = Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        active: {
            type: Boolean,
            default: true,
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            enum: ['member', 'moderator', 'admin', 'superAdmin'],
            default: "member"
        }
    },
    { timestamps: true }
);

export const userValidate = (user) => {
    const schema = Joi.object({
        role: Joi.string(),
        fullname: Joi.string()
            .required()
            .messages({
                "string.base": "Full name must be a text value.",
                "string.empty": "Full name cannot be empty.",
                "any.required": "Full name is required.",
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({
                "any.required": "Email is required.",
                "string.empty": "Email cannot be empty.",
                "string.email": "Invalid email format.",
            }),
        phone: Joi.string()
            .pattern(/^(051|050|077|070|055|099)\d{7}$/, "valid phone number")
            .required()
            .messages({
                "string.base": "The phone number must be a string.",
                "string.empty": "The phone number cannot be empty.",
                "string.pattern.name":
                    "The phone number must start with 051, 050, 077, 070, 055, or 099 and be exactly 10 digits long.",
                "any.required": "The phone number is required.",
            }),
        active: Joi.boolean().default(true),
        password: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .required()
            .messages({
                "string.pattern.base": "Password should be between 3 to 30 characters and contain letters or numbers only.",
                "string.empty": "Password cannot be empty.",
                "any.required": "Password is required.",
            }),
    });

    return schema.validate(user);
};


export const loginValidate = (user) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                "any.required": "Email is required.",
                "string.empty": "Email cannot be empty.",
                "string.email": "Invalid email format.",
            }),
        password: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .required()
            .messages({
                "string.pattern.base": "Password should be between 3 to 30 characters and contain letters or numbers only.",
                "string.empty": "Password cannot be empty.",
                "any.required": "Password is required.",
            }),
    });
    return schema.validate(user);
};


userSchema.methods.createAuthToken = function () {
    const decodeToken = jwt.sign({ fullname: this.fullname,role:this.role }, "jwtPrivateKey");
    return decodeToken;
};


export const User = mongoose.model("User", userSchema);
