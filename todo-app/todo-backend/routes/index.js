const express = require("express");
const router = express.Router();

const configs = require("../util/config");
const { get } = require("../redis");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

router.get("/statistics", async (_, res) => {
  let addedTodos = 0;

  try {
    const count = await get("added_todos");
    addedTodos = Number(count ?? 0);
  } catch (error) {
    console.error("Failed to read added_todos from Redis:", error);
  }

  res.send({ added_todos: addedTodos });
});

module.exports = router;
