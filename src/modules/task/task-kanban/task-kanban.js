
import PropTypes from 'prop-types';
import './task-kanban.css';
import React, { Component, useEffect, useRef, useState } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import { Board } from '../../../main/shared/kanban/Board/Board';
import { NavLink } from 'react-router-dom';
import projectHTTPService from '../../../main/services/projectHTTPService';
import FullCalendar from '@fullcalendar/react';
import taskHHTPService from '../../../main/services/taskHHTPService';
let _columnId = 0;
let _cardId = 0;

const initialCards = Array.from({ length: 9 }).map(() => ({
  id: ++_cardId,
  title: `Card ${_cardId}`,
}));

const initcard = Array.from({ length: 9 }).map(() => ({
  id: ++_cardId,
  title: `jygkuy ${_cardId}`,
}));


const initialColumns = ['TODO', 'Doing', 'Done'].map((title, i) => ({
  id: _columnId++,
  title,
  cardIds: initialCards.slice(i * 3, i * 3 + 3).map(card => card.id),
}));

class TaskKanban extends Component {
  state = {
    cards: initialCards,
    columns: initialColumns,

  };
  inprogress = []
  done = []
  blocked = []
  todo = []
  componentWillMount() {

    //console.log(projectList.slice(i * 3, i * 3 + 3).map(card => card.id))
    let taskList = []
    taskHHTPService.getAllTask()
      .then(response => {

        for (const item of response.data) {
          let projectObject = {
            id: item.title,
            title: item.title,
            status: item.status
          }
          taskList.push(projectObject)
        }


        console.log(taskList)
        /*   this.setState({
            cards: projectList,
            columns: initialColumns
   
          }) */

        taskList.filter(s => s.filter == "ToDo").map(card => {
          console.log(card.id)
          return card.id
        })

        const initcolumn = ['Todo', 'In Progress', 'In Review', 'Completed'].map((title, i) => ({
          id: _columnId++,
          title,
          cardIds: taskList.filter(s => s.status == title).map(card => {

            return card.id
          })
        }));
        this.setState({
          cards: taskList,
          columns: initcolumn,

        })
        console.log("jjjj")
        console.log(taskList)
      }).catch(e => {
        console.log(e);
      });
  }

  constructor() {
    super()
    this.setState({
      cards: initialCards,
      columns: initialColumns,

    })

    taskHHTPService.getAllTask().then(data => {
      if (data.data.status == "ToDo") {
        this.todo.push(data.data.id)
      }
      if (data.data.status == "Blocked") {
        this.blocked.push(data.data.id)
      }
      if (data.data.status == "In progress") {
        this.blocked.push(data.data.id)
      }

      if (data.data.status == "Done") {
        this.done.push(data.data.id)
      }
    })






  }



  addColumn = _title => {
    const title = _title.trim();
    if (!title) return;

    const newColumn = {
      id: ++_columnId,
      title,
      cardIds: [],
    };
    this.setState(state => ({
      columns: [...state.columns, newColumn],
    }));
  };

  addCard = (columnId, _title) => {
    const title = _title.trim();
    if (!title) return;

    const newCard = { id: ++_cardId, title };
    this.setState(state => ({
      cards: [...state.cards, newCard],
      columns: state.columns.map(
        column =>
          column.id === columnId
            ? { ...column, cardIds: [...column.cardIds, newCard.id] }
            : column
      ),
    }));
  };

  moveCard = (cardId, destColumnId, index) => {
    this.setState(state => ({
      columns: state.columns.map(column => ({
        ...column,
        cardIds: _.flowRight(
          // 2) If this is the destination column, insert the cardId.
          ids =>
            column.id === destColumnId
              ? [...ids.slice(0, index), cardId, ...ids.slice(index)]
              : ids,
          // 1) Remove the cardId for all columns
          ids => ids.filter(id => id !== cardId)
        )(column.cardIds),
      })),
    }));
  };

  render() {
    return (
      <div className="card">

        <div className="card-header">
          <h4><i class="menu-icon fa fa-list"></i> Tasks</h4>
        </div>
        <div className="card-body">

          <div class="btn-group">
            <button type="button" class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="menu-icon fa fa-male"></i>  Switch to
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#">Kanban</a>
              <a class="dropdown-item" href="#">Calendar</a>
              <a class="dropdown-item" href="#">Gantt</a>
            </div>
          </div>

          <Board
            cards={this.state.cards}
            columns={this.state.columns}
            moveCard={this.moveCard}
            addCard={this.addCard}
            addColumn={this.addColumn}
          />

        </div>
      </div>
    );
  }
};

export default DragDropContext(HTML5Backend)(TaskKanban);
