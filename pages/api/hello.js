const db = require('../../lib/db');
const UserModel = require('../../models/User.model')
import encrypt from '../../lib/encrypt'


export default async function handler(req, res) {
  const encryptedPassword = await encrypt(req.body.password);
  let alreadyUser = await UserModel.find({email: req.body.email}).exec();

  if (alreadyUser[0]?.email == undefined) {
    UserModel.create({name: req.body.name, email: req.body.email, password: encryptedPassword})
    res.status(200).json({ ok: true })
  } else {
    res.status(400).json({ ok: false })
  }
  
}