const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  profileImg: { type: String, required: false, trim: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true,unique:true, trim: true },
  password: { type: String, required: true, trim: true },
  otp: { type: String, required: true, trim: true },
  isverify: { type: Boolean, default:false, trim: true },
  isdeleted: { type: Boolean, default:false, trim: true },
  isActive: { type: Boolean, default:true, trim: true },
},
{timestamps:true}
)

module.exports = mongoose.model('userDB', userSchema)
