import {Router} from "express"
import {body, param} from "express-validator"
import { handleErrors } from "../middlewares/Errors"
import { createUser, addUserToNewTeam } from "../controllers/user"
import { validateTeamExist, validateTeamOwnerIsUser, validateTeamQuantityPlayers } from "../middlewares/TeamValidations"
import { validateUserExist, validateUserNameExist } from "../middlewares/UserValidations"

const router = Router()

router.post("/createUser",
        body("name").notEmpty().withMessage("Debes Ingresar tu nombre"),
        body("age").notEmpty().withMessage("Debes indicar tu edad"),
        handleErrors,
        createUser
)

router.post("/login",
        body("name").notEmpty().withMessage("Debes Ingresar tu nombre"),
        handleErrors,
        validateUserNameExist
)


router.post("/addUserToTeam/:teamId/:userId",
        param("teamId").isMongoId().withMessage("Equipo Invalido"),
        param("userId").isMongoId().withMessage("Usuario Invalido"),
        body("playerName").notEmpty().withMessage("Debes indicar al jugador que deseas agregar"),
        body("playerImage").notEmpty().withMessage("Debes agregar una imagen del jugador"),
        body("playerId").notEmpty().withMessage("Debes indicar el ID del jugador"),
        handleErrors,
        validateUserExist,
        validateTeamExist,
        validateTeamOwnerIsUser,
        validateTeamQuantityPlayers,
        addUserToNewTeam
)


export default router;