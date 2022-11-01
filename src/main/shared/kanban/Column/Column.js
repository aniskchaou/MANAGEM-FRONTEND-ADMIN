import React from 'react';
import { TextForm } from '../TextForm/TextForm';
import './Column.css'
export function Column(props) {
  const setColorCss = (title) => {
    var color = ""
    switch (title) {

      case "Todo":
        color = "todo"
        break;
      case "In Progress":
        color = "inprogress"
        break;
      case "In Review":
        color = "inreview"
        break;
      case "Completed":
        color = "completed"
        break;

      case "Done":
        color = "done"
        break;

      case "Blocked":
        color = "blocked"
        break;
      default:
        color = "default";
    }

    return color
  }
  return (
    <div className="Column">
      <div className={setColorCss(props.title)}>{props.title}</div>
      {props.children}
    </div>
  );
}
