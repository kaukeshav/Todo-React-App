import React, { Component } from 'react';
import './App.css';
import Modal from './components/Modal';
import AddButton from './components/AddButton';
import Todos from './components/Todos';
import Tabs from './components/Tabs';

const sortByConfig = {
  SUMMARY: 'summary',
  PRIORITY: 'priority',
  CREATED_ON: 'createdon',
  DUE_DATE: 'duedate',
  DEFAULT_ORDER: 'ASC'
};

export default class App extends Component {
  state = {
    isModalActive: false,
    todos: [],
    tempTodoList: [],
    activeTab: '',
    searchTerm: '',
    editTodo: [],
    tableHeadings: [
      {
        id: 1,
        name: 'Summary'
      },
      {
        id: 2,
        name: 'Priority'
      },
      {
        id: 3,
        name: 'Created On'
      },
      {
        id: 4,
        name: 'Due Date'
      }
    ]
  };

  sortTodos(sortBy) {
    if (sortBy.name && sortBy.orderBy) {
      const sortByName = sortBy.name.toLowerCase().replace(/ /g);
      const order = sortBy.orderBy;
      this.setState({
        todos: [
          ...this.state.todos.sort((todoOne, todoTwo) => {
            switch (sortByName) {
              case sortByConfig.SUMMARY:
                if (todoOne.title.toUpperCase() < todoTwo.title.toUpperCase()) {
                  return order === sortByConfig.DEFAULT_ORDER ? -1 : 1;
                }
                if (todoOne.title.toUpperCase() > todoTwo.title.toUpperCase()) {
                  return order === sortByConfig.DEFAULT_ORDER ? 1 : -1;
                } else {
                  return 0;
                }
                break;
              case sortByConfig.PRIORITY:
                if (order === sortByConfig.DEFAULT_ORDER) {
                  return (
                    parseInt(todoOne.priority) - parseInt(todoTwo.priority)
                  );
                } else {
                  return (
                    parseInt(todoTwo.priority) - parseInt(todoOne.priority)
                  );
                }
                break;
              case sortByConfig.CREATED_ON:
                break;
              case sortByConfig.DUE_DATE:
                break;
              default:
                break;
            }
          })
        ]
      });
    }
  }

  openCloseModal = e => {
    this.setState({
      isModalActive: !this.state.isModalActive
    });
  };

  onTabClick = tabDetail => {
    const { type } = tabDetail;
    const searchTerm = this.state.searchTerm;
    const temp = JSON.parse(JSON.stringify(this.state.tempTodoList));
    switch (type) {
      case 'all':
        this.setState({
          todos: [...temp],
          activeTab: type
        });
        break;
      case 'completed':
        this.setState({
          todos: [
            ...temp.filter(todo => {
              if (!searchTerm) {
                return todo.currentState;
              } else if (
                (searchTerm &&
                  todo.title
                    .toLowerCase()
                    .trim()
                    .match(searchTerm)) ||
                (searchTerm &&
                  todo.description
                    .toLowerCase()
                    .trim()
                    .match(searchTerm))
              ) {
                return todo.currentState;
              } else {
                return false;
              }
            })
          ],
          activeTab: type
        });
        break;
      case 'pending':
        this.setState({
          todos: [
            ...temp.filter(todo => {
              if (!searchTerm) {
                return !todo.currentState;
              } else if (
                (searchTerm &&
                  todo.title
                    .toLowerCase()
                    .trim()
                    .match(searchTerm)) ||
                (searchTerm &&
                  todo.description
                    .toLowerCase()
                    .trim()
                    .match(searchTerm))
              ) {
                return !todo.currentState;
              } else {
                return false;
              }
            })
          ],
          activeTab: type
        });
        break;
      default:
        break;
    }
  };

