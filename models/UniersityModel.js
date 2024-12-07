import Joi from "joi";
import mongoose, { Schema } from "mongoose";

const universitySchema = Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    faculties: [{//may to many
        type: Schema.Types.ObjectId,
        ref: 'Faculty'
    }],
    students: [{//one to many
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
    coverImg: {
        type: String
    },
    images:{
        type:[String]
    }
});


export const universityValidation = (university) => {
    const Schema = new Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        faculties: Joi.array().items(Joi.string()),
        students: Joi.array().items(Joi.string()),
        coverImg: Joi.string(),
        images: Joi.array().items(Joi.string()),
    })
    return Schema.validate(university)
};

export const University  = mongoose.model("University" , universitySchema);
