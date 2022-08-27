import React, { Component, useRef } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import { Board } from '../Board/Board';
import { NavLink } from 'react-router-dom';

let _columnId = 0;
let _cardId = 0;

const initialCards = Array.from({ length: 9 }).map(() => ({
  id: ++_cardId,
  title: `Card ${_cardId}`,
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
          <strong className="card-title">Kanban</strong>
        </div>
        <div className="card-body">
          <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#addProject"><i class="far fa-plus-square"></i>  Ajouter</button>
          <button type="button" className="btn btn-info btn-sm" data-toggle="modal" data-target="#bulkProject"><i class="fa fa-trash"></i>  Bulk Action</button>
          <NavLink type="button" className="btn btn-secondary btn-sm" to="/modules-configuration"><i class="fa fa-info-circle"></i>  Help</NavLink>
          <NavLink type="button" className="btn btn-success btn-sm" to="/modules-configuration"><i className="menu-icon fa fa-cog"></i>  Settings </NavLink>
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
}

export default DragDropContext(HTML5Backend)(ProjectKanban);
