const db = require('../../lib/db');
const UserModel = require('../../models/User.model')


export default async function handler(req, res) {
  

  res.status(200).json({ ok: true, data: req.body })
  
}