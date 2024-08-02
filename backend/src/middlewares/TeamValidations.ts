import type { Request, Response, NextFunction } from "express"
import Team from "../models/team"
import User from "../models/user"

export const validateTeamDoesNotExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const { name } = req.body

    try {
       const verifyTeamName = await Team.findOne({name: name})

       if(verifyTeamName) { 
        res.status(400).json("El nombre del equipo ya existe, elige otro")
       } else {
        next()
        }
    
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

export const validateNumberOfUserTeams = async (req: Request, res: Response, next: NextFunction) => { 
     
    const { userId } = req.params

    try {
    
       const userTeams = await Team.find({createdBy: userId})

       if(userTeams.length >= 2) { 
        res.status(400).json("No puedes agregar mas de dos equipos")
       } else {
        next()
        }
    
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

export const validateTeamExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const { teamId } = req.params

    try {
       const teamSelected = await Team.findById(teamId)

       if(!teamSelected) { 
        res.status(400).json("El equipo no existe")
       } else {
        next()
        }
    
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

export const validateTeamOwnerIsUser = async (req: Request, res: Response, next: NextFunction) => { 
     
    const { teamId, userId } = req.params

    try {
       const teamSelected = await Team.findById(teamId)
       const ownerId = teamSelected.createdBy.toString();
       
       if(ownerId !== userId) { 
        res.status(400).json("No sos el creador de este equipo, por lo cual no podes agregar nuevos jugadores")
       } else {
        next()
        }
    
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}


export const validateTeamQuantityPlayers = async (req: Request, res: Response, next: NextFunction) => { 
     
    const { teamId } = req.params

    try {
       const teamSelected = await Team.findById(teamId)
       const players = teamSelected.players.length
       console.log("Tiene", players)
       
       if(players >= 5) { 
        res.status(404).json("Este equipo ya cuenta con 5 jugadores")
       } else { 
        next()
       }
    
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}
