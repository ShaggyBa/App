import express from "express";


import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";
import dotEnv from "dotenv";


import routes from "./routes/general.js";

import { routeNotFound, errorHandler } from "./middleware/errorMiddleware.js";

/* DATA IMPORTS */
import User from "./models/User.js";
import Project from "./models/Project.js";
import Task from "./models/Task.js";
import { dataUser, dataProject, dataTasks } from "./data/index.js"
import { dbConnect } from "./utils/index.js";
import cookieParser from "cookie-parser";


/* CONFIGURATIONS */

dotEnv.config();

const PORT = process.env.PORT || 7777;

const app = express();

app.use(cors({
	origin: ["http://localhost:3000", "http://localhost:3001", "https://tasker-iswhlmdj4-shaggybas-projects.vercel.app", "https://tasker-app-pied.vercel.app"],
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))

app.use(cookieParser())

app.use(morgan("dev"))

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", routes)
// app.use('/general', generalRoutes);

app.use(routeNotFound)

app.use(errorHandler)

dbConnect()
	.then(() => console.log('Connected to DB'))
	.then(() => {
		app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
		/* ONLY ADD DATA ONE TIME */
		// User.insertMany(dataUser)
		// Project.insertMany(dataProject)
		// Task.insertMany(dataTasks)
	})
	.catch(err => console.log(`Not connected. Error: ${err}`))


/* 
!Задание для серверной части
Todo 
1. Если коннект к удаленной БД не происходит - попытаться делать коннект к локальной (только для разработки)

Todo - completed
2. Сделать коннект к определенной БД, а именно Project_Y 

Todo - completed
3. Закинуть в коллекцию Users данные о пользователях (для разработки)


Todo - completed
4. Cделать схему Project и добавить тестовые данные проектов в базу данных

Todo - completed
5. Настроить аутентификацию (пока без непосредственного входа) и получать список проектов пользователя

Todo
6. При переходе к проекту - выводить его данные, в особенности задачи

Todo
7. При клике на задачу - выводить ее данные
*/