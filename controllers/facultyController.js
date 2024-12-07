import { Faculty, facultyValidation } from "../models/FacultyModel.js";
import {University} from "../models/UniersityModel.js"
export const GetFaculty = async (req, res) => {
    const faculty = await Faculty.find().populate({
        path: 'students',
        select: 'name surname age -_id',
        populate: ({
            path: 'university',
            select: 'name -_id'
        })
    }).populate({
        path: 'universities',
        select: 'name -_id'
    });
    res.status(200).send(faculty)
};

export const GetFacultyById = async (req, res) => {
    const facultyId = req.params.id;
    const faculty = await Faculty.findById(facultyId).populate({
        path: 'students',
        select: 'name surname age -_id',
        populate: ({
            path: 'university',
            select: 'name -_id'
        })
    }).populate({
        path: 'universities',
        select: 'name -_id'
    });
    if (!faculty) {
        return res.status(404).send({ message: "Faculty not found" });
    }
    res.status(200).send(faculty)
};

export const CreateFaculty = async (req, res) => {
    const { error } = facultyValidation(req.body);
    if (error) {
        return res.status(400).send(error.message);
    } else {
        const faculty = new Faculty(req.body);
        await faculty.save();
        if (req.body.universities && req.body.universities.length > 0) {
            await University.updateMany(
                { _id: { $in: req.body.universities } },
                { $addToSet: { faculties: faculty._id } }
            );
        }
        res.status(201).send(faculty)
    }
};

export const UpdateFaculty = async (req, res) => {
    const {error} = facultyValidation(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }else{
        const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send(faculty);
    }
};

export const deleteFaculty = async (req, res) => {
    const Id = req.params.id;
    if (Id === "all") {
        await Faculty.deleteMany();
        res.status(200).send({ message: "All Faculty deleted" });
    }
    else {
        const faculty = await Faculty.findByIdAndDelete(Id);
        if (!faculty) {
            return res.status(404).send({ message: "Faculty not found" });
        }
        res.status(200).send({ message: "Faculty deleted" });
    }
};


