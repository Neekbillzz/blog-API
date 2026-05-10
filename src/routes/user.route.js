const express = require("express");
const multer = require("multer");
const { registerUser, loginUser } = require("../controllers/user.controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No images uploaded.");
  }

  const fileUrl = req.file.path;
  const fileName = req.file.filename;

  console.log(fileName);
  console.log(fileUrl);

  res.send(" Image Uploaded");
});

router.post("/create-post", upload.array("images", 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No images uploaded.");
  }

  const imageData = req.files.map((file) => ({
    url: file.path,
    id: file.filename,
  }));

  console.log(imageData);
  res.send({ message: "Images Uploaded", data: imageData });
});

router.post("/sign-up", registerUser);
router.post("/login", loginUser);

module.exports = router;
