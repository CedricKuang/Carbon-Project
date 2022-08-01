const { Project } = require("../db");
const { User } = require("../db");
const { Section } = require("../db");
const { Template } = require("../db");

const getAllTemplates = async (req, res) => {
  try {
    const { user } = req;
    if (user.admin || user.superAdmin) {
      let allTemplates = await Template.find();
      res.status(200).json({
        allTemplates,
      });
    } else {
      res.status(401).json({ message: "Unauthorized: you are not an admin" });
    }
  } catch (err) {
    res.status(500).json({ error, message: "Failed to get all templates" });
  }
};

const getUserTemplates = async (req, res) => {
  try {
    let userId = req.params.userId;
    const user = await User.findById(userId);
    let templatesToFetch = await Template.find({ createdBy: user });
    res.status(200).json({ templatesToFetch });
  } catch (error) {
    res.status(500).json({ error, message: "Failed to get user's templates" });
  }
};

module.exports = {
  getAllTemplates,
  getUserTemplates,
};