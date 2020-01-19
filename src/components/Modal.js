import React, { Component } from 'react';

class Modal extends Component {
  state = {
    title: '',
    description: '',
    priority: '',
    dueDate: '',
    currentState: false,
    createdAt: null,
    uniqueId: ''
  };

  getStyles = () => {
    return {
      display: this.props.show ? 'block' : 'none'
    };
  };

  generateUid = () => {
    return (
      Math.random()
        .toString(36)
        .substr(2, 9) +
      '-' +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  };

  handleChange = e => {
    if (e.target && e.target.name) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  closeTodo(e) {
    if (e && e.target) {
      this.setState({
        title: '',
        description: '',
        priority: '',
        dueDate: '',
        currentState: false,
        createdAt: null,
        uniqueId: ''
      });
      this.props.closeTodo();
    }
  }

  saveTodo(e) {
    if (e && e.target) {
      const confrimCheck = window.confirm(
        'Are you sure you want to create this todo'
      );
      if (confrimCheck) {
        const timeStamp = `${new Date().toDateString()}${new Date().toLocaleTimeString()}`;
        const uniqueId = this.setState({
          createdAt: timeStamp,
          uniqueId: this.generateUid()
        });
        window.requestAnimationFrame(() => {
          this.props.createNewTodo(this.state);
          this.setState({
            title: '',
            description: '',
            priority: '',
            dueDate: '',
            currentState: false,
            createdAt: null,
            uniqueId: ''
          });
        });
      }
    }
  }

  render() {
    const editTodo = this.props.editTodo.length ? this.props.editTodo[0] : null;
    return (
      <div id="myModal" className="modal" style={this.getStyles()}>
        <div className="modal-content">
          <div className="modal-header">
            <span className="close" onClick={this.closeTodo.bind(this)}>
              &times;
            </span>
            <h2>Add Todo</h2>
          </div>
          <div className="modal-body">
            <form>
              <div>
                <label>Todo Title:</label>
                <input
                  type="text"
                  name="title"
                  value={
                    editTodo && editTodo.title
                      ? editTodo.title
                      : this.state.title
                  }
                  minLength="10"
                  maxLength="100"
                  placeholder="Enter title here..."
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>Todo Desciption:</label>
                <textarea
                  value={
                    editTodo && editTodo.description
                      ? editTodo.description
                      : this.state.description
                  }
                  rows="20"
                  cols="30"
                  name="description"
                  onChange={this.handleChange}
                ></textarea>
              </div>
              <div>
                <span>Select Priority:</span> &nbsp;&nbsp;&nbsp;
                <select
                  name="priority"
                  id="priority"
                  onChange={this.handleChange}
                  value={
                    editTodo && editTodo.priority
                      ? editTodo.priority
                      : this.state.priority
                  }
                >
                  <option value="0" defaultValue>
                    None
                  </option>
                  <option value="1">Low</option>
                  <option value="2">Medium</option>
                  <option value="3">High</option>
                </select>
              </div>
              <div className="date">
                <span>Select Date:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="date"
                  id="start"
                  name="dueDate"
                  onChange={this.handleChange}
                  value={
                    editTodo && editTodo.dueDate
                      ? editTodo.dueDate
                      : this.state.dueDate
                  }
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <div className="flex-row">
              <button
                className="btn save-btn"
                onClick={this.saveTodo.bind(this)}
              >
                Save
              </button>
              <button
                className="btn cancel-btn"
                onClick={this.closeTodo.bind(this)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
