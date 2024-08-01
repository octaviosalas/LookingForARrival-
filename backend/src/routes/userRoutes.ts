import {Router} from "express"
import {body, param} from "express-validator"
import { handleErrors } from "../middlewares/Errors"
import { createUser, addUserToNewTeam } from "../controllers/user"
import { validateTeamExist, validateTeamOwnerIsUser } from "../middlewares/TeamValidations"
import { validateUserExist } from "../middlewares/UserValidations"

const router = Router()

router.post("/createUser",
        createUser
)

router.post("/addUserToTeam/:teamId/:userId",
        param("teamId").isMongoId().withMessage("Equipo Invalido"),
        param("userId").isMongoId().withMessage("Usuario Invalido"),
        body("playerName").notEmpty().withMessage("Debes indicar al jugador que deseas agregar"),
        body("playerImage").notEmpty().withMessage("Debes agregar una imagen del jugador"),
        handleErrors,
        validateUserExist,
        validateTeamExist,
        validateTeamOwnerIsUser,
        addUserToNewTeam
)


export default router;