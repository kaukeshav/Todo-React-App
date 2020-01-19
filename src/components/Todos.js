import React, { Component } from 'react';
import TodoItem from './TodoItem';

class Todos extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        {this.props.todoList.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.uniqueId}
            todoAction={this.props.handleTodo}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default Todos;
