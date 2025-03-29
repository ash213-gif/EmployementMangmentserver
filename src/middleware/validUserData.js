const { validname, validemail, validpassword } = require('../validation/Allvalidation.js');

exports.useAuth = (req, res, next) => {
    try {
        const data = req.body;
        
        const { name, email, password } = data;

        if (!name) return res.status(400).send({ status: false, msg: 'Pls Provided Name' })
        if (!validname(name)) return res.status(400).send({ status: false, msg: 'Invalid Name' })

        if (!email) return res.status(400).send({ status: false, msg: 'Pls Provided email' })
        if (!validemail(email)) return res.status(400).send({ status: false, msg: 'Invalid Email' })

        if (!password) return res.status(400).send({ status: false, msg: 'Pls Provided password' })
        if (!validpassword(password)) return res.status(400).send({ status: false, msg: 'Invalid password pls provide at lest one upper letter, small letter, symbol and Number' })
        next()
    }
    catch (e) { res.status(500).send({ status: false, msg: e.message }) }
}

exports.useLogAuth = (req, res, next) => {
    try {
        const data = req.body;
        const { email, password } = data;

        if (!email) return res.status(400).send({ status: false, msg: 'Pls Provided email' })
        if (!validemail(email)) return res.status(400).send({ status: false, msg: 'Invalid Email' })

        if (!password) return res.status(400).send({ status: false, msg: 'Pls Provided password' })
        if (!validpassword(password)) return res.status(400).send({ status: false, msg: 'Invalid password pls provide at lest one upper letter, small letter, symbol and Number' })
        next()
    }
    catch (e) { res.status(500).send({ status: false, msg: e.message }) }
}