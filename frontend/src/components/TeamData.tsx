import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { TeamType } from "../types/teamType";

interface Props { 
    team: TeamType
}

const TeamData = ({team} : Props) => {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const handleOpen = () => { 
    onOpen()
    console.log("Abriendo")
  }

  return (
    <>
      <p className="text-blue-600 font-medium text-md cursor-pointer" onClick={handleOpen}>{team.name}</p>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Informacion del Equipo</ModalHeader>
              <ModalBody className="flex flex-col items-center justify-center">
                 <div>
                     <h3>Nombre del equipo: {team.name}</h3>
                 </div>
                 <div>
                     <h3>Jugadores</h3>
                     <div>
                         {team.players.length > 0 ? 
                           team.players.map((player) => ( 
                             <div className="flex items-center gap-4">
                                 <img src={player.image} className="rounded-lg w-6 h-6"/>
                                 <p className="font-medium text-black">{player.name}</p>
                             </div>
                           )) : 
                           <div>
                            <p>Sin jugadores</p>
                           </div>
                         }
                     </div>
                 </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default TeamData