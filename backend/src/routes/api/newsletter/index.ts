import express from "express";
var router = express.Router();
import Newsletter from "../../../models/Newsletter";

router.get("/get_newsletters", async(req, res)=>{
    try {
        var posts = await Newsletter.find(); // should return all newsletter items
        res.status(200).send(posts); // successfully returns all newsletter items, in kinda an ugly format

    // FOR if we want to do just the title or something:
        // var items = {
        //     accounting: []
        // };
        // for(var i in posts) {    
        //     var item = posts[i];   
        //     items.accounting.push(item.title);
        // }
        // res.status(200).send(items.accounting)
    } catch(e) {
        console.log(e.message);
        res.status(500).send(e.message);
    }
});


router.post("/create_newsletter", async(req, res)=>{
    // Parse through the text in here
    var titleText = req.body.title;
    var bodyText = req.body.body;
    // var author = req.body.author;
    if(!titleText || !bodyText){
        res.status(400).send(JSON.stringify("Bad user input. Inputs required for all fields."));
        return;
    }
    console.log('Got a POST request for the homepage for this: ');
    // Create a newsletter item in the database here
    try {
        const newsletterItem = await Newsletter.create({
            title: titleText, // change this based on what the req looks like
            body: bodyText,
            // author: author
        })
        console.log("Successfully added to the database: " + newsletterItem)
    } catch(e) {
        console.log(e.message)
    }
});

router.delete('/delete_newsletter', async(req, res)=>{
    // Delete a newsletter post here
    try {
        // TODO: change these strings as needed based on what the user puts in
        var id = req.body.id;
        Newsletter.findByIdAndDelete(id, function (err, docs) {
            if (err){
                res.send(err)
            }
            else{
                res.send("Deleted : " + docs);
            }
        });
    } catch(e) {
        console.log(e.message)
    }
 })

 router.get("/", async(req, res) => {
	res.send("Hello World!"); // THIS WORKS! when you do localhost:3000/api/newsletter/ in postman
});


export default router;