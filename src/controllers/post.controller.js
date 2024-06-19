import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Post } from "../models/posts.models.js";

// This is inside admin route

const generatePost = asyncHandler(async (req, res) => {
  console.log("Inside generate post");

  const { title, content } = req.body;
  console.log("this is req.file ", req);

  console.log("Title ", title, "Content: ", content);

  if (!(title && content)) {
    throw new apiError(400, "All fields are required");
  }

  console.log("before coverImage path");
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  const post = await Post.create({
    title,
    content,
    coverImage: coverImage?.url || "",
    authorId: req.user._id,
  });

  const createdPost = await Post.findById(post._id);

  if (!createdPost) {
    throw new apiError(500, "Something went wrong while createing post");
  }

  return res
    .status(201)
    .json(new apiResponse(200, createdPost, "Post is created sucessfully"));
});

const enableOrDesablePosts = asyncHandler(async (req, res) => {
  // get id and active data from body
  // go to database and update it

  const { active, _id } = req.body;

  if (!active && !_id) {
    throw new apiError(400, "All fields are required");
  }

  const post = await Post.findByIdAndUpdate(
    _id,
    {
      $set: {
        active,
      },
    },
    { new: true }
  );
  if (!post) {
    throw new apiError(400, "The post with the given id is not available");
  }

  console.log(post);

  return res
    .status(200)
    .json(
      new apiResponse(200, post, "Active field of post is sucessfully changed")
    );
});

// const getAllPosts = asyncHandler(async (req, res) => {
//   const allPosts = await Post.find({});

//   if (!allPosts) {
//     throw new apiError(400, "Posts are not found");
//   }

//   return res
//     .status(200)
//     .json(new apiResponse(200, allPosts, "All Posts fetch sucessfully"));
// });

const getAllPosts = asyncHandler(async (req, res) => {
  try {
    // Use populate to include the user's username in the response
    const allPosts = await Post.find({}).populate('authorId', 'username'); // Assuming 'username' is the field you want from the User model

    if (!allPosts) {
      throw new apiError(400, "Posts are not found");
    }

    return res
      .status(200)
      .json(new apiResponse(200, allPosts, "All Posts fetched successfully"));
  } catch (error) {
    // Handle any errors that occur in the try block
    return res.status(error.status || 500).json(new apiResponse(error.status || 500, null, error.message || "Internal Server Error"));
  }
});



const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params; // Extract the id from request parameters

  try {
    const post = await Post.findById(id);
    if (!post) {
      throw new apiError(404, "Post not found");
    }

    // Fetch the top 6 enabled posts excluding the current post
    const topPosts = await Post.find({
      active: true,
      _id: { $ne: id } // Exclude the current post by its ID
    }).sort({ createdAt: -1 }).limit(6);

    res
     .status(200)
     .json(new apiResponse(200, { post, topPosts }, "Post fetched successfully"));
  } catch (error) {
    throw new apiError(500, "Error fetching post");
  }
});

// This is inside post route

const getAllEnablePosts = asyncHandler(async (req, res) => {
  const allPosts = await Post.find({ active: true });

  if (!allPosts) {
    throw new apiError(500, "Unable to fetch all users");
  }

  return res
    .status(200)
    .json(new apiResponse(200, allPosts, "Posts fetch sucessfully"));
});

const deletePost = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  if (!_id) {
    throw new apiError(400, "Post ID is required");
  }

  try {
    const deletedPost = await Post.findByIdAndDelete(_id);

    if (!deletedPost) {
      throw new apiError(404, "Post not found");
    }

    return res
      .status(200)
      .json(new apiResponse(200, {}, "Post deleted successfully"));
  } catch (error) {
    throw new apiError(
      500,
      error?.message || "An error occurred while deleting the post"
    );
  }
});

export {
  generatePost,
  getAllEnablePosts,
  enableOrDesablePosts,
  deletePost,
  getAllPosts,
  getPostById
};
