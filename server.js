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

app.use(express.static("./02-Homework/Develop/public"));

// View Routes -> HTML
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./02-Homework/Develop/public/notes.html"));
});

// API Routes -> JSON
app.get("/api/notes", (req, res) => {
  fs.readFile("./02-Homework/Develop/db/db.json", "utf8", (err, data) => {
    if (err) {
      return res.send("An error occured reading you data");
    }
    const arrayOfNotes = JSON.parse(data);
    res.json(arrayOfNotes);
  });
});

// Add a new note via a POST request test with POSTMAN
app.post("/api/notes", (req, res) => {
  fs.readFile("./02-Homework/Develop/db/db.json", "utf8", (err, data) => {
    if (err) {
      return res.send("An error occured reading you data");
    }
    const arrayOfNotes = JSON.parse(data);
    arrayOfNotes.push(req.body);
    // adds an id to each note
    arrayOfNotes.map((obj, i) => (obj.id = ++i));

    fs.writeFile("./02-Homework/Develop/db/db.json", JSON.stringify(arrayOfNotes), "utf8", (err, data) => {
        if (err) {
            return res.send("An error occurred writing your data.")
        }
        res.json(arrayOfNotes);
    })
  });
});

app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("./02-Homework/Develop/db/db.json", "utf8", (err, data) => {
    if (err) {
      return res.send("An error occured reading you data");
    }

    const arrayOfNotes = JSON.parse(data);
    // const objID = req.params.id;
    const newNotes = arrayOfNotes.filter((newNote) => newNote.id != req.params.id);

    // adds an id to each note
    // arrayOfNotes.map((obj, i) => (obj.id = ++i));

    fs.writeFile("./02-Homework/Develop/db/db.json", JSON.stringify(newNotes), "utf8", (err, data) => {
        if (err) {
            return res.send("An error occurred writing your data.")
        }
        res.json(arrayOfNotes);
    })
  });
});

// app.delete("/api/notes/:id", (req,res) => {

// })

// app.delete('/api/notes/:id', (req, res) => {
//       id.remove({
//           params.id
//       }, (err) => {
//           if (err) {
//               console.log(err)
//           }
//           else {
//              return res.send("Removed");
//           }
//       });
//   });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./02-Homework/Develop/public/index.html"));
});
// 4. Listen on that port
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