  searchTodos = e => {
    const searchTerm = e.target.value.toLowerCase();
    const temp = JSON.parse(JSON.stringify(this.state.tempTodoList));
    const type = this.state.activeTab;
    this.setState({
      todos: [
        ...temp.filter(todo => {
          if (
            todo.title
              .toLowerCase()
              .trim()
              .match(searchTerm) ||
            todo.description
              .toLowerCase()
              .trim()
              .match(searchTerm)
          ) {
            if (type === 'completed') {
              return todo.currentState;
            } else if (type === 'pending') {
              return !todo.currentState;
            } else {
              // all tasks
              return true;
            }
          }
          return false;
        })
      ],
      searchTerm: searchTerm
    });
    this.highLightText(e.target.value);
  };

  highLightText = searchTerm => {
    const todoTitle = document.querySelectorAll('.main-title');
    Array.from(todoTitle).forEach(title => {
      const text = title.innerText;
      if (text.match(searchTerm)) {
        const startIndex = text.indexOf(searchTerm);
        const endIndex = text.indexOf(searchTerm) + searchTerm.length;
        if (startIndex !== -1 && endIndex !== -1) {
          title.innerHTML = `${text.substring(
            0,
            startIndex
          )}<mark>${text.substring(
            startIndex,
            endIndex
          )}</mark>${text.substring(endIndex, text.length)}`;
        }
      }
    });
  };

  createTodo = todo => {
    this.setState({
      todos: [...this.state.todos, todo],
      tempTodoList: [...this.state.tempTodoList, todo]
    });
    //close modal after creating
    this.openCloseModal();
  };

  handleTodo = todoDetail => {
    if (todoDetail.type && todoDetail.uniqueId) {
      const { type, uniqueId } = todoDetail;
      const temp = JSON.parse(JSON.stringify(this.state.tempTodoList));
      switch (type) {
        case 'edit':
          this.setState({
            editTodo: temp.filter(todo => todo.uniqueId === uniqueId)
          });
          //open modal
          this.openCloseModal();
          break;
        case 'delete':
          this.setState({
            todos: this.state.todos.filter(todo => todo.uniqueId !== uniqueId),
            tempTodoList: temp.filter(todo => todo.uniqueId !== uniqueId)
          });
          break;
        case 'complete':
          this.setState({
            todos: this.state.todos.map(todo => {
              if (todo.uniqueId === uniqueId) {
                todo.currentState = !todo.currentState;
              }
              return todo;
            }),
            tempTodoList: temp.map(todo => {
              if (todo.uniqueId === uniqueId) {
                todo.currentState = !todo.currentState;
              }
              return todo;
            })
          });
          break;
        default:
          break;
      }
    }
  };

  render() {
    const $self = this;
    return (
      <div className="app">
        <div className="page-loader">
          <div className="loader">Loading...</div>
        </div>

        <header className="app-header">
          <div className="container">
            <h1>My Todo Application</h1>
          </div>
        </header>
        <div className="container">
          <div className="search-box">
            <span>Enter title or description - </span>
            <input
              type="text"
              name="search"
              placeholder="Search..."
              onChange={this.searchTodos}
            />
          </div>
        </div>

        <div className="container">
          <Tabs onTabClick={this.onTabClick} activeTab={this.state.activeTab} />
        </div>

        <div className="container">
          <div className="sorting-head">
            {this.state.tableHeadings.map(heading => (
              <div className="sorting-el" key={heading.id}>
                {heading.name}
                <div>
                  <div
                    onClick={this.sortTodos.bind($self, {
                      name: heading.name,
                      orderBy: 'ASC'
                    })}
                  >
                    &#8593;
                  </div>
                  <div
                    onClick={this.sortTodos.bind($self, {
                      name: heading.name,
                      orderBy: 'DSC'
                    })}
                  >
                    &#8595;
                  </div>
                </div>
              </div>
            ))}
            <div className="sorting-el">
              Actions
              <div>
                <div>&#8593;</div>
                <div>&#8595;</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <Todos todoList={this.state.todos} handleTodo={this.handleTodo} />
        </div>

        <Modal
          show={this.state.isModalActive}
          createNewTodo={this.createTodo}
          closeTodo={this.openCloseModal}
          editTodo={this.state.editTodo}
        />

        <div className="fixed-button">
          <AddButton toggleModal={this.openCloseModal} />
        </div>
      </div>
    );
  }
}
