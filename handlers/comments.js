const db = require('../db');

async function getComments(ctx) {
  const postId = ctx.params.postId;

  const result = await db.query(`SELECT * FROM comments WHERE post_id = ${postId}`);

  ctx.response.body = result.rows;
}

module.exports = {
  getComments,
}
