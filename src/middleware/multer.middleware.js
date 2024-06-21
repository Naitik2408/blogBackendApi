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

const storage = multer.memoryStorage(); // Store file in memory instead of disk

export const upload = multer({ storage });
