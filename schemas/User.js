const mongoose = require('mongoose');
const Blowfish = require('egoroof-blowfish');
const bf = new Blowfish('OPUS_YNK_04^', Blowfish.MODE.ECB);

const userSchema = mongoose.Schema({
  email : String,
  password : String
}, {collection: 'users' });
  
userSchema.methods.validPassword = function(plain, encrypted){
  const padding = 8 - (plain.length & 7);
  for (var i=0; i < padding; i++) plain += String.fromCharCode(padding);
  const encoded = bf.encode(plain);
  return Buffer.from(encoded).toString('hex').toUpperCase() === encrypted;
};
/*
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  const encoded = bf.encode(password);
  const byteToHexa = Array.from(encoded, function(byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
          }).join('');
  return byteToHexa;
};
*/

module.exports = mongoose.model('User', userSchema);