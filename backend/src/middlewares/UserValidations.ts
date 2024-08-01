import type { Request, Response, NextFunction } from "express"
import User from "../models/user"

export const validateUserExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const { userId } = req.params

    try {
       const user = await User.findById(userId)

       if(!user) { 
        res.status(400).json("El usuario seleccionado no existe")
       } else {
        next()
        }
    
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}


