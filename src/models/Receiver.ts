import { model, Schema } from 'mongoose';

const ReceiverSchema = new Schema({
  name: {
    require: true,
    type: String,
  },
  mobile: {
    type: String,
    require: true,
  },
  relation: String,
});

export default model('receivers', ReceiverSchema);
