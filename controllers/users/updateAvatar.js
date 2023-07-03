const { ctrlWrapper } = require("../../helpers");
const {
  ModelUs: { User },
} = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;

  const imageName = `${_id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    Jimp.read(`${avatarsDir}/${imageName}`, (err, imageName) => {
      if (err) throw err;
      imageName.resize(250, 250).write(`${avatarsDir}/${imageName}`);
    });

    res.status(201).json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
};
