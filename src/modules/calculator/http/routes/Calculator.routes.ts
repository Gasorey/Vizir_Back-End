import { Router } from 'express';
import CalculatorController from '../controller/CalculatorController';

const calculatorRouter = Router();

const calculatorController = new CalculatorController();

calculatorRouter.post('/', calculatorController.calculate);

export default calculatorRouter;
