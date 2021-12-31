const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/todolistdb", {
    useNewUrlParser: true
});

var itemsSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Coding"
});
const item2 = new Item({
    name: "Read books"
});
const item3 = new Item({
    name: "Business Plan"
});

const defaultItems = [item1, item2, item3];



app.get("/", function (req, res){

    Item.find({}, function (err,result){
       if(err)console.log(err); 
       if(result.length === 0){
Item.insertMany(defaultItems, function (err) {
    if (err) console.log(err);
    console.log("success");
});
res.redirect("/");
       } else{
res.render("list", {
    day: day,
    items: result
});
       }

       
        
    });
    var today = new Date();
    var options = {
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    var day = today.toLocaleDateString("en-US",options);

});

app.post("/", function (req, res){
var itemName = req.body.item;
const item = new Item({
    name:itemName
});
item.save();
res.redirect("/");
});

app.post("/delete", function (req, res){
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId, function (err){
        if(err) console.log(err);
        console.log("deleted");
        res.redirect("/");
    });
});





app.listen(3000, function () {
    console.log("started");
  });