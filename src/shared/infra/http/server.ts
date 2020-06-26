import 'reflect-metadata';
import 'dotenv';

import { errors } from 'celebrate';
import cors from 'cors';
import 'express-async-errors';
import express from 'express';
import routes from './routes';
import '../../containers';
import '../typeorm';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(errors());

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server is up on port 3333');
});
