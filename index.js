const express = require("express")
const fs = require("fs")
const path = require("path")
const PORT = 8080
const app = express()
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})
app.get("/video", (req, res) => {
    const Range = req.headers.range
    if (!Range) {
        res.status(400).send("Range paramater hasn't found")
    }
    const pathToVIdeo = "Prosta.mp4"
    const sizeOfVideo = fs.statSync("Prosta.mp4").size

    const CHIN_SIZE = 1000000
    const start = Number(Range.replace(/\D/g, ""))
    const end = Math.min(start + CHIN_SIZE, sizeOfVideo - 1)
    const contentLength = end - start + 1
    const Headers = {
        "Content-Range": `bytes ${start} - ${end}/${sizeOfVideo - 1}`,
        "Accept-Range": "bytes",
        "Content-Length": contentLength,
        "COntent-Type": "video.mp4"
    }
    res.writeHead(206, Headers)
    const videoStream = fs.createReadStream(pathToVIdeo, { start, end })
    videoStream.pipe(res)
})
app.listen(PORT, "localhost", () => {
    console.log(`Server is running on PORT: http://localhost:${PORT}`)
})