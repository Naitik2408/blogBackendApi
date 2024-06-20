// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./public/temp")
//     },
//     filename: function (req, file, cb) {
//       console.log("Saving file:", file.originalname);
//       cb(null, file.originalname)
//     }
//   })
  
// export const upload = multer({ 
//     storage, 
// })

import multer from "multer";

// Use memory storage to handle file uploads
const storage = multer.memoryStorage();

export const upload = multer({ storage });