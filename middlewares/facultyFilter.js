const facultyFilter = (req, res, next) => {
    const header = req.headers["faculty-filter"]; 

    switch (header) {
        case "1":
            res.header("data", "this is 1"); 
            break;
        case "2":
            res.header("data", "This is 2"); 
            break;
        default:
            res.header("data","Someting went wrong!!!");
            break;
    }

    next(); 
};

export default facultyFilter;
