import { loginValidate, User, userValidate } from "../models/UserModel.js";
import bcrypt from "bcrypt";


export const userAuth = async (req, res) => {
    const { error } = loginValidate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message })
    } else {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Wrong Username or Password" })
        }
        const token = user.createAuthToken();
        res.header("x-auth-token", token).send(token);
        // const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY,
        //     { expiresIn: '1h' }
        // );
        // res.json({ token, userId: user._id });
    }

};



export const userList = async (req, res) => {
    const user = await User.find();
    res.status(200).send(user);
};
export const createUser = async (req, res) => {
    const { error } = userValidate(req.body);
    if (error) {
        return res.status(400).send(error.message);
    } else {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(401).send("User already exist!")
        } else {
            // if (req.body.role === "admin") {

            //     res.status(403).send("Don't run, Stop, I'll say word")
            // } else {
            //     const hashPassword = await bcrypt.hash(req.body.password, 10)
            //     user = new User(req.body);
            //     user.password = hashPassword;
            //     const token = user.createAuthToken();
            //     await user.save();
            //     res.status(201).header("x-auth-token", token).send(user);
            // }

            let hasAdmin = false;

            if (user && Array.isArray(user)) {
                hasAdmin = user.find((element) => element.role === "admin");
            } else {
                user = [];
            }

            if (hasAdmin) {
                res.status(403).send("Don't run, Stop, I'll say word");
            } else {
                const hashPassword = await bcrypt.hash(req.body.password, 10);
                const newUser = new User(req.body);
                newUser.password = hashPassword;
                const token = newUser.createAuthToken();
                await newUser.save();
                res.status(201).header("x-auth-token", token).send(newUser);
            }
        }
    }
}
export const updateUser = async (req, res) => {
    const { error } = userValidate(req.body);
    if (error) {
        return res.status(400).send(error.message);
    } else {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send(user);
    }
}
export const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).send({ message: "user not found" });
    }
    res.status(200).send({ message: "user deleted" });
}