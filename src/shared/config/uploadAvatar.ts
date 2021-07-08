import multer from "multer";
import crypto from "crypto";
import path from "path";

const pathFileFolder = path.resolve(__dirname, "..", "..", "..", "tmp");

export default {
  directory: pathFileFolder,
  storage: multer.diskStorage({
    destination: pathFileFolder,
    filename(request, file, callbak) {
      const nameFileHash = crypto.randomBytes(10).toString("hex");
      const fileNameFinal = `${nameFileHash}-${file.originalname}`;

      callbak(null, fileNameFinal);
    },
  }),
};
