const { verifyUser } = require('../Mail/MailSend.js');
const { userURLImg } = require('../cloudinary/imgURL.js');
const useModel = require('../Model/UserModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    try {
        const data = req.body;
        const img = req.file;
        const { name, email, password } = data;

        const randomotp = Math.floor(1000 + Math.random() * 9000);

        const checkUser = await useModel.findOneAndUpdate({ email: email }, { $set: { otp: randomotp } }, { new: true })


        if (checkUser) {
            if (((checkUser.isActive) == false)) return res.status(400).send({ status: false, msg: 'Account is Block ' })
            if (((checkUser.isverify) == true)) return res.status(400).send({ status: false, msg: 'Account is ALready Verify pls Log In' })
            if (((checkUser.isdeleted) == true)) return res.status(400).send({ status: false, msg: 'Account is deleted' })

            verifyUser(name, email, randomotp);
            return res.status(404).send({ status: false, msg: 'User Already present verify otp', id: checkUser._id })
        }


        if (img) {
            const imgurl = await userURLImg(img.path)
            data.profileImg = imgurl
        }
        verifyUser(name, email, randomotp);

        const bcryptPassword = await bcrypt.hash(password, 10)
        data.password = bcryptPassword
        data.otp = randomotp

        const DBData = await useModel.create(data)

        const result = {
            id: DBData._id,
            profileImg: DBData.profileImg,
            name: DBData.name,
            email: DBData.email,
            password: DBData.password,
        }

        res.status(201).send({ status: true, msg: `successfully Create User Data`, data: result })
    }
    catch (e) { return res.status(500).send({ status: false, msg: e.message }) }
}


exports.verifyUserOtp = async (req, res) => {
    try {
        const id = req.params.id;
        const userotp = req.body.otp;

        if (!userotp) return res.status(404).send({ status: false, msg: 'pls Provide otp' })

        const checkUser = await useModel.findById({ _id: id })

        if (!checkUser) return res.status(404).send({ status: false, msg: 'User not Found pls SignUp' })
        if (((checkUser.isActive) == false)) return res.status(400).send({ status: false, msg: 'Account is Block' })
        if (((checkUser.isverify) == true)) return res.status(400).send({ status: false, msg: 'Account is ALready Verify pls Log In' })
     
        if ((userotp != (checkUser.otp))) return res.status(400).send({ status: false, msg: 'Wrong Otp' })

        const response = await useModel.findByIdAndUpdate({ _id: id }, { $set: { isverify: true, otp: userotp } }, { new: true })
        console.log(response.otp)
        res.status(200).send({ status: true, msg: 'Successfllu verify Otp' })
    }
    catch (e) { return res.status(500).send({ status: false, msg: e.message }) }
}

exports.userLogIn = async (req, res) => {
    try {

        const { email, password } = req.body;

        const checkUser = await useModel.findOne({ email: email })

        if (!checkUser) return res.status(404).send({ status: false, msg: 'User not Found pls SignUp' })
        if (!checkUser.isverify ) return res.status(404).send({ status: false, msg: 'your are not verify please verify your account ' })
        const bcryptPasswordCheck = await bcrypt.compare(password, checkUser.password)
        if (!bcryptPasswordCheck) return res.status(404).send({ status: false, msg: 'Wrong Password!' })

        const token = await jwt.sign({ userId: checkUser._id }, process.env.UserToken, { expiresIn: '12h' })

        res.status(200).send({ status: true, token: token, userId: checkUser._id })
    }
    catch (e) { return res.status(500).send({ status: false, msg: e.message }) }
}