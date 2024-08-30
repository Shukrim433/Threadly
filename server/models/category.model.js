import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});


const Category = mongoose.model("Category", categorySchema);

export default Category;


// i created a separate category model schema so that it will be easier to
// seed the categories (as there are only a few), then do .populate to the products to populate the category field using the id reference
// if i had just put it as a normal field in the Product model schema
// then i would have to add a category to ALL of the products manually when seeding
