import { Student, studentValidation } from '../models/StudentModel.js';
import { Faculty } from '../models/FacultyModel.js';
import { University } from "../models/UniersityModel.js";
import { deleteSingleOldImage } from "../utils/deleteOldImage.js";


export const getStudent = async (req, res) => {
    const student = await Student.find().populate("university", "name -_id").populate("faculty", "name -_id");
    res.status(200).send(student);
};
export const getStudentById = async (req, res) => {
    const student = await Student.findById(req.params.id).populate("university", "name -_id").populate("faculty", "name -_id");
    if (!student) return res.status(404).send({ message: 'Student not found' });
    res.status(200).send(student);
};

export const createStudent = async (req, res) => {
    const { error } = studentValidation(req.body);
    if (error) {
        return res.status(400).send(error.message);
    } else {
        const { faculty, university } = req.body;
        const isFacultyInUniversity = await Faculty.find({ _id: faculty, universities: university });
        if (!isFacultyInUniversity) {
            res.status(400).send("The faculty does not belong to the given university")
        }
        const student = new Student(req.body);

        // add student to uni
        await University.findByIdAndUpdate(university, {
            $addToSet: { students: student._id }
        });

        //add student to faculty
        await Faculty.findByIdAndUpdate(faculty, {
            $addToSet: { students: student._id }
        });
        if (!req.file) {
            const result = await student.save();
            res.status(201).send(result);
        } else {
            student.avatar = req.file.path;
            const result = await student.save();
            res.status(201).send(result);
        }
    }
};

export const updateStudent = async (req, res) => {
    const { error } = studentValidation(req.body);
    if (error) {
        return res.status(400).send(error.message);
    } else {
        let paramsId = req.params.id;
        let student;
        student = await Student.findById(paramsId);
        if (!student) {
            return res.status(404).send("Cannot find student");
        } else {
            if (!req.file) {
                const result = await student.save();
                student = await Student.findByIdAndUpdate(req.params.id, { ...req.body });
                res.status(200).send(result);
            } else {
                await Student.findByIdAndUpdate(paramsId, { ...req.body });
                const oldAvatar = student.avatar;
                deleteSingleOldImage(oldAvatar);
                student.avatar = req.file.path;
                var result = await student.save();
                res.status(200).send(result);
            }
        }
    }
};


export const deleteStudent = async (req, res) => {
    const Id = req.params.id;
    if (Id === "all") {
        await Student.deleteMany();
        deleteSingleOldImage(student.avatar)
        res.status(200).send({ message: "All Student deleted" });
    }
    else {
        const student = await Student.findByIdAndDelete(Id);
        deleteSingleOldImage(student.avatar)
        if (!student) {
            return res.status(404).send({ message: "Student not found" });
        }
        res.status(200).send({ message: "Student deleted" });
    }
};