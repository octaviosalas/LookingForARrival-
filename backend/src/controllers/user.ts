import { Request, Response } from "express";
import User from "../models/user";
import { Types } from "mongoose";
import Team from "../models/team";

export const createUser = async (req: Request, res: Response) => { 
    
    try {
       const userToBeRegistered = new User(req.body)
       await userToBeRegistered.save()
       res.status(200).send("Has creado exitosamente tu cuenta como usuario")
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "error", error})
    }
}


export const addUserToNewTeam = async (req: Request, res: Response) => { 

    const {teamId} = req.params
    
    try {
       const teamChoosen = await Team.findById(teamId)
       
        teamChoosen.players.push({ 
            name: req.body.playerName,
            image: req.body.playerImage,
            id: req.body.playerId
        })
        await teamChoosen.save();

       res.status(200).send("Has añadido exitosamente al equipo al jugador")
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "error", error})
    }
}