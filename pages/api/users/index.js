import {connectDb, models} from "../../../lib/db"

export default async function handler (req, res) {
    if (req.method == 'GET') {
        connectDb();
        const response = await models.User.find({})
        return res.send(response)
    }

    if (req.method == 'POST') {
        
        connectDb();
        if (!req.body) {
            return res.status(400).json({message: 'You need to send a user object!'})
        } else {
            res.status(200).json({message: req.body})
            const response = await models.User.find({})
            if (response) {
                return
            }
            return await models.User.create({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email});
        }
        
    }
}