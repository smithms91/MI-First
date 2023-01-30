import { connectDb, models } from "../../../lib/db"

export default async function handler(req, res) {
    if (req.method == 'GET') {
        connectDb();
        const response = await models.User.find({ name: req.query.username })
        if (!response) {
            res.status(400);
            console.log(err)
            return res.send(err)
        } else {
            return res.send(response)
        }
    }
}

