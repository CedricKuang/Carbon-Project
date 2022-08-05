// import user model
const UserModel = require("../db/models/User");
const ProjectModel = require("../db/models/Project");
const SectionModel = require("../db/models/Section");

const { User } = require("../db");
const { Section } = require("../db");

const isAuthenticated = async (req, res, next) => {
  // req.isAuthenticated() is a method passed from the passport
  // authentication that we can use to check whether
  // a user is authenticated.
  try {
    if (req.isAuthenticated()) {
      console.log(req.user);

      console.log("User is authenticated");
      return next();
    }
    console.log("User is NOT authenticated");
    res.redirect("/login");
  } catch (error) {
    res.status(500).json({ error, message: "Failed to check authentication" });
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    const { user } = req;
    const isAdmin = user.admin || user.superAdmin;

    res.status(200).json({ isAdmin });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const checkSuperAdmin = async (req, res) => {
  try {
    const { user } = req;
    const isSuperAdmin = user.superAdmin;

    res.status(200).json({ isSuperAdmin });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const { user } = req;
    const isSuperAdmin = user.superAdmin;
    let allUsers;

    if (isSuperAdmin) {
      allUsers = await User.find();
    } else {
      allUsers = await User.find({ admin: false, superAdmin: false });
    }

    res.status(200).json({
      allUsers,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAllProjects = async (req, res, next) => {
  // Cedric: I implement this way but I have not tested them yet. You can eleaborate them and test them.
  try {
    let allProjects = await ProjectModel.find({ status: "Ready to be viewed" });

    res.status(200).json({
      allProjects,
    });
  } catch (error) {
    res.status(500).json({ error, message: "Failed to get all projects" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.admin || req.user.superAdmin) {
      next();
    } else {
      res
        .status(401)
        .json({ message: "Unauthorized: You are not an admin  :P" });
    }
  } catch (error) {
    res.status(500).json({ error, message: "Failed to check if admin" });
  }
};

const isSuperAdmin = async (req, res, next) => {
  try {
    if (req.user.superAdmin) {
      next();
    } else {
      res
        .status(401)
        .json({ message: "Unauthorized: You are not the super admin  :P" });
    }
  } catch (error) {
    res.status(500).json({ error, message: "Failed to check if super admin" });
  }
};

const promote = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await UserModel.findById(id); //built in mongoose function

    user.admin = true;
    await user.save();

    res.status(200).json({ message: "Promoted to admin" });
  } catch (error) {
    res.status(500).json({ error, message: "Failed to promote" });
  }
};

const demote = async (req, res, next) => {
  //arrow function, use with react
  try {
    const { id } = req.body;
    const user = await UserModel.findById(id);

    user.admin = false;
    await user.save();

    res.status(200).json({ message: "Demoted to a regular user" });
  } catch (error) {
    res.status(500).json({ error, message: "Failed to demote" });
  }
};

//Admin Powers: Approving, Denying, Changes Requested, and Draft

const approve = async (req, res, next) => {
  try {
    const { id } = req.body;

    const project = await ProjectModel.findById(id); //built in mongoose function

    project.isApproved = true;
    project.status = "Approved";
    await project.save();

    res.status(200).json({ message: "Project has been approved" });
  } catch (error) {
    res.status(500).json({ error, message: "Fail to approve" });
  }
};

const deny = async (req, res, next) => {
  try {
    const { id } = req.body;

    const project = await ProjectModel.findById(id);

    project.isApproved = false;
    project.status = "Denied";
    await project.save();

    res.status(200).json({ message: "Project has been denied" });
  } catch (error) {
    res.status(500).json({ error, message: "Fail to deny" });
  }
};

const changesRequested = async (req, res, next) => {
  try {
    const { id } = req.body;

    const project = await ProjectModel.findById(id);

    project.isApproved = false;
    project.status = "Changes Requested";
    await project.save();

    res.status(200).json({
      message: "There have been some changes requested for your project.",
    });
  } catch (error) {
    res.status(500).json({ error, message: "Fail to send requests" });
  }
};

module.exports = {
  isAuthenticated,
  checkAdmin,
  checkSuperAdmin,
  getAllUsers,
  getAllProjects,
  isAdmin,
  isSuperAdmin,
  promote,
  demote,
  approve,
  deny,
  changesRequested,
};
