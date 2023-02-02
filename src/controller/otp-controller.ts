import { Request, Response } from 'express';
import OTPUtils from "../utils/otp_utils"

export const generateOTPController = async (req: Request, res: Response) => {
  try {
    const { mobileNumber } = req.body;
    const message = await OTPUtils.generateAndSendOtp(mobileNumber);
    res.json({
      status: "SUCCESS",
      message: message
    });
  } catch (error: any) {
    if (error.isJoi === true) {
      res.status(400).send({
        message: error.message
      });
      return;
    }
    res.status(500).json({
      status: "FAIL",
      message: error.message
    });
  }
};