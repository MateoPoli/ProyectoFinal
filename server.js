const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*Rutas de mi proyecto*/
const apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);

const courseRoutes = require("./routes/course.route");
app.use("/course", courseRoutes);

const studentRoutes = require("./routes/student.route");
app.use("/students", studentRoutes);

const scoreRoutes = require("./routes/score.routes");
app.use("/score", scoreRoutes);

app.use((error, req, res, next)=>{
  const status = error.statusCode || 500;
  const message = error.message;
  const data= error.data;
  res.status(status).json({message,data});
});

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`);
  });
});
