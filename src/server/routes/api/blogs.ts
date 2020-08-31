import * as express from "express";
import {RequestHandler} from "express";
import { charge } from "../../utils/stripe/stripeConfig";
import { sendMail } from "../../utils/mailgun/mailgunConfig";
import DB from "../../db";

const router = express.Router();


const checkRole: RequestHandler = (req: any, res, next) => {
    if (!req.user || req.user.role !== "admin")
        return res.sendStatus(401);
    else next();
};

//handles get all blogs request
router.get("/getall", async (req, res) => {
    try {
        let blogs;
        blogs = await DB.Blogs.GetBlogs();

        res.json(blogs);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//handles get blogs request
router.get("/:id/getblog", async (req, res) => {
    try {
        let id = await req.params.id;
        let blog = await DB.Blogs.GetBlog(id);
        res.json(blog);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
//handles get blog tags request
router.get("/:id/gettag", async (req, res) => {
    try {
        let id = await req.params.id;
        let tags = await DB.Blogs.GetBlogTags(id);

        res.json(tags);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
//handles get authors request
router.get("/authors", async (req, res) => {
    try {
        let authors: any = await DB.Blogs.GetAuthors();

        res.json(authors);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
//handles get all tags
router.get("/tags", async (req, res) => {
    try {
        let tags = await DB.Blogs.GetTags();
        res.json(tags);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
router.post("/donation", async (req, res) => {
    try {
        let amount: any = parseFloat(req.body.amount.replace(/,/g, '')).toFixed(2);
       let data = await charge(req.body.token.id, amount);
       res.json(data);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
router.post("/contact", async (req, res) => {
    try {
        let data = await sendMail('abraham.zbib@gmail.com', req.body.email, req.body.subject, req.body.message);
        res.json(data);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
//handles posting new blog
router.post("/add", checkRole, async (req, res) => {
    try {
        let response = await DB.Blogs.CreateBlog(req.body);
        res.json(response);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//handles posting new blog tags after intially creating a blog
router.post("/createblogtags", checkRole, async (req, res) => {
    try {
        let response = await DB.Blogs.CreateBlogtoTagEntry(req.body);
        res.json(response);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//handles posting new blog tags after edit
router.post("/blogtagspost", checkRole, async (req, res) => {
    try {
        let response = await DB.Blogs.PostTags(req.body);
        res.json(response);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//handles blog delete request
router.delete("/:id/blog", checkRole, async (req, res) => {
    try {
        let id = await req.params.id;
        let response = await DB.Blogs.DeleteBlog(id);
        res.json(response);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
//handles tags delete request
router.delete("/:id/tags", checkRole, async (req, res) => {
    try {
        let id = await req.params.id;
        let response = await DB.Blogs.DeleteTags(id);
        res.json(response);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//handles blog updates
router.put("/:id/blog", checkRole, async (req, res) => {
    try {
        let id = await req.params.id;
        let response = await DB.Blogs.UpdateBlog(id, req.body);
        res.json(response);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;
