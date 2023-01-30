import { connectDb, models } from "../../../lib/db"

export default async function handler (req, res) {
    if (req.method == 'GET') {
        connectDb();
        const response = await models.Event.find({hostEmail: req.query.email})
        if (response) {
            res.status(200);
            return res.send(response)
        } else {
            res.status(400);
        }
    }
}

