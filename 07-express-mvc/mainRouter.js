// const product = require("../Model/Homes");
const express = require("express");
const MainRouter = express.Router();


MainRouter.get("/", (req, res) => {
  res.render("Mainpage");
});
  
  module.exports = MainRouter;