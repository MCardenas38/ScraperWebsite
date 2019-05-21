var mongoose= require("mongoose");

var Schema= mongoose.Schema;

var NoteSchema= new Schema({
    note: String
});

var Note= mongoose.model("notes",NoteSchema);

module.exports= Note;