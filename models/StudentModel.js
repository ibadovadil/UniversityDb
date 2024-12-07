import Joi from "joi";
import mongoose, { Schema } from "mongoose";

const studentSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    university: {//one to many
        type: Schema.Types.ObjectId,
        ref: "University",
    },
    faculty: {//one to many
        type: Schema.Types.ObjectId,
        ref: "Faculty",
    },
    avatar:{
        type:String
    }
});

export const studentValidation = (student) => {
    const schema = new Joi.object({
        name: Joi.string().required(),
        surname: Joi.string().required(),
        age: Joi.number().required().integer().min(17).max(95),
        university: Joi.string(),
        faculty: Joi.string(),
    });
    return schema.validate(student);
};

export const Student = mongoose.model("Student", studentSchema);