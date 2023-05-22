const multer = require("multer");
const path = require("path");

const tempDir = path.resolve("temp");

const storage = multer.diskStorage({
  destination: tempDir,
  filename: function (req, file, cb) {
    const uniquePreffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniquePreffix}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
