const db = require("../../../lib/db");
const escape = require("sql-template-strings");

module.exports = async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  if (page < 1) page = 1;
  const todos = await db.query(escape`
      SELECT *
      FROM todos
      ORDER BY id
      LIMIT ${(page - 1) * limit}, ${limit}
    `);
  const count = await db.query(escape`
      SELECT COUNT(*)
      AS todosCount
      FROM todos
    `);
  const { todosCount } = count[0];
  const pageCount = Math.ceil(todosCount / limit);
  res.status(200).json({ todos, pageCount, page });
};
