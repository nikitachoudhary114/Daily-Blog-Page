const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')

const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


let posts = [
    {
        id: uuidv4(),
        username: "A",
        topic: "Robots",
        content: "Robotics, the intersection of engineering, technology, and science, is revolutionizing industries and daily life. From industrial automation to healthcare, robots are increasingly integral to modern society."
    },
    {
        id: uuidv4(),
        username: "B",
        topic: "Wars",
        content: "Wars have shaped human history, altering political boundaries, economies, and societies. From ancient conflicts to modern-day battles, the causes and consequences of wars are complex and far-reaching."
    },
    {
        id: uuidv4(),
        username: "C",
        topic: "Medicine",
        content: "Medicine, the science and practice of diagnosing, treating, and preventing disease, has evolved remarkably over centuries. From ancient herbal remedies to modern-day precision medicine, advancements in medical science have significantly improved human health and longevity."
    },
    {
        id: uuidv4(),
        username: "D",
        topic: "Poverty",
        content: "Poverty, a condition where individuals lack the financial resources to meet basic living standards, affects millions worldwide. Tackling poverty requires a multi-faceted approach, addressing economic, social, and political factors."
    }
]


app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

//create
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});
app.post("/posts", (req, res) => {
    let id = uuidv4();
    let { username, topic, content } = req.body;
    posts.push({ id, username, topic, content })
    res.redirect("/posts");

});

//read
app.get("/posts/:id", (req, res) => {
    let {id }= req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
})

//update
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    let newContent = req.body.content;
    post.content = newContent;
    // console.log(newContent);
    // console.log(post);
    res.redirect("/posts");
});
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

//Delete
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log("listening to port", port);
});
