import { Request, Response } from "express";
import Team from "../models/team";
import User from "../models/user";

export const createTeam = async (req: Request, res: Response) => { 

    const {userId} = req.params
    const {name, players} = req.body
    
    try {
       const teamToBeRegistered = new Team({
         name: name,
         createdBy: userId,
         players: players
       })
       await teamToBeRegistered.save()
       res.status(200).send(`Has creado exitosamente tu equipo ${name}`)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "error", error})
    }
}

export const usersTeams = async (req: Request, res: Response) => { 

  const {userId} = req.params
  console.log(userId)
  
  try {
     const userTeamsDetected = await Team.find({createdBy: userId}).populate({ 
      path: "createdBy",
      model: User,
      select: "name"
  })
     res.status(200).send(userTeamsDetected)
  } catch (error) {
      console.log(error)
      res.status(500).json({message: "error", error})
  }
}

export const editTeamName = async (req: Request, res: Response) => { 

  const {teamId} = req.params
  const {name} = req.body
  
  try {

     const userTeamsDetected = await Team.findByIdAndUpdate(teamId, { 
        name: name
     }, {new: true})

     await userTeamsDetected.save()
     res.status(200).send("Nombre modificado")

  } catch (error) {
      console.log(error)
      res.status(500).json({message: "error", error})
  }
}

export const deleteTeam = async (req: Request, res: Response) => { 

  const {teamId} = req.params
  
  try {

     await Team.findByIdAndDelete(teamId)
     res.status(200).send("Equipo eliminado")
     
  } catch (error) {
      console.log(error)
      res.status(500).json({message: "error", error})
  }
}