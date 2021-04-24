const db = require('../db');

async function getPosts(ctx) {
  const result = await db.query('SELECT * FROM posts');

  ctx.response.body = result.rows;
}

async function getPostWithId(ctx) {
  const postId = ctx.params.postId;

  const result = await db.query(
    'SELECT * FROM posts WHERE id = $1', 
    [postId]
  );

  if (result.rows < 1) {
    ctx.response.status = 404;

    return;
  }

  ctx.response.body = result.rows[0];
}

async function createPost(ctx) {
  const reqBody = ctx.request.body;

  await db.query(
    'INSERT INTO posts(title, body, tag) VALUES($1, $2, $3)',
    [reqBody.title, reqBody.body, reqBody.tag]
  );

  ctx.response.status = 201;
}

async function updatePost(ctx) {
  const reqBody = ctx.request.body;
  const fields = ['title', 'body', 'tag'];
  let query = 'UPDATE posts SET updated_at = NOW()';

  const validFields = fields.filter(v => reqBody[v] !== undefined);
  const validFieldsValues = validFields.map(v => reqBody[v]);

  if (validFields.length < 1) {
    ctx.response.status = 400;

    return;
  }

  for(let i = 1; i <= validFields.length; i++) {
    query += `, ${validFields[i-1]} = $${i}`;
  }

  query += ` WHERE ID = ${ctx.params.postId}`;

  console.info(query);
  console.info(validFieldsValues);
  await db.query(
    query,
    validFieldsValues,
  );

  ctx.response.status = 200;
}

async function deletePost(ctx) {
  const postId = ctx.params.postId;

  await db.query(`DELETE FROM posts WHERE id = ${postId}`);

  ctx.response.status = 200;
}

module.exports = {
  getPosts,
  getPostWithId,
  createPost,
  updatePost,
  deletePost,
};
