import { Request, Response } from "express";
import Team from "../models/team";

export const createTeam = async (req: Request, res: Response) => { 

    const {userId} = req.params
    const {name} = req.body
    
    try {
       const teamToBeRegistered = new Team({
         name: name,
         createdBy: userId
       })
       await teamToBeRegistered.save()
       res.status(200).send("Has creado exitosamente tu equipo")
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "error", error})
    }
}
