const express = require("express")
const app = express()

const PORT = 8080

app.use(express.json())
app.use('/', require("./routes/auth"))
app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}`)
})