import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://raulgodii:ULLUxCQFGMcHc7Xy@cv-builder.oitxlec.mongodb.net/");
        console.log(">>> DB is connected");
    } catch (error) {
        console.log(error);
    }
}
