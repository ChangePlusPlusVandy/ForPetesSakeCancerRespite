import express from "express";
var router = express.Router();
import Newsletter from "../../../models/Newsletter";
import VerifyToken from "../../../middlewares/VerifyToken";

router.get("/get_newsletters", VerifyToken, async(req, res)=>{
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

router.get("/get_newsletter_byID", VerifyToken, async(req, res) => {
    try {
        let blogId = req.query.blogId;
        let posts = await Newsletter.findById(blogId);

        // console.log("api reached")
        // console.log(blogId);

        res.status(200).send(posts);
    } catch (e) {
        console.log(e.message);
        res.status(500).send(e.message)
    }
});

router.put("/like_post",VerifyToken, async(req, res) => {
    try {
        let blogId = req.query.blogId;
        let user = (req as any).user;
        let userId = user._id;

        Newsletter.findById(blogId, function (err, doc){
            if (doc.postsLiked.includes(userId)) {
                doc.postsLiked.splice(doc.postsLiked.indexOf(userId),1);
            } else {
                doc.postsLiked.push(userId)
            }
            doc.save();
          });
        
        let posts = await Newsletter.findById(blogId);
        res.status(200).send(posts.postsLiked);
    } catch (e) {
        console.log(e.message);
        res.status(500).send(e.message)
    }
});


router.post("/create_newsletter", VerifyToken, async(req, res)=>{
    // console.log('user token:  ' + req.body.userToken)
    let user = (req as any).user;
    console.log(user);
    // Parse through the text in here
    var titleText = req.body.title;
    var bodyText = req.body.body;
    var dateText = req.body.date;
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
            author: user.name,
            timePosted: dateText,   
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