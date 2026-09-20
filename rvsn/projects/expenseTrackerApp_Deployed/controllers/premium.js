const expenseModel = require("../models/expense");
const userModel = require("../models/user");

const Sequelize = require('sequelize')

exports.getAllExpenseForLeaderBoard = async (req, res) => {
  
  /** 1st optimized approach for generating leaderboard totalExpense list by executing sql querries through sequelize*/
  //----------------------------

  try{
    const leaderboardToatalExpenseUserList = await userModel.findAll({
      attributes: [
        "id",
        "name",
        [Sequelize.fn("sum", Sequelize.col("expenses.amount")), "totalExpense"],
      ],
      include: [
        {
          model: expenseModel,
          attributes: [],
        },
      ],
      group: ["user.id"],
      order: [["totalExpense","DESC"]],
    });

  
    // console.log("allExpenses",leaderboardToatalExpenseUserList)
      res.status(200).json(leaderboardToatalExpenseUserList);
  }

  
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

  catch (err) {
    console.log(err);
  }
};
