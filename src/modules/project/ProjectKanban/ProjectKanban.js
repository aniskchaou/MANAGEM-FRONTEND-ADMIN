import React, { Component } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import _ from 'lodash';
import DraggableCard from '../../../main/shared/kanban/Board/Board'; // ❗ FIXED: No `Board` export
import { NavLink } from 'react-router-dom';
import projectHTTPService from '../../../main/services/projectHTTPService';

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

  componentDidMount() {
    projectHTTPService.getAllProject()
      .then(response => {
        const projectList = response.data.map(item => ({
          id: item.id,
          title: item.title,
          status: item.status
        }));

        const initColumns = ['Todo', 'In Progress', 'Done', 'Blocked'].map(title => ({
          id: ++_columnId,
          title,
          cardIds: projectList.filter(p => p.status === title).map(p => p.id)
        }));

        this.setState({
          cards: projectList,
          columns: initColumns
        });

      }).catch(error => {
        console.error("Error fetching projects:", error);
      });
  }

  addColumn = title => {
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
            <h4><i className="menu-icon fa fa-folder"></i> Projects</h4>
          </div>
          <div className="card-body">
            <div className="btn-group">
              <button type="button" className="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown">
                <i className="menu-icon fa fa-male"></i> Switch to
              </button>
              <div className="dropdown-menu">
                <NavLink className="dropdown-item" to="/projects">List view</NavLink>
                <NavLink className="dropdown-item" to="/project-kanban">Kanban view</NavLink>
                <NavLink className="dropdown-item" to="/calendar">Calendar view</NavLink>
                <NavLink className="dropdown-item" to="/timeline">Gantt view</NavLink>
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

export default ProjectKanban;
