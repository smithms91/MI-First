const bcrypt = require('bcrypt');

export default function hashPass(unHashPass: string) {
    return bcrypt.hash(unHashPass, 10).then(function(hash: string) {
        return hash;
    });
}