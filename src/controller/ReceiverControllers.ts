import { Request, Response } from 'express';
import receivers from '../models/Receiver'

export const createReceivers = async (req: Request, res: Response,) => {
  try {
    const newReceivers = await new receivers(req.body);
    newReceivers.save()
    res.send({
      message: 'new receivers created',
      data: newReceivers
    });
  } catch (error: any) {
    error(error);
    res.status(400).send({
      message: error.message
    });
  }
};

export const getAllreceivers = async (req: Request, res: Response) => {
  try {
    const receiversList = await receivers.find({ userId: req.query.id });
    res.send({
      message: 'all receivers listed',
      data: receiversList
    });
  } catch (error: any) {
    error(error);
    res.status(400).send({
      message: error.message
    });
  }
};


export const receiversDetails = async (req: Request, res: Response) => {
  try {
    const details = await receivers.findByIdAndUpdate({ _id: req.query.id }, req.body, {
      new: true
    });
    res.send({
      message: 'receiver details updated ',
      data: details
    });
  } catch (error: any) {
    error(error);
    res.status(400).send({
      message: error.message
    });
  };
};

export const receiversDetailsDelets = async (req: Request, res: Response) => {
  try {
    await receivers.findByIdAndDelete(req.query.id);
    res.send({
      message: 'receiver details deleted',
    });
  } catch (error: any) {
    error(error);
    res.status(400).send({
      message: error.message,
    });
  }
};