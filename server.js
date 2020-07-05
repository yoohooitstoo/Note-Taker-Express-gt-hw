// 1. Require Express
const express = require("express");
const path = require("path");
const fs = require("fs");

// 2. Create an instance of Express - app
const app = express();
// 3. Create a PORT
const PORT = process.env.PORT || 3000;

// add data-parsing boilerplate to read POST body.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View Routes -> HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./02-Homework/Develop/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./02-Homework/Develop/public/notes.html"));
});

// API Routes -> JSON
app.get("/api/notes", (req, res) => {
  fs.readFile("./02-Homework/Develop/db/db.json", "utf8", (err, data) => {
    if (err) {
      return res.send("An error occured reading you data");
    }
    const arrayofNotes = JSON.parse(data);
    res.json(arrayofNotes);
  });
});

// Add a new note via a POST request test with POSTMAN
app.post("/api/notes", (req, res) => {
  fs.readFile("./02-Homework/Develop/db/db.json", "utf8", (err, data) => {
    if (err) {
      return res.send("An error occured reading you data");
    }
    const arrayofNotes = JSON.parse(data);
    arrayofNotes.push(req.body);
    fs.writeFile("./02-Homework/Develop/db/db.json", "utf8", (err, data) => {
        if (err) {
            return res.send("An error occurred writing your data.")
        }
        res.json(arrayofNotes);
    })
  });
});

// 4. Listen on that port
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
