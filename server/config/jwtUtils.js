const crypto = require('crypto')
const secretkey = crypto.randomBytes(32).toString()

module.exports = {
    secretkey
}