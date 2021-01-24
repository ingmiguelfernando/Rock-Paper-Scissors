import React, { Component } from "react";
import {
  FaRegHandRock,
  FaRegHandScissors,
  FaRegHandPaper,
} from "react-icons/fa";

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Hello!</h1>
        <p>
          Welcome to the &nbsp; <FaRegHandRock size={20} />
          &nbsp;
          <FaRegHandScissors size={20} />
          &nbsp;
          <FaRegHandPaper size={20} />
          &nbsp; game, built with:
        </p>
        <ul>
          <li>
            <a href="https://get.asp.net/">ASP.NET Core</a> and{" "}
            <a href="https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx">
              C#
            </a>{" "}
            for cross-platform server-side code
          </li>
          <li>
            <a href="https://facebook.github.io/react/">React</a> for
            client-side code
          </li>
        </ul>
        <p>
          You can find the source code of this project{" "}
          <a href="https://github.com/ingmiguelfernando/Rock-Paper-Scissors">
            here
          </a>
        </p>
        <h2>Created by:</h2>
        <h3>Miguel Fernando Patiño</h3>
        <h6>ing.miguel.fernando@gmail.com</h6>
      </div>
    );
  }
}
