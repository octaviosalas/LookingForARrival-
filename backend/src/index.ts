import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import connectDataBase from "./database/db"
import teamRoutes from "./routes/teamRoutes"
import userRoutes from "./routes/userRoutes"


const port = process.env.PORT || 4000

dotenv.config()
const app = express()  
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/teams", teamRoutes)
app.use("/api/users", userRoutes)

app.listen(port, () => { 
    console.log(`REST API LavaderosApp - Practica con TypeScript funcionando en el puerto ${port}`)
    connectDataBase()
})


export default app