const db = require("../../../lib/db");
const escape = require("sql-template-strings");

module.exports = async (req, res) => {
  const [todo] = await db.query(escape`
    SELECT *
    FROM todos
    WHERE id = ${req.query.id}
  `);
  res.status(200).json({ todo });
};
