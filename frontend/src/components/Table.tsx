import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import  { useEffect, useState } from 'react'
import { TeamType } from "../types/teamType";




interface Props { 
    userTeams: TeamType[];
}

interface ColumnsTypes { 
    allowsSorting: boolean;
    key: keyof TeamType | 'Detalle';
    label: string;
    cellRenderer?: (cell: any) => JSX.Element; // Optional property for custom rendering
}


const TableTeam = ({userTeams}: Props) => {
    
    const [tableData, setTableData] = useState<TeamType[]>([]);
    const [columns, setColumns] = useState<ColumnsTypes[]>([]);
    const [showTable, setShowTable] = useState<boolean>(false);

    const createTable = async (userTeams: TeamType[] | []) => { 
        try {           
                setTableData(userTeams)
                const propiedades = Object.keys(userTeams[0]) as (keyof TeamType)[];
                const filterProps = propiedades.filter(prop => prop !== "_id" && prop !== "__v" && prop !== "createdBy" && prop !== "players")
                const columnObjects = filterProps.map(propiedad => ({
                    key: propiedad,
                    label: propiedad.charAt(0).toUpperCase() + propiedad.slice(1),
                    allowsSorting: true
                }))

               
            const columnsNameUpdated = columnObjects.map(column => {
                if (column.key === 'name') {
                    return { ...column, label: 'Nombre' };
                } else if (column.key === 'players') {
                    return { ...column, label: 'Jugadores' };
                } else {
                    return column;
                }
            });

            columnsNameUpdated.push({
                key: 'Detalle',
                label: 'Detalle',
                allowsSorting: false, // Assuming Detalle doesn't need sorting
                cellRenderer: (cell) => {     
                    const filaActual = cell.row;
                    const id = filaActual._id;   
                    const players = filaActual.players;      
                    const item = { id, players };
                    return <p>Detalle</p>;
                },
            });    

                setColumns(columnsNameUpdated);       
                } catch (error) {
                console.log(error)
                }  
            }

            useEffect(() => {
                if (tableData.length > 0 && columns.length > 0) {
                    setShowTable(true);
                } else {
                    setShowTable(false);
                }
            }, [tableData, columns]);


            useEffect(() => { 
                createTable(userTeams)
            }, [])

 

         


  return (
    <div className='w-full flex flex-col items-center justify-center mt-2 '>
          {showTable ? 
          <div className="w-full flex flex-col justify-start">
                <p className="ml-2 font-medium text-sm xl:text-md text-black">Tus Servicios</p>
                <Table 
               aria-label="Controlled table example with dynamic content"
               className="w-3/4 flex items-start justify-start mt-2 max-h-[170px] 2xl:max-h-[400px] overflow-y-auto"
                  >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.key} className="text-left bg-blue-500 text-white w-full text-sm 2xl:text-md h-10"> {column.label}  </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={tableData}>
                      {(item) => (
                        <TableRow key={item.name}>
                        {columns.map((column) => (
                            <TableCell key={column.key} className='text-left text-sm 2xl:text-md'>
                                {String(item[column.key])}
                            </TableCell>
                        ))}
                       </TableRow>
                      )}
                        </TableBody> 
                  </Table> </div> : <p>Sin datos para mostrar</p>}

                 
              
         </div>
  );
}

export default TableTeam 