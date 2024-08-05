import Spinner from "./Spinner";
import { useEffect, useState, useCallback } from "react";
import backendUrl from "../config/apiUrl";
import { userStore } from "../store/store";
import handleError from "../utils/handleAxiosErrors";
import { TeamType } from "../types/teamType";
import { useNavigate } from "react-router-dom";
import MessageTeamComplete from "./MessageTeamComplete";
import TeamCardData from "./TeamCardData";

const MyTeams = () => {
    const { user } = userStore();
    const [load, setLoad] = useState<boolean>(false);
    const [userTeams, setUserTeams] = useState<TeamType[]>([]);
    const navigate = useNavigate();

    const getTeams = useCallback(async () => { 
      setLoad(true);
      try {
        const { data, status } = await backendUrl.get(`/teams/userTeams/${user?._id}`);
        if (status === 200) { 
          setUserTeams(data);
        }
      } catch (error) {
        handleError(error, setLoad);
      } finally {
        setLoad(false);
      }
    }, [user]);

    useEffect(() => { 
      getTeams();
    }, [getTeams]);


    return (
      <div className="flex flex-col items-center justify-center">
        {load ? ( 
          <div className="mt-12 lg:mt-24">
            <Spinner />
          </div>
        ) : userTeams.length > 0 ? (
          <>
            <TeamCardData userTeams={userTeams} getTeams={getTeams} />
            <div className="flex items-center justify-center w-full">
              <MessageTeamComplete teams={userTeams} />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center mt-12 lg:mt-24">
            <button className="cursor-pointer text-lg bg-blue-500 text-white font-medium rounded-lg h-auto w-72" onClick={() => navigate("/createTeam")}>Crear mi Primer Equipo</button>
          </div>
        )}
      </div>
    );
  }

export default MyTeams;