import express, { Application, Request, Response } from 'express'
import { bookRoutes } from './controllers/books.controller';
import { borrowRoutes } from './controllers/borrow.controller';

const app: Application = express();

app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome Library app')
});

export default app;