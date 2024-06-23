const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    //const name = `${req._id}.${file.originalname.split(".").at(-1)}`
    const name = `${req._id}`;
    req.fileName = name;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
