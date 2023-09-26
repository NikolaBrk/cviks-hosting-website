import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("index.ejs");
});

app.get("/server", function (req, res) {
    res.render("server.ejs");
});

app.get("/support", function (req, res) {
    res.render("support.ejs");
});

app.get("/faq", function (req, res) {
    res.render("faq.ejs");
});


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
