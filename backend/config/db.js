import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://hewageiroshan3:pasindu123@cluster0.m7as14z.mongodb.net/food-del').then(()=>console.log("DB Connected"))
}

// export const connectDB = async () => {
//     await mongoose.connect('mongodb+srv://isuru:1234@atlascluster.l6f8mrt.mongodb.net/newfood?retryWrites=true&w=majority&appName=AtlasCluster').then(()=>console.log("DB Connected"))
// }