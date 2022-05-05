import path from "path";
import multer from "multer";
import crypto from "crypto";

export default {

    directory: path.resolve(__dirname, "..", "..", "uploads"),

    storage: multer.diskStorage({

        destination: path.resolve(__dirname, "..", "..", "uploads"),

        filename(request, file, callback) {

            const fileHash = crypto.randomBytes(10).toString("hex");
            const filename = `${fileHash}-${file.originalname}`;

            callback(null, filename);
        }
    })
}
