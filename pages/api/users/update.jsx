import { connectDb, models } from "../../../lib/db"

export default async function handler(req, res) {

    if (req.method == 'POST') {
        connectDb();
        if (!req.body) {
            return res.status(400).json({ message: 'You need to send a user object!' })
        } else {
            const response = await models.User.findOne({email: req.body.oldEmail})
            if (!response.password) {
                res.status(400).json({message: 'you are signed in through google and cannot change your info'})
                // return await response.findOneAndUpdate(query, );
            }
        }

    }
}