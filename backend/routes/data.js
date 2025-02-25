const express = require("express");
const router = express.Router();

router.get("/sensor", (req, res) => {
  const sensorData = { moisture: Math.random() * 100, temperature: Math.random() * 35 };
  res.json(sensorData);
});

module.exports = router;
