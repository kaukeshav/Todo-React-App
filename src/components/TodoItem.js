import React, { Component } from 'react';

class TodoItem extends Component {
  state = {};

  getCompletedStyles = () => {
    return this.props.todo.currentState ? 'completed' : '';
  };

  getDateString = date => {
    return `${new Date(parseInt(date)).toDateString()}${new Date(
      parseInt(date)
    ).toLocaleTimeString()}`;
  };

  render() {
    const {
      title,
      priority,
      createdAt,
      dueDate,
      uniqueId,
      currentState
    } = this.props.todo;
    return (
      <div className={'todo-item ' + this.getCompletedStyles()}>
        <div className="todo-section">
          <h3 className="todo-label">Summary</h3>
          <div className="todo-title main-title">{title}</div>
        </div>
        <div className="todo-section">
          <h3 className="todo-label">Priority</h3>
          <div className="todo-title">{priority}</div>
        </div>
        <div className="todo-section">
          <h3 className="todo-label">Created On</h3>
          <div className="todo-title">{this.getDateString(createdAt)}</div>
        </div>
        <div className="todo-section">
          <h3 className="todo-label">Due Date</h3>
          <div className="todo-title">{dueDate}</div>
        </div>
        <div className="todo-section">
          <h3 className="todo-label">Actions</h3>
          <div className="todo-title">
            <button
              className="btn btn-rounded edit-btn"
              onClick={this.props.todoAction.bind(this, {
                type: 'edit',
                uniqueId
              })}
            >
              &#9998;
            </button>
            <button
              className="btn btn-rounded delete-btn"
              onClick={this.props.todoAction.bind(this, {
                type: 'delete',
                uniqueId
              })}
            >
              &#9986;
            </button>
            <button
              className="btn btn-rounded open-close-btn"
              onClick={this.props.todoAction.bind(this, {
                type: 'complete',
                uniqueId
              })}
            >
              &#10003;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoItem;
