import { connectDb, models } from "../../../lib/db"

export default async function handler(req, res) {
    // console.log(models)
    // console.log(req.method)
    if (req.method == 'GET') {
        connectDb();
        const response = await models.Event.find()
        return res.send(response)
    }

    if (req.method == 'POST') {
        connectDb();
        if (!req.body) {
            return res.status(400).json({ message: 'You need to send a user object!' })
        } else {
            const response = await models.Event.find({ eventName: req.body.eventName })
            console.log(response.length)
            if (response.length == 0) {
                res.status(200).json({'message': 'Your event has been created.'})
                return await models.Event.create({
                    eventName: req.body.eventName,
                    date: req.body.date,
                    location: req.body.location,
                    hostEmail: req.body.hostEmail,
                    description: req.body.description,
                    likes: 0,
                    restrictedAge: req.body.adult
                });
            } else {
                res.status(400).json({'message': 'This event already exists.'})
            }
        }

    }
}