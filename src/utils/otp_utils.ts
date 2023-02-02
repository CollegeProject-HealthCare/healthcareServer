import otpModel from './../models/otp';
import logger from './logger';
import SMSClient from './sms_utils';
;

interface saveOtp {
  state: "NEW" | "OLD",
  message: String,
  otp: string
};

interface validateOtp {
  status: "SUCCESS" | "FAIL",
  message: string
}

class OtpUtils extends SMSClient {

  constructor(apiKey: string) {
    super(apiKey);
  }

  private generateOtp(): string {
    let otp: string = '';
    for (let i = 0; i < 6; i++) {
      otp += parseInt(`${(Math.random() * 10)}`);
    };
    return otp;
  }

  private async generateAndSaveOtp(mobileNumber: string): Promise<saveOtp> {
    try {
      const otpData = await otpModel.findOne({ mobileNumber: mobileNumber });
      if (otpData != undefined) {
        const timeout = Math.floor(7 - (new Date().getTime() - otpData.createdAt.getTime()) / (1000 * 60));
        console.log(timeout)
        return {
          message: `OTP already generated. Please wait ${timeout} minutes`,
          otp: otpData.OTPValue,
          state: "OLD"
        }
      }
      const otp = this.generateOtp();
      const newOtpData = new otpModel({
        mobileNumber: mobileNumber,
        OTPValue: otp
      });
      const newSavedOtp = await newOtpData.save();
      return {
        message: `OTP generated.`,
        otp: newSavedOtp.OTPValue,
        state: "NEW"
      }
    } catch (error: any) {
      logger.error(error);
      throw new Error('An error occured while generating OTP. Please try again in a minute');
    }
  }

  public async generateAndSendOtp(mobileNumber: string) {
    const OTPdata = await this.generateAndSaveOtp(mobileNumber);
    if (OTPdata.state === "NEW") {
      console.log(OTPdata);
      return OTPdata.message;
    }
    return OTPdata.message;
  }

  public async validateOtp(mobileNumber: String, otp: string): Promise<validateOtp> {

    const OTPdata = await otpModel.findOne({ mobileNumber: mobileNumber });
    if (OTPdata === null) {

      logger.error(`Invalid mobile number: ${mobileNumber}`);
      return {
        status: "FAIL",
        message: "Invalid mobile number"
      }
    } else if (OTPdata.OTPValue === otp) {
      return {
        status: "SUCCESS",
        message: "OTP verified"
      }
    }
    return {
      status: "FAIL",
      message: "Please recheck your otp"
    }
  }
};

export default new OtpUtils("f1490c4f-8bc1-11ec-b9b5-0200cd936042");