import React, { useState } from "react";
import cx from "classnames";
import authService from "./api-authorization/AuthorizeService";
import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
  Button,
  CardText,
} from "reactstrap";
import {
  FaRegHandRock,
  FaRegHandScissors,
  FaRegHandPaper,
} from "react-icons/fa";
import { BsQuestion } from "react-icons/bs";

const userOptions = {
  1: "FaRegHandRock",
  2: "FaRegHandScissors",
  3: "FaRegHandPaper",
};

const gameOptions = {
  Win: "WIN",
  Lose: "LOSE",
  Tie: "TIE",
};

export const Play = () => {
  const [userWins, setUserWins] = useState(0);
  const [machineWins, setMachineWins] = useState(0);
  const [ties, setTies] = useState(0);
  const [userIconSelected, setUserIconSelected] = useState("BsQuestion");
  const [machineIconSelected, setMachineIconSelected] = useState("BsQuestion");
  const [gameResults, setGameResults] = useState("");
  const [round, setRound] = useState(0);

  const getGameResult = async (selectedOption) => {
    const token = await authService.getAccessToken();
    const response = await fetch(`game?SelectedOptionUser=${selectedOption}`, {
      method: "POST",
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    const { win, tie, selectedOptionMachine } = data;

    if (tie) {
      setTies(ties + 1);
      setGameResults(gameOptions.Tie);
    }
    if (win) {
      setUserWins(userWins + 1);
      setGameResults(gameOptions.Win);
    }
    if (!tie && !win) {
      setMachineWins(machineWins + 1);
      setGameResults(gameOptions.Lose);
    }
    setMachineIconSelected(userOptions[selectedOptionMachine]);
    setRound(round + 1);
  };

  const onUserSelectOption = (option) => {
    setUserIconSelected(userOptions[option]);
    getGameResult(option);
  };

  return (
    <Container className="text-center text-md-center">
      <h2 className="text-danger">Round {round}</h2>
      <Row>
        <Col xs="20" md="4" sm="6">
          <div>WIN</div>
          <span>{userWins}</span>
          <Card className="d-flex align-items-center">
            {userIconSelected === "BsQuestion" && <BsQuestion size={200} />}
            {userIconSelected === "FaRegHandRock" && (
              <FaRegHandRock size={200} />
            )}
            {userIconSelected === "FaRegHandScissors" && (
              <FaRegHandScissors size={200} />
            )}
            {userIconSelected === "FaRegHandPaper" && (
              <FaRegHandPaper size={200} />
            )}
            <CardBody>
              <Button
                className="rounded-circle rounded-lg"
                outline
                color="danger"
                onClick={() => onUserSelectOption(1)}
              >
                <FaRegHandRock size={15} />
              </Button>
              <Button
                className="rounded-circle rounded-lg m-3"
                outline
                color="danger"
                onClick={() => onUserSelectOption(2)}
              >
                <FaRegHandScissors size={15} />
              </Button>
              <Button
                className="rounded-circle rounded-lg"
                outline
                color="danger"
                onClick={() => onUserSelectOption(3)}
              >
                <FaRegHandPaper size={15} />
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col xs="20" md="4" sm="6">
          <div>TIES</div>
          <span>{ties}</span>
          <h1 className="h-60 pt-5 align-middle">Vs</h1>
          {gameResults !== "" && (
            <span
              className={cx(
                "font-weight-bold display-4",
                { "text-success": gameResults === gameOptions.Win },
                { "text-danger": gameResults === gameOptions.Lose },
                { "text-warning": gameResults === gameOptions.Tie }
              )}
            >
              {gameResults}
            </span>
          )}
        </Col>
        <Col xs="20" md="4" sm="6">
          <div>WIN</div>
          <span>{machineWins}</span>
          <Card className="d-flex align-items-center">
            {machineIconSelected === "BsQuestion" && <BsQuestion size={200} />}
            {machineIconSelected === "FaRegHandRock" && (
              <FaRegHandRock size={200} />
            )}
            {machineIconSelected === "FaRegHandScissors" && (
              <FaRegHandScissors size={200} />
            )}
            {machineIconSelected === "FaRegHandPaper" && (
              <FaRegHandPaper size={200} />
            )}
            <CardBody>
              <CardText className="text-primary">
                You can't beat me ...
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
