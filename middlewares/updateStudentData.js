const updateStudentData = (req, res, next) => {
    const { name, surname } = req.body;
    const avatar = req.file;

    res.header(
        "updatedData",
        JSON.stringify({
            name,
            surname,
            avatar: avatar?.originalname, 
        })
    );
  
    next();
};

export default updateStudentData;
