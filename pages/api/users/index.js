import { connectDb, models } from "../../../lib/db"

export default async function handler(req, res) {
    if (req.method == 'GET') {
        connectDb();
        const response = await models.User.find({})
        return res.send(response)
    }

    if (req.method == 'POST') {
        switch (req.body.action) {
            case 'create-user': {
                return createUser(req, res)
            }
            case 'get-user-likes': {
                return getUserLikes(req, res)
            }
            case 'update-user-info': {
                return updateUserInfo(req, res)
            }
        }
    }

    async function createUser (req, res) {
        connectDb();
        if (!req.body) {
            return res.status(400).json({ message: 'You need to send a user object!' })
        } else {
            console.log(req.body)
            const response = await models.User.findOne({ email: req.body.email })
            if (response) {
                res.status(200).json({message: response})
                return
            } else {
                return await models.User.create({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email });
            }
        }
    }

    async function getUserLikes (req, res) {
        connectDb();
        if (!req.body) {
            return res.status(400).json({ message: 'You need to send a user object!' })
        } else {
            console.log(req.body)
            res.status(200).json({ message: req.body })
            const response = await models.User.findOne({ email: req.body.email })
            if (response) {
                console.log(response)
            } else {
                return
            }
        }
    }

    async function updateUserInfo (req, res) {
        console.log(req.body)
        // connectDb();
        // if (!req.body) {
        //     return res.status(400).json({ message: 'You need to send a user object!' })
        // } else {
        //     const response = await models.User.findOne({email: req.body.oldEmail})
        //     if (!response.password) {
        //         res.status(400).json({message: 'you are signed in through google and cannot change your info'})
        //         // return await response.findOneAndUpdate(query, );
        //     }
        // }
    }
}