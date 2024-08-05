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

export const validateHowMuchPlayers = async (req: Request, res: Response, next: NextFunction) => { 
     
    const { teamId } = req.params
    const { players } = req.body

    try {
       const teamSelected = await Team.findById(teamId)
       const actualQuantity = teamSelected.players.length
       const newQuantity = players.length

       if(actualQuantity + newQuantity > 5) { 
        res.status(404).send("La cantidad de jugadores que deseas añadir supera los 5 posibles")
       } else { 
        next()
       }
    
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

export const validateIfAnyPlayerIsOnTheOtherTeam = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, teamId } = req.params;
    const { players } = req.body;

    console.log("ME LLEGO!", userId)
    console.log("ME LLEGO PLAYERS REQUEST BODY!", players)
  
    try {
      const teams = await Team.find({ createdBy: userId, _id: { $ne: teamId } });
      console.log("OTROS EQUIPOS", teams)
      const newPlayerIds = players.map((player: any) => player.id);
      console.log("newPlayerIds", newPlayerIds)
  

      const playerExists = teams.some(team => 
        team.players.some((player: any) => newPlayerIds.includes(player.id))
      );
  
      if (playerExists) {
        console.log(playerExists)
        return res.status(404).send('Uno o más jugadores ya existen en otros equipos');
      } else { 
        next(); 
      }
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Hubo un error en el middleware', error });
    }
  };