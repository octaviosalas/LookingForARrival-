interface CreatedBy {
    _id: string;
    name: string;
  }
  
  interface TeamPlayers {
    id: string;
    image: string;
    name: string;
    _id: string;
  }

  export interface newTeamPlayers {
    id: string;
    image: string;
    name: string;
  }
  
 export interface TeamType {
    createdBy: CreatedBy;
    name: string;
    players: TeamPlayers[] | [];
    _id?: string; 
    __v?: number; 
  }