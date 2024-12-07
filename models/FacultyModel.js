import Joi from "joi";
import mongoose, { Schema } from "mongoose";

const facultySchema= Schema({
    name:{
        type:String,
        required:true
    },
    students:[{ //one to many
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
    universities:[{//many to many
        type: Schema.Types.ObjectId,
        ref: 'University'
    }]
});

export const facultyValidation = (faculty)=>{
    const schema = new Joi.object({
        name: Joi.string().required(),
        students: Joi.array().items(Joi.string()),
        universities: Joi.array().items(Joi.string())
    })
    return schema.validate(faculty);
};

export const Faculty = mongoose.model("Faculty",facultySchema);