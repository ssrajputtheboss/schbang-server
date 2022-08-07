import express from 'express';
import { getMessages, sendMessage } from '../controllers/message.js';
import { addPost, commentPost, getPosts, likePost, pinPost } from '../controllers/post.js';
import { addUser, logInUser } from '../controllers/user.js';
import { addToDo, getToDos, updateToDo } from '../controllers/todo.js';
const router = express.Router();

router.post('/login', logInUser);
router.post('/signup', addUser);
router.get('/getPosts', getPosts);
router.post('/addPost', addPost);
router.post('/pinPost', pinPost);
router.post('/likePost', likePost);
router.post('/commentPost', commentPost);
router.get('/getMessages', getMessages);
router.post('/sendMessage', sendMessage);
router.get('/getToDos', getToDos);
router.post('/addToDo', addToDo);
router.post('/updateToDo', updateToDo);

export default router;
