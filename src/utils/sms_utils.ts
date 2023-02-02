import axios, { AxiosResponse } from 'axios';

export default class SMSClient {

  private apiURI: String = "https://2factor.in/API/V1";
  private apiKey: String;

  constructor(apiKey: String) {
    this.apiKey = apiKey;
  };

  public async deliverOTP(mobileNumber: String, otp: String) {
    try {
      const URI = `${this.apiURI}/${this.apiKey}/SMS/${mobileNumber}/${otp}`;
      const response: AxiosResponse = await axios.get(URI);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  public async deliverOTPWithTemplate(mobileNumber: String, otp: string, template_name: String) {
    try {
      const URI = `${this.apiURI}/${this.apiKey}/SMS/${mobileNumber}/${otp}/${template_name}`
      const response: AxiosResponse = await axios.get(URI);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
};