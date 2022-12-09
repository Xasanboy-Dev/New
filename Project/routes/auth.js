const { Router } = require("express")
const router = Router()
const isAuth = require("../middlewars/auth")
const Users = require("../config/user")
router.get('/', (req, res) => {
    res.json({ msg: Users })
})
async function findByUserName(username) {
    const useri = Users.filter((user) => user.username === username)
    return useri[0]
}


// Login Rout
router.post('/login', async (req, res) => {
    const user = await findByUserName(req.body.username)
    if (!user) {
        return res.status(400).json({ msg: [Users[0], req.body] })
    }
    const isMatch = user.password === req.body.password
    if (!isMatch) {
        return res.status(400).json({ msg: "Wrong in Password" })
    }
    res.status(200).json({ msg: "You have login in", user })

})

/// Register Users
router.post("/signup", (req, res) => {
    const User = {
        id: new Date().getTime(),
        username: req.body.username,
        password: req.body.password
    }
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ msg: "Please complete your DATA" })
    }
    Users.push(User)
    return res.status(201).json({
        msg: "OK",
        User
    })
})

router.get("/profile", isAuth, (req, res) => {
    res.json({ msg: "You now in your profile" })
})

module.exports = router