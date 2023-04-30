import express from "express";
var router = express.Router();
import Newsletter from "../../../models/Newsletter";
import VerifyToken from "../../../middlewares/VerifyToken";
import { User } from "../../../models/User";
import { Request, Response } from "express";
import { userInfo } from "os";
import DOMPurify from 'isomorphic-dompurify';
import { getUser } from "../users/get_user";
import { parse } from "path";

router.get("/get_newsletters", VerifyToken, async (req, res) => {
  try {
    var posts = await Newsletter.find();
    var respJSON = []; // should return all newsletter items
    for (var i = 0; i < posts.length; i++) {
      // get the user by id
      let userObj = await User.findById(posts[i].user[0]);
      if (userObj !== null) {
        respJSON.push({
          ...posts[i].toJSON(),
          author: userObj.name,
          username: userObj.username,
        });
      }
    }
    res.status(200).json(respJSON); // successfully returns all newsletter items, in kinda an ugly format
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
});

router.get("/get_newsletter_byID", VerifyToken, async (req, res) => {
  try {
    let blogId = req.query.blogId;
    let posts = await Newsletter.findById(blogId);
    var respJSON = {};
    let userObj = await User.findById(posts.user[0]);
    var postJSON:any = posts.toJSON();
    for(var i = 0; i < postJSON.comments.length; i++){
        var current_comment = postJSON.comments[i];
        var userID = current_comment.author;
        let user = await User.findById(userID);
        postJSON.comments[i].username = user.username;
    }
    respJSON = {
      ...postJSON,
      author: userObj.name,
      username: userObj.username,
    };
    res.status(200).json(respJSON);
    // console.log("api reached")
    // console.log(blogId);

    // res.status(200).send(posts);
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
});

router.put("/like_post", VerifyToken, async (req, res) => {
  try {
    let blogId = req.query.blogId;
    let user = (req as any).user;
    let userId = user._id;

    Newsletter.findById(blogId, function (err, doc) {
      if (doc.postsLiked.includes(userId)) {
        doc.postsLiked.splice(doc.postsLiked.indexOf(userId), 1);
      } else {
        doc.postsLiked.push(userId);
      }
      doc.save();
    });

    let posts = await Newsletter.findById(blogId);
    res.status(200).send(posts.postsLiked);
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
});

router.put("/create_comment", VerifyToken, async (req, res) => {
  var commentBody = req.body;
  let blogId = req.query.blogId;
  let user = (req as any).user;
  let userId = user._id;
  commentBody.author = userId;

//   console.log(commentBody);
  // console.log(blogId);
  Newsletter.findById(blogId, function (err, doc) {
    doc.comments.push(commentBody);
    doc.save();
  });
  let posts = await Newsletter.findById(blogId);
//   console.log(posts);
  res.status(200).send("comment success");
});

router.post("/create_newsletter", VerifyToken, async (req, res) => {
    // console.log('user token:  ' + req.body.userToken)
    let user = (req as any).user;
	// const userMongoDBObj = User.findById;
    // console.log(user);
    // Parse through the text in here
    var titleText = req.body.title;
    var bodyText = req.body.body;
	bodyText = DOMPurify.sanitize(bodyText);
    var imageArray = [...req.body.images]
    // var author = req.body.author;
    if(!titleText && !bodyText){
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
            timePosted: Date.now(),
            images: imageArray,
			      user: user._id,
        })
		await User.findByIdAndUpdate(
			{ _id: user._id },
			{ $push: { newsletter: newsletterItem._id } }
		);
        console.log("Successfully added to the database: " + newsletterItem)
    } catch(e) {
        console.log(e.message)
    }
});

router.delete("/delete_newsletter", VerifyToken, delete_newsletter);

async function delete_newsletter(req: Request, res: Response) {
  try {
    let user = (req as any).user;
    const userINFO = await User.findById(user._id);
    const idNewsLetter = req.query.id;

    // Check if NewsLetter exists
    const newsletter = await Newsletter.findById(idNewsLetter);
    if (!newsletter) {
      res.status(404).json({ error: "Newsletter does not exist" });
      return;
    }
    // Check if newsletter is in self
    if (userINFO.newsletter.indexOf(newsletter._id) === -1) {
      res.status(403).json({ error: "Newsletter does not belong to user" });
      return;
    }
    // Delete Newsletter
    await Newsletter.findByIdAndDelete(newsletter._id);
    // Remove from user
    await User.findByIdAndUpdate(
      { _id: user._id },
      { $pull: { newsletter: { $in: [newsletter._id] } } }
    );
  } catch (e) {
    console.error(e.message);
    throw e;
  }
}

router.get("/", async (req, res) => {
  res.send("Hello World!"); // THIS WORKS! when you do localhost:3000/api/newsletter/ in postman
});

export default router;
