var mongoose= require("mongoose");

var Schema= mongoose.Schema;

var ArticleSchema= new Schema({
    title: {
        type: String,
        require: true
    },
    link:{
        type: String,
        required: true
    },
    notes:[{
        type: Schema.Types.ObjectId,
        ref: "notes"
    }]
});

var Article= mongoose.model("saved_articles", ArticleSchema);

module.exports= Article;