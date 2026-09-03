const multer = require('multer');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, 'public/images/');
    } else if (file.mimetype.startsWith('video/')) {
      cb(null, 'public/videos/');
    }
  },

  filename: (req, file, cb) => {
    const randomId = crypto.randomBytes(20).toString("hex");
    cb(null, `${randomId}-${file.originalname}`);
  }
})

const fileFilter = (req, file, cb) => {
  if(
    file.mimetype.startsWith('image/') ||
    file.mimetype.startsWith('video/')
  ) {
    cb(null, true);
  }else {
    cb(null, false);
  }
}

const upload = multer({
  storage,
  fileFilter
})

// app.use(multer({storage, fileFilter}).array('images'));

module.exports = upload;