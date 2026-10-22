const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();


exports.uploadToS3=async(expenseData, fileName)=> {
  try {
    let s3Bucket = new AWS.S3({
      accessKeyId: process.env.IAM_USER_KEY,
      secretAccessKey: process.env.IAM_USER_SECRET_KEY,
    });

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
      Body: expenseData,
      ACL: "public-read",
    };
    return new Promise((resolve, reject) => {
      s3Bucket.upload(params, (err, s3response) => {
        if (err) {
          console.log("something went wrong");
          reject(err);
        } else {
          console.log("success", s3response);
          resolve(s3response.Location);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
}
