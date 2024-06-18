import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();

app.use(express.json());
/* app.use(
  cors({
    origin: 'http://localhost:8081',
    credentials: true,
  })
); */
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// Router
import { router as userRouter } from './routes/user.routes';
import { globalErrorHandler } from './middlewares/errorHandler.middleware';

app.use('/api/v1/user', userRouter);

// Error Handlers
app.use(globalErrorHandler);

export { app };
