const testToken = async (req, res, next) => {
    try {
        const token = "testToken";  //value
        const incomingToken = req.headers['my-token'];
        if (!Object.keys(req.headers).includes('my-token')) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!incomingToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

export default testToken