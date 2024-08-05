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

export const validateUserNameExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const { name } = req.body

    try {
        const user = await User.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });

       if(!user) { 
        res.status(400).json(`No se encontro un usuario registrado con el nombre ${name}`)
       } else {
        res.status(200).json({data: "Ingresando a tu cuenta", userData: user})
        }
    
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

