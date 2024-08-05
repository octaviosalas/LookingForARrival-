import {Router} from "express"
import {body, param} from "express-validator"
import { handleErrors } from "../middlewares/Errors"
import {validateTeamDoesNotExist, validateTeamExist,validateNumberOfUserTeams, validateHowMuchPlayers, validateIfAnyPlayerIsOnTheOtherTeam} from "../middlewares/TeamValidations"
import {createTeam, usersTeams, editTeamName, deleteTeam, addPlayersToTeam} from "../controllers/teams"
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

router.put("/changeName/:teamId",
        param("teamId").isMongoId().withMessage("Equipo Invalido"),
        body("name").notEmpty().withMessage("El nombre del equipo es obligatorio"),
        handleErrors,
        validateTeamExist,
        editTeamName
)

router.delete("/deleteTeam/:teamId",
        param("teamId").isMongoId().withMessage("Equipo Invalido"),
        handleErrors,
        validateTeamExist,
        deleteTeam
)

router.post("/addNewPlayer/:teamId/:userId",
        param("teamId").isMongoId().withMessage("Equipo Invalido"),
        body("players").notEmpty().withMessage("Debes añadir al menos un jugador"),
        handleErrors,
        validateHowMuchPlayers,
        validateIfAnyPlayerIsOnTheOtherTeam,
        addPlayersToTeam
)

export default router;