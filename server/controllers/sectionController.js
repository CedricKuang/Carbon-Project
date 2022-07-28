const UserModel = require("../db/models/User");
const SectionModel = require("../db/models/Section");

const { User } = require("../db");
const { Section } = require("../db");

 
// to be tested and wait for implementation of section shcema
const assignSection = async (req, res, next) => {
    try {
      const { userId, sectionId } = req.body;
      const user = await UserModel.findById(userId);
      const section = await SectionModel.findById(sectionId);
  
      user.sections.push(section._id);
      section.members.push(user._id);
  
      await user.save();
      await section.save();
  
    } catch (error) {
      res.status(500).json({error, message: "Fail to assign user to section"});
    }
  }
  
  // to be tested and wait for implementation of section shcema
const removeSection = async (req, res, next) => {
    try {
      const { userId, sectionId } = req.body;
      const user = await UserModel.findById(userId);
      const section = await SectionModel.findById(sectionId);
  
      let updatedSections = user.sections.filter(
        (currSectionId) => {
          return String(currSectionId) !== sectionId;
        }
      );
      user.sections = updatedSections;
  
      let updatedMember = section.members.filter(
        (currMember) => {
          return String(currMember) !== userId;
        }
      );
      section.members = updatedMember;
  
      await user.save();
      await section.save();
  
    } catch (error) {
      res.status(500).json({error, message: "Fail to assign user to section"});
    }
}

const createSection = async (req, res) => {
    try {
      const userId = req.user["_id"];
      const { sectionName } = req.body;
      const newSection = new Section({ sectionName, director: userId });

      await newSection.save();
  
      res.status(200).json({ message: "New section created", section: newSection });
    } catch (error) {
      res.status(500).json({ error, message: "Failed to create section" });
    }
};
  
const deleteSection = async (req, res) => {
    try {
      SectionModel.findByIdAndDelete(req.params.sectionid, (err) => {
        if (err) {
          console.log(err);
          res.status(400).json("Failed to delete section");
        }
        res.status(200).json("Successfully deleted section");
      });
    } catch (error) {
      res.status(500).json({ error, message: "Failed to delete section" });
    }
};
  
const getAllSections = async (req, res) => {
    try {
      let allSections = await SectionModel.find();
      res.status(200).json({
        allSections,
      });
    } catch (error) {
      res.status(500).json({ error, message: "Failed to get all sections" });
    }
};

const changeDirector = async (req, res, next) => {
  try {
    const directorId = req.body.directorId;
    const sectionId = req.body.sectionId;

    const section = await SectionModel.findById(sectionId);
    section.director = directorId;
    await section.save();
    
  } catch (error) {
    res.status(500).json({ error, message: "Faailed to change the director"});
  }
}

module.exports = {
    createSection,
    deleteSection,
    getAllSections,
    assignSection,
    removeSection,
    changeDirector,
};
