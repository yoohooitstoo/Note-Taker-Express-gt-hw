// 1. Require Express
const express = require("express");
const path = require("path");
const e = require("express");
conat fs = ("fs");

// 2. Create an instance of Express - app
const app = express()
// 3. Create a PORT
const PORT = process.env.PORT || 3000;
// 4. Listen on that port
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});