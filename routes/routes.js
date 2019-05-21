var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");
var express= require('express');
var router= express.Router();

//Home page
router.get("/",function(req,res){
    res.render("start");
});

// Click button to scape
router.get("/scrape", function(req, res) {
    axios.get("https://old.reddit.com").then(function(response) {

        var $ = cheerio.load(response.data);
        var result= []

        $("div.top-matter").each(function(i, element) {

            var title = $(element).find("p.title").text();
            var time= $(element).find("time").text();

            var link = $(element).find("p.title").children().attr("href");
            if(link.startsWith("/r")){
                link = "https://old.reddit.com" + link;
            }

            result.push({title: title, time: time, link: link});
        });

        res.render("index",{result: result});
    });
    
});

//save an article
router.post("/save", function(req, res) {
    db.Article.create(req.body).then(() => res.sendStatus(200))
});

//view saved articles
router.get("/saved",function(req, res){
    db.Article.find({}).then(function(data){
        //console.log(data);
        res.render("saved",{result: data});

    });
});

//post note
router.post("/add",function(req,res){
    db.Note.create({note: req.body.note}).then(function(note){
        res.json(note._id);
        return db.Article.findOneAndUpdate({_id: req.body.id}, { $push: { notes : note._id } }, { new: true });
    });
});

//retrieve notes
router.get("/notes/:id",function(req,res){
    db.Article.findOne({_id: req.params.id}).populate("notes")
    .then(function(result){
        //res.json(result);
        res.render("notes", {data: result});
    });
});

//delete notes
router.delete("/notes/delete/:id",function(req,res){
    db.Note.deleteOne({_id: req.params.id},function(err){
        if (err) {
            console.log(err);
        }
    });
});

//delete article
router.delete("/article/delete/:id",function(req,res){
    db.Article.deleteOne({_id: req.params.id},function(err){
        if (err) {
            console.log(err);
        }
    });
});

module.exports= router;
