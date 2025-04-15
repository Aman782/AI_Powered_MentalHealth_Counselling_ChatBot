import mongoose from 'mongoose';

export const dbConnection = async function main(){
    try{
        await mongoose.connect("mongodb+srv://amanpandey45692:HdniOiYc0txo9Dep@cluster0.f2deq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("DB Connected SuccessFully!");
    }catch(e){
       console.log("Mongo ERR: ", e);
    }
}


// HdniOiYc0txo9Dep