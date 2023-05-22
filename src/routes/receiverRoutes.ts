import { Router } from 'express';
import {createReceivers, getAllreceivers, receiversDetails,receiversDetailsDelets} from '../controller/ReceiverControllers'

export const receiversRouter: Router = Router();
receiversRouter.post('/', createReceivers);
receiversRouter.get('/listAll', getAllreceivers);
receiversRouter.patch('/update',receiversDetails);
receiversRouter.delete('/',receiversDetailsDelets);