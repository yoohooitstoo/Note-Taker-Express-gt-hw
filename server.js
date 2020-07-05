// 1. Require Express
const express = require("express");
const path = require("path");
const fs = ("fs");

// 2. Create an instance of Express - app
const app = express()
// 3. Create a PORT
const PORT = process.env.PORT || 3000;


// View Routes -> HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./02-Homework/Develop/public/index.html"))
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./02-Homework/Develop/public/notes.html"))
});


// 4. Listen on that port
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});