import {Router} from "express"
import {body, param} from "express-validator"
import { handleErrors } from "../middlewares/Errors"
import {validateTeamDoesNotExist, validateNumberOfUserTeams} from "../middlewares/TeamValidations"
import {createTeam, usersTeams} from "../controllers/teams"
import { validateUserExist } from "../middlewares/UserValidations"

const router = Router()

router.post("/createTeam/:userId",
        param("userId").isMongoId().withMessage("Usuario Invalido"),
        body("name").notEmpty().withMessage("El nombre del equipo es obligatorio"),
        handleErrors,
        validateUserExist,
        validateTeamDoesNotExist,
        validateNumberOfUserTeams,
        createTeam
)

router.get("/userTeams/:userId",
        param("userId").isMongoId().withMessage("Usuario Invalido"),
        handleErrors,
        validateUserExist,
        usersTeams
)



export default router;