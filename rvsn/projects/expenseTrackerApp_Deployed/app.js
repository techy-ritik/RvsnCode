const express = require("express");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const fs = require("fs");

const dotenv = require("dotenv");
dotenv.config();

const userRoute = require("./routes/user");
const expenseRoute = require("./routes/expense");
const paymentRoute = require("./routes/payment");
const premiumRoute = require("./routes/premium");
const aiRoute = require("./routes/AI");

require("./models");

const sequelize = require("./util/database");

const app = express();

// app.use(helmet());
app.use(compression());

const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});
app.use(morgan('combined', {stream : accessLogStream}));     

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("views"));

app.use(express.json({ extended: false }));

app.use("/", userRoute);
app.use("/expense", expenseRoute);
app.use("/payments", paymentRoute);
app.use("/premium", premiumRoute);
app.use("/ai", aiRoute);

// sequelize.sync({alter:true})
sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("server is running on port : 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
