import React, { Component, useRef } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import { Board } from '../../../main/shared/kanban/Board/Board';
import { NavLink } from 'react-router-dom';
import projectHTTPService from '../../../main/services/projectHTTPService';

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

class ProjectKanban extends Component {

  state = {
    cards: initialCards,
    columns: initialColumns,

  };

  componentWillMount() {
    let projectList = []
    projectHTTPService.getAllProject()
      .then(response => {

        for (const item of response.data) {
          let projectObject = {
            id: item.title,
            title: item.title,
            status: item.status
          }
          projectList.push(projectObject)
        }


        console.log(projectList)
        /*   this.setState({
            cards: projectList,
            columns: initialColumns
  
          }) */

        const initcolumn = ['Todo', 'In Progress', 'Done', 'Blocked'].map((title, i) => ({
          id: _columnId++,
          title,
          cardIds: projectList.filter(s => s.status == title).map(card => {

            return card.id
          }),
        }));
        this.setState({
          cards: projectList,
          columns: initcolumn,

        })
        console.log(this.state.columns)
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
          <h4><i class="menu-icon fa fa-folder"></i> Projects</h4>
        </div>
        <div className="card-body">

          <div class="btn-group">
            <button type="button" class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="menu-icon fa fa-male"></i>  Switch to
            </button>
            <div class="dropdown-menu">
              <NavLink class="dropdown-item" to="/projects">List view</NavLink>
              <NavLink class="dropdown-item" to="/project-kanban">Kanban view</NavLink>
              <NavLink class="dropdown-item" to="/calendar">Calendar view</NavLink>
              <NavLink class="dropdown-item" to="/timeline" >Gantt view</NavLink>
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
}

export default DragDropContext(HTML5Backend)(ProjectKanban);
