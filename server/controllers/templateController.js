const { User } = require("../db");
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

const createTemplate = async (req, res) => {
  try {
    const userId = req.user["_id"];
    const user = await User.findById(userId);
    const { templateName, sections } = req.body;

    let template = await Template.find({ templateName: req.body.templateName });
    if (Object.keys(template).length !== 0) 
    {
      res.status(500).json({message: "This template already exists"});
    }

    if (req.user.admin || req.user.superAdmin) {    // Admins can specify section in req
      const newTemplate = new Template({ templateName, sections, createdBy: userId });
      await newTemplate.save();

      user.templatesCreated.push(newTemplate._id);
      await user.save();
    
      res.status(200).json({ message: "New template created by admin", template: newTemplate });
    }
    else {   // Templates created by non-admins can only be seen by the creator
      const newTemplate = new Template({ templateName, createdBy: userId });
      await newTemplate.save();

      user.templatesCreated.push(newTemplate._id);
      await user.save();

      res.status(200).json({ message: "New template created by non-admin", template: newTemplate });
    }
  } catch (error) {
    res.status(500).json({ error, message: "Failed to create template" });
  }
};

const readTemplate = async (req, res) => {
  try {
    const userId = req.user["_id"];
    const user = await User.findById(userId);

    const { templateId } = req.params;
    const templateToFetch = await Template.findById(templateId);

    // Any user who creates a template or belongs to a section with that template can read it
    if (templateToFetch.createdBy == user || templateToFetch.sections == user.section) {   // TODO: this might need to be changed
      const templateData = templateToFetch.content;
      res.status(200).json(templateData);
    }
    else {
      res.status(500).json({ error, message: "Must be creator or in template section to read" });
    }
  } catch (error) {
    res.status(500).json({ error, message: "Failed to get template" });
  }
};

const updateTemplate = async (req, res) => {
  try {
    const userId = req.user["_id"];
    const user = await User.findById(userId);

    const { templateId } = req.params;
    const templateDetail = req.body;
    const templateToSave = await Template.findById(templateId);
    
    // A template can be updated by its creator or a superAdmin
    if (templateToSave.createdBy == user || req.user.superAdmin) {
      templateToSave.content = templateDetail;
      await templateToSave.save();
      res.status(200).json({ templateToSave });
    }
  } catch (error) {
    res.status(500).json({ error, message: "Failed to update template" });
  }
};

const deleteTemplate = async (req, res) => {
  try {
    let userId = req.user["_id"];
    const user = await User.findById(userId);

    const { templateId } = req.params;
    const templateToDelete = await Template.findById(templateId);

    // A template can be deleted by its creator or a superAdmin
    if (templateToDelete.createdBy == user || req.user.superAdmin) {
      // Delete template from the templatesCreated field of the User collection
      User.findById(userId, (err, user) => {
        let updatedTemplatesCreated = user.templatesCreated.filter(
          (currTemplateId) => {
            return String(currTemplateId) !== templateId;
          }
        );
        user.templatesCreated = updatedTemplatesCreated;
        user.save((err) => {
          if (err) {
            console.log(err);
            res.status(400).send("Error deleting template from User");
          }

          // Delete template from the Template collection
          Template.findByIdAndDelete(templateId, (err) => {
            if (err) {
              console.log(err);
              res.status(400).send("Error deleting template");
            }
            res.status(200).send("Successfully deleted template");
          });
        });
      });
    }
  } catch (err) {
    handleError(res);
  }
};

module.exports = {
  getAllTemplates,
  getUserTemplates,
  createTemplate,
  readTemplate,
  updateTemplate,
  deleteTemplate,
};