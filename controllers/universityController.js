import { University, universityValidation } from '../models/UniersityModel.js';
import { deleteManyOldImage, deleteSingleOldImage } from "../utils/deleteOldImage.js";
import jwt from "jsonwebtoken";
export const GetUniveristy = async (req, res) => {
    const university = await University.find().populate('faculties', 'name -_id').populate({
        path: "students",
        select: "name surname  ,-_id",
        populate: {
            path: "faculty",
            select: "name ,-_id",
        }
    });
    var token = jwt.sign({name:'Adil' , surname :"Ibadov" , address:"Baku"}, "PrivateKey")
    res.header("my-token",token).status(200).send(university);
};

export const GetUniversityById = async (req, res) => {

    const university = await University.findById(req.params.id).populate('faculties', 'name -_id').populate({
        path: "students",
        select: "name surname  ,-_id",
        populate: {
            path: "faculty",
            select: "name ,-_id",
        }
    });
    if (!university) {
        return res.status(404).send({ message: "University not found" });
    }
    res.status(200).send(university);

};

export const CreateUniversity = async (req, res) => {
    const { error } = universityValidation(req.body);
    if (error) {
        return res.status(400).send(error.message);
    } else {
        let fileObj = req.files;
        let filesObjLength = Object.keys(fileObj).length;
        if (filesObjLength === 0) {
            const university = new University(req.body);
            const result = await university.save();
            res.status(201).send(result);
        } else {
            const university = new University(req.body);
            const uploadFiles = [];
            req.files.images.map(async item => {
                uploadFiles.push(item.path)
            })
            university.images = uploadFiles;
            university.coverImg = req.files.coverImg[0].path;
            const result = await university.save();
            res.status(201).send(result);
        }
    }
};

export const UpdateUniversity = async (req, res) => {
    const { error } = universityValidation(req.body);
    const paramsId = req.params.id;
    if (error) {
        return res.status(400).send(error.message);
    } else {
        let university;
        university = await University.findById(paramsId);
        if (!university) {
            return res.status(404).send("University Not Found");
        } else {
            let fileObj = req.files;
            let filesObjLength = Object.keys(fileObj).length;
            if (filesObjLength === 0) {
                university = await University.findByIdAndUpdate(paramsId, { ...req.body });
                await university.save();
                res.status(200).send(university);
                // res.status(200).json(university);
            } else {
                university = await University.findByIdAndUpdate(paramsId, { ...req.body });
                deleteSingleOldImage(university.coverImg);
                deleteManyOldImage(university.images);
                const uploadFiles = [];
                req.files.images.map(async item => {
                    uploadFiles.push(item.path)
                });
                university.images = uploadFiles;
                university.coverImg = req.files.coverImg[0].path;
                const result = await university.save();
                res.status(200).send(result);
            }
        }
    }
};

export const DeleteUniversity = async (req, res) => {
    const Id = req.params.id;
    if (Id === "all") {
        await University.deleteMany();
        res.status(200).send({ message: "All University deleted" });
    }
    else {
        const university = await University.findByIdAndDelete(Id);
        deleteSingleOldImage(university.coverImg);
        deleteManyOldImage(university.images);
        if (!university) {
            return res.status(404).send({ message: "University not found" });
        }
        res.status(200).send({ message: "University deleted" });
    }
};
