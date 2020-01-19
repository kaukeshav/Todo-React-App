import React, { Component } from 'react';

class Modal extends Component {
  state = {
    title: '',
    description: '',
    priority: '',
    dueDate: '',
    currentState: false,
    createdAt: null,
    uniqueId: '',
    editTodo: {}
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
        const timeStamp = `${new Date().getTime()}`;
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

  editExistingTodo(e) {
    if (e && e.target) {
      const confrimCheck = window.confirm(
        'Are you sure you update the exisiting todo item ?'
      );
      if (confrimCheck) {
        this.props.saveEditedTodo(e);
      }
    }
  }

  onEditTodo(e) {
    if (e) {
      this.props.handleEditTodo({ name: e.target.name, value: e.target.value });
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
                  onChange={
                    editTodo ? this.onEditTodo.bind(this) : this.handleChange
                  }
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
                  placeholder="Enter description"
                  onChange={
                    editTodo ? this.onEditTodo.bind(this) : this.handleChange
                  }
                ></textarea>
              </div>
              <div className="dropdown-date">
                <div>
                  <span>Select Priority:</span>
                  <select
                    name="priority"
                    id="priority"
                    onChange={
                      editTodo ? this.onEditTodo.bind(this) : this.handleChange
                    }
                    value={
                      editTodo && editTodo.priority
                        ? editTodo.priority
                        : this.state.priority
                    }
                  >
                    <option value="0" defaultValue disabled>
                      None
                    </option>
                    <option value="1">Low</option>
                    <option value="2">Medium</option>
                    <option value="3">High</option>
                  </select>
                </div>
                <div className="date">
                  <span>Select Date:</span>
                  <input
                    type="date"
                    id="start"
                    name="dueDate"
                    onChange={
                      editTodo ? this.onEditTodo.bind(this) : this.handleChange
                    }
                    value={
                      editTodo && editTodo.dueDate
                        ? editTodo.dueDate
                        : this.state.dueDate
                    }
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <div className="flex-row">
              <button
                className="btn save-btn"
                onClick={
                  editTodo
                    ? this.editExistingTodo.bind(this)
                    : this.saveTodo.bind(this)
                }
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
