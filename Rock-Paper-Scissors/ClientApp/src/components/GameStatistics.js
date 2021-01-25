import React, { useEffect, useState } from "react";
import authService from "./api-authorization/AuthorizeService";
import { formatDistance } from "date-fns";
import {
  FaRegHandRock,
  FaRegHandScissors,
  FaRegHandPaper,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

export const GameStatistics = () => {
  const [gameStatistics, setGameStatistics] = useState([{}]);
  const [loading, setLoading] = useState(true);

  const getGameResult = async () => {
    const token = await authService.getAccessToken();
    const response = await fetch("game", {
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
    });

    const results = await response.json();
    setGameStatistics(results);
    setLoading(false);
  };

  useEffect(() => {
    getGameResult();
  }, []);

  const userOptions = {
    1: <FaRegHandRock />,
    2: <FaRegHandScissors />,
    3: <FaRegHandPaper />,
  };

  const renderGameStatisticsTable = () => {
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Time</th>
            <th>Won</th>
            <th>Tie</th>
            <th>User Option</th>
            <th>Machine Option</th>
          </tr>
        </thead>
        <tbody>
          {gameStatistics.map((gameResult) => {
            return (
              <tr key={gameResult.id}>
                <td>
                  {gameResult.created
                    ? `${formatDistance(
                        new Date(gameResult.created),
                        new Date()
                      )} ago`
                    : gameResult.created}
                </td>
                <td>
                  {gameResult.win ? (
                    <FaCheck className="text-success" />
                  ) : (
                    <FaTimes className="text-danger" />
                  )}
                </td>
                <td>
                  {gameResult.tie ? (
                    <FaCheck className="text-success" />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{userOptions[gameResult.selectedOptionUser]}</td>
                <td>{userOptions[gameResult.selectedOptionMachine]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  let contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    renderGameStatisticsTable()
  );

  return (
    <div>
      <h1 id="tabelLabel">Game Statistics</h1>
      <p>The most recent results</p>
      {contents}
    </div>
  );
};
