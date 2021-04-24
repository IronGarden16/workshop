const KoaRouter = require('@koa/router');
const router = new KoaRouter();
const postHandlers = require('./handlers/posts');
const commentHandlers = require('./handlers/comments');

router.prefix('/posts')
router.get('/:postId', postHandlers.getPostWithId);
router.get('/', postHandlers.getPosts);
router.post('/', postHandlers.createPost);
router.put('/:postId', postHandlers.updatePost);
router.delete('/:postId', postHandlers.deletePost);

router.get('/:postId/comments', commentHandlers.getComments);

module.exports = router;