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
        switch (req.body.action) {
            case 'create-event': {
                return createEvent(req, res);
            }
            case 'delete-event': {
                return deleteEvent(req, res);
            }
        }

    }


    async function createEvent (req, res) {
        connectDb();
        if (!req.body) {
            return res.status(400).json({ message: 'You need to send an event object!' })
        } else {
            const response = await models.Event.find({ eventName: req.body.eventName })
            if (response.length == 0) {
                let newModel;
                newModel = await models.Event.create({
                    eventName: req.body.postDetails.eventName,
                    date: req.body.postDetails.date,
                    location: req.body.postDetails.location,
                    hostEmail: req.body.postDetails.hostEmail,
                    description: req.body.postDetails.description,
                    likes: 0,
                    restrictedAge: req.body.postDetails.adult
                });
                res.status(200).json({ 'message': 'Your event has been created.' , 'response': newModel })
                return newModel
            } else {
                res.status(400).json({ 'message': 'This event already exists.'})
            }
        }
    };




    async function deleteEvent (req, res) {
        connectDb();
        if (!req.body) {
            return res.status(400).json({ message: 'You need to send an event object!' })
        } else {
            const response = await models.Event.find({ eventName: req.body.eventName })
            if (response.length == 0) {
                res.status(400).json({ 'message': 'This event doesnt exist.' });
            } else {
                res.status(200).json({ 'message': 'Your event has been deleted.', 'response': response[0] })
                return await response[0].deleteOne({ eventName: req.body.eventName });
            }
        }
    };

}