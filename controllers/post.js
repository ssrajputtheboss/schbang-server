import UserSchema from '../models/user.js';
import PostSchema, { PostTypes } from '../models/post.js';
export async function addPost(req, res) {
  try {
    const user = await UserSchema.findById(req.userId);
    const { text, attachments, type, organisation } = req.body;
    if (!user.organisations.includes(organisation)) {
      throw Error('You are not part of this organisation');
    }
    if (type !== undefined && !Object.values(PostTypes).includes(type)) {
      throw Error('Invalid post type');
    }
    const time = new Date();
    const post = new PostSchema({
      text,
      attachments: attachments || [],
      type: type || 'none',
      time,
      profileUrl: user.profileUrl,
      name: user.name,
      organisation,
      userId: user.id
    });
    await post.save();
    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export async function getPosts(req, res) {
  try {
    const user = await UserSchema.findById(req.userId);
    let posts = await Promise.all(
      user.organisations.map(async (org) => await PostSchema.find({ organisation: org }))
    );
    posts = posts.flat();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function likePost(req, res) {
  try {
    const user = await UserSchema.findById(req.userId);
    const { postId } = req.body;
    const post = await PostSchema.findById(postId);
    if (!user.organisations.includes(post.organisation)) {
      throw Error('You are not part of this organisation');
    }
    if (!post.likes.includes(user.id)) {
      post.likes.push(user.id);
      await post.save();
    }
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function commentPost(req, res) {
  try {
    const { postId, comment } = req.body;
    const user = await UserSchema.findById(req.userId);
    const post = await PostSchema.findById(postId);
    if (!user.organisations.includes(post.organisation)) {
      throw Error('You are not part of this organisation');
    }
    if (!post.comments.some((s) => s.userId == user.id)) {
      post.comments.push({ userId: user.id, comment });
      await post.save();
    }
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function pinPost(req, res) {
  try {
    const { postId } = req.body;
    const user = await UserSchema.findById(req.userId);
    if (user.userType !== 'admin') {
      throw Error('You are not an admin');
    }
    const post = await PostSchema.findById(postId);
    if (!user.organisations.includes(post.organisation)) {
      throw Error('You are not part of this organisation');
    }
    if (!post.isPinned) {
      post.isPinned = true;
      await post.save();
    }
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
