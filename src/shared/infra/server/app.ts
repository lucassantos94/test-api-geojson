import express, { urlencoded } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import api from './api';

const app = express();
app.use(morgan('tiny'));
app.use(urlencoded({ extended: true }));
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

app.use('/', api);
export default app;
