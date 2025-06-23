import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';

const port = 3000

let server: Server;

async function main() {
    try {
        await mongoose.connect('mongodb+srv://todosDB:2QJNzR5O2ig7VBLO@cluster0.ucdi4.mongodb.net/libraryAssignmentDB?retryWrites=true&w=majority&appName=Cluster0');
        server = app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
};

main()