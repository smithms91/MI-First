import fs from 'fs';


export default async function handler(req, res) {
    const data = fs.readFileSync(`${process.cwd()}/lib/citylist.json`);
    const cityData = JSON.parse(data);
    res.status(200).json({cityData: cityData});
}