import mongoose from 'mongoose';

interface Options {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {

    static async connect(options: Options){

        const { mongoUrl, dbName } = options;

        try {
            await mongoose.connect(mongoUrl, {dbName});
            console.log('MongoDB connected');
        } catch (error) {
            throw error;
        }
    }
}