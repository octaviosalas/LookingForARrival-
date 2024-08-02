import {create} from "zustand"
import { userAccountData } from "../types/userData"

type userAccountStore = { 
   user: userAccountData | null,
   setUserAccountData: (data: userAccountData | null) => void,
}


export const userStore = create<userAccountStore>((set) => ({ 
     user: null,
     setUserAccountData: (data: userAccountData | null) => set({ user: data }),
}))
