import { Injectable, OnModuleInit } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class MongoService implements OnModuleInit {
    private readonly connectionString: string = process.env.CONNECTION_STRING || '';

    async onModuleInit() {
        if (!this.connectionString) {
            throw new Error('CONNECTION_STRING is not defined in environment variables.');
        }

        try {
            mongoose.set('strictQuery', true);
            await mongoose.connect(this.connectionString);
            console.log('MongoDB connection successful!');
        } catch (error) {
            console.error('MongoDB connection error:', error);
            throw error;
        }
    }

    async disconnect() {
        try {
            await mongoose.disconnect();
            console.log('MongoDB connection closed.');
        } catch (error) {
            console.error('Error disconnecting MongoDB:', error);
        }
    }
}