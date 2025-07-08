import express, { Application, Request, Response } from 'express'
import { bookRoutes } from './app/controllers/books.controller';
import { borrowRoutes } from './app/controllers/borrow.controller'
const cors = require('cors');

const app: Application = express();

// Enable CORS for all origins
app.use(cors());

app.use(express.json());


app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome Library app')
});

export default app;