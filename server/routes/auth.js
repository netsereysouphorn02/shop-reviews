var express = require('express')
const joiValidation = require('../middlewares/joiValidation')
const auth = require('../middlewares/auth')
const { signInSchema, signUpSchema } = require('../schemas')
var router = express.Router()
const { login } = require('../services/login')
const { register } = require('../services/register')
const userService = require('../services/user')
const { logout } = require('../services/logout')
var jwt = require('jsonwebtoken');

router.get('/me', auth.ensureSignedIn, auth.currentUser, async function(
    req,
    res,
    next,
) {
    const { currentUser } = req
    const result = await userService.findById(currentUser)
    res.json(result)
})

router.post('/logout', async(req, res) => {
    const result = logout(req.session)
    return res.clearCookie('access_token').json(result)
})

// router.post(
//     '/login',
//     auth.ensureSignedOut,
//     joiValidation(signInSchema),
//     async(req, res, next) => {
//         try {
//             const { email, password } = req.body
//             const result = await login(email, password)
//             req.session.jwt = result.data.token
//             res.json({ success: true, result })
//         } catch (err) {
//             res.json({ success: false })
//         }
//     },
// )


router.post(
    '/login',
    auth.ensureSignedOut,
    joiValidation(signInSchema),
    async(req, res, next) => {
        try {
<<<<<<< HEAD
            const { username, password } = req.body
            const result = await login(username, password)
            console.log(result);
=======
            const { email, password } = req.body
            const result = await login(email, password)
>>>>>>> ac0cc60450b1c4b4df0909e4629a8efe24d9602b
            req.session.jwt = result.data.token
            res.json({ success: true, result })
        } catch (err) {
            res.json({ success: false })
        }
    },
)


router.post(
    '/register',
    auth.ensureSignedOut,
    joiValidation(signUpSchema),
    async(req, res, next) => {
        const createdUser = await register(req.body)
        res.json(createdUser)
    },
)

module.exports = router