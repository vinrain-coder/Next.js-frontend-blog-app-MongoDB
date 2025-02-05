import dbConnect from "@/lib/mongodb";
import { Blog } from "@/models/Blog";

export default async function handle(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    if (req.query?.id) {
      // fetch single blog
      const blog = await Blog.findById(req.query.id);
      res.json(blog);
    } else if (req.query?.blogcategory) {
      // fetch blog by category
      const cate = await Blog.find({ blogcategory: req.query.blogcategory });
      res.json(cate.reverse());
    } else if (req.query?.tags) {
      // fetch blog by tags
      const tagsArray = Array.isArray(req.query.tags)
        ? req.query.tags
        : req.query.tags.split(","); // Split tags if passed as a comma-separated string

      // Find blogs where any of the tags match
      const tag = await Blog.find({
        tags: { $in: tagsArray },
      });
      res.json(tag.reverse());
    } else if (req.query?.slug) {
      // fetch blog by slug
      const url = await Blog.find({ slug: req.query.slug });
      res.json(url.reverse());
    } else {
      // fetch all blogs
      const blogs = await Blog.find();
      res.json(blogs.reverse());
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
