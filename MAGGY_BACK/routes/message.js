var express = require("express");
var router = express.Router();
const Pusher = require("pusher");

const pusher = new Pusher({
    app_id : "1770059",
    key : "ebf3a2cca566dfc72216",
    secret : "26d66ea077027bd9ec89",
    cluster : "eu",
  useTLS: true,
});


// Join chat

router.put("/users/:pseudo", (req, res) => {
  pusher.trigger("chat", "join", {
    pseudo: req.params.pseudo,
  });

  res.json({ result: true });
});

// Leave chat

router.delete("/users/:pseudo", (req, res) => {
  pusher.trigger("chat", "leave", {
    pseudo: req.params.pseudo,
  });

  res.json({ result: true });
});

// Send message

router.post("/message", (req, res) => {
  const message = req.body;

  pusher.trigger("chat", "message", message);

  res.json({ result: true });
});

module.exports = router;