import express from "express";

const app = express();
const port = process.env.PORT || 3000;

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

app.get("/datacenter", function (req, res) {
    res.render("datacenter.ejs");
});

app.get("/hardware", function (req, res) {
    res.render("hardware.ejs");
});

app.get("/it", function (req, res) {
    res.render("it.ejs");
});

app.get("/imprint", function (req, res) {
    res.render("imprint.ejs");
});

app.get("/privacypolicy", function (req, res) {
    res.render("privacypolicy.ejs");
});

app.get("/terms", function (req, res) {
    res.render("terms.ejs");
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
