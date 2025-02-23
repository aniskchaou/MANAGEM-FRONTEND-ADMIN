import PropTypes from 'prop-types';
import './task-kanban.css';
import React, { Component } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import _ from 'lodash';
import { DraggableCard } from '../../../main/shared/kanban/Board/Board';
import { NavLink } from 'react-router-dom';
import projectHTTPService from '../../../main/services/projectHTTPService';
import taskHHTPService from '../../../main/services/taskHHTPService';

let _columnId = 0;
let _cardId = 0;

class TaskKanban extends Component {
  state = {
    cards: [],
    columns: []
  };

  componentDidMount() {
    taskHHTPService.getAllTask()
      .then(response => {
        const taskList = response.data.map(item => ({
          id: item.id,
          title: item.title,
          status: item.status
        }));

        const initColumns = ['ToDo', 'In Progress', 'In Review', 'Completed'].map(title => ({
          id: ++_columnId,
          title,
          cardIds: taskList.filter(task => task.status === title).map(task => task.id)
        }));

        this.setState({
          cards: taskList,
          columns: initColumns
        });
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
      });
  }

  addColumn = (title) => {
    title = title.trim();
    if (!title) return;

    this.setState(state => ({
      columns: [...state.columns, { id: ++_columnId, title, cardIds: [] }]
    }));
  };

  addCard = (columnId, title) => {
    title = title.trim();
    if (!title) return;

    const newCard = { id: ++_cardId, title };
    this.setState(state => ({
      cards: [...state.cards, newCard],
      columns: state.columns.map(column =>
        column.id === columnId ? { ...column, cardIds: [...column.cardIds, newCard.id] } : column
      )
    }));
  };

  moveCard = (cardId, destColumnId, index) => {
    this.setState(state => ({
      columns: state.columns.map(column => ({
        ...column,
        cardIds: _.flowRight(
          ids => (column.id === destColumnId ? [...ids.slice(0, index), cardId, ...ids.slice(index)] : ids),
          ids => ids.filter(id => id !== cardId)
        )(column.cardIds)
      }))
    }));
  };

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <div className="card">
          <div className="card-header">
            <h4><i className="menu-icon fa fa-list"></i> Tasks</h4>
          </div>
          <div className="card-body">
            <div className="btn-group">
              <button type="button" className="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown">
                <i className="menu-icon fa fa-male"></i> Switch to
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">Kanban</a>
                <a className="dropdown-item" href="#">Calendar</a>
                <a className="dropdown-item" href="#">Gantt</a>
              </div>
            </div>

            <DraggableCard
              cards={this.state.cards}
              columns={this.state.columns}
              moveCard={this.moveCard}
              addCard={this.addCard}
              addColumn={this.addColumn}
            />
          </div>
        </div>
      </DndProvider>
    );
  }
}

export default TaskKanban;

