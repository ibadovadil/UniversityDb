import mongoose from "mongoose";
const password = "Salam123"
const connection = async () => {
    await mongoose.connect(`mongodb+srv://adilibadov:${password}@universitycluster.yadlg.mongodb.net/?retryWrites=true&w=majority&appName=universityCluster}`);
    console.log("Database connected successfully");
}
export default connection;