import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  addresses:[
    {

      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      isDefault: { type: Boolean, default: false }, // To mark the default address
      
    },
  ],
});

const addressModel =mongoose.models.address || mongoose.model('address', addressSchema);
export default addressModel;


