// const AWS = require("aws-sdk");
// const dotenv = require("dotenv");
// dotenv.config();
const expenseModel = require("../models/expense");
const userModel = require("../models/user");
const downloadedFilesRecordModel = require("../models/downloadedReportFilesLink");
const S3Services = require("../services/S3");
const Sequelize = require("sequelize");

exports.getAllExpenseForLeaderBoard = async (req, res) => {
  /** final optimized approach for generating leaderboard totalExpense list by saving totalExpense in the user table itself and fetch from there only */
  try {
    if (req.user.userType === "non-premium") {
      console.log("not a premium user");
      res.status(401).json({ message: "not a premium user" });
    } else {
      const leaderboardToatalExpenseUserList = await userModel.findAll({
        attributes: ["name", "totalExpense"],
        order: [["totalExpense", "desc"]],
      });

      res.status(200).json(leaderboardToatalExpenseUserList);
    }
  } catch (err) {
    /** 1st optimized approach for generating leaderboard totalExpense list by executing sql querries through sequelize*/
    //----------------------------

    // try{
    //   const leaderboardToatalExpenseUserList = await userModel.findAll({
    //     attributes: [
    //       "id",
    //       "name",
    //       [Sequelize.fn("sum", Sequelize.col("expenses.amount")), "totalExpense"],
    //     ],
    //     include: [
    //       {
    //         model: expenseModel,
    //         attributes: [],
    //       },
    //     ],
    //     group: ["user.id"],
    //     order: [["totalExpense","DESC"]],
    //   });

    //   // console.log("allExpenses",leaderboardToatalExpenseUserList)
    //     res.status(200).json(leaderboardToatalExpenseUserList);
    // }

    /** brute force approach for leaderboard  totalExpense list */
    //----------------------------------------------------------

    // try {
    //   const allExpenses = await expenseModel.findAll({
    //     order: [["UserId", "ASC"]],
    //   });

    //   let tempUserId = allExpenses[0].UserId;
    //   let totalExpense = 0;
    //   let leaderboardList = [];
    //   for (const expense of allExpenses) {
    //     // here we use for.. ..of looping because await is valid only in async functions and when we use forEach it behaves like normal function but for. .of is just looping mechanism

    //     if (tempUserId == expense.UserId) {
    //       totalExpense += expense.amount;
    //       if (allExpenses.length - 1 == allExpenses.indexOf(expense)) {
    //         const userName = await userModel.findByPk(tempUserId);

    //         const userTotalExpense = {
    //           id: tempUserId,
    //           name: userName.name,
    //           totalExpense: totalExpense,
    //         };
    //         leaderboardList.push(userTotalExpense);
    //       }
    //     } else {
    //       const userName = await userModel.findByPk(tempUserId);

    //       const userTotalExpense = {
    //         id: tempUserId,
    //         name: userName.name,
    //         totalExpense: totalExpense,
    //       };
    //       leaderboardList.push(userTotalExpense);
    //       tempUserId = expense.UserId;
    //       totalExpense = expense.amount;
    //     }
    //   }

    //   leaderboardList.sort((a,b)=>{return b.totalExpense - a.totalExpense;})        // sorted array using .sort() method

    //   // for(let i=0;i<leaderboardList.length;i++){            // sorting array using selection sort
    //   //     for(let k=i+1;k<leaderboardList.length;k++){
    //   //         if(leaderboardList[i].totalExpense<leaderboardList[k].totalExpense){
    //   //             const temp = leaderboardList[i];
    //   //             leaderboardList[i]= leaderboardList[k];
    //   //             leaderboardList[k] = temp;
    //   //         }
    //   //     }
    //   // }

    //   res.status(200).json(leaderboardList);
    //   console.log("leaderboardList", leaderboardList);
    // }

    console.log(err);
  }
};

exports.expenseReportDownload = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    if (req.user.userType === "non-premium") {
      console.log("not a premium user");
      res.status(401).json({ message: "not a premium user" });
    } else {
      const userExpenses = await req.user.getExpenses();

      const stringifyedExpenses = JSON.stringify(userExpenses);
      const fileName = `expenses${loggedInUserId}-${new Date()}.txt`;

      const fileUrl = await S3Services.uploadToS3(
        stringifyedExpenses,
        fileName,
      );

      await downloadedFilesRecordModel.create({
        fileLink: fileUrl,
        UserId: loggedInUserId,
      });

      console.log("userExpenses", fileUrl);

      res.status(200).json({ fileUrl, message: "data uploaded successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};

// async function uploadToS3(expenseData, fileName) {
//   try {
//     let s3Bucket = new AWS.S3({
//       accessKeyId: process.env.IAM_USER_KEY,
//       secretAccessKey: process.env.IAM_USER_SECRET_KEY,
//     });

//     const params = {
//       Bucket: process.env.BUCKET_NAME,
//       Key: fileName,
//       Body: expenseData,
//       ACL: "public-read",
//     };
//     return new Promise((resolve,reject)=>{
//       s3Bucket.upload(params, (err, s3response) => {
//         if (err) {
//           console.log("something went wrong");
//           reject(err)
//         } else {
//           console.log("success", s3response);
//           resolve(s3response.Location);
//         }
//       });
//     })

//   } catch (err) {
//     console.log(err);
//   }
// }

exports.oldReportDownload = async (req, res) => {
  try {
    const logedInUserId = req.user.id;

    if (req.user.userType === "non-premium") {
      console.log("not a premium user");
      res.status(401).json({ message: "not a premium user" });
    } else {
      const currentUserReportList = await downloadedFilesRecordModel.findAll({
        where: { UserId: logedInUserId },
      });

      res.status(200).json(currentUserReportList);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
