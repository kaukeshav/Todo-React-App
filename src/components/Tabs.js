import React, { Component } from 'react';

class Tabs extends Component {
  state = {
    activeTab: ''
  };

  getStyleClass = type => {
    const clickedTab = this.props.activeTab || '';
    if (clickedTab === type) {
      return 'active';
    }
    return '';
  };

  render() {
    return (
      <div className="tabs-wrapper">
        <h4>Group By:</h4>
        <div className="tabs">
          <button
            className={'tab btn ' + this.getStyleClass('all')}
            onClick={this.props.onTabClick.bind(this, {
              type: 'all'
            })}
          >
            All Tasks
          </button>
          <button
            className={'tab btn ' + this.getStyleClass('completed')}
            onClick={this.props.onTabClick.bind(this, {
              type: 'completed'
            })}
          >
            Completed
          </button>
          <button
            className={'tab btn ' + this.getStyleClass('pending')}
            onClick={this.props.onTabClick.bind(this, {
              type: 'pending'
            })}
          >
            Pending
          </button>
        </div>
      </div>
    );
  }
}

export default Tabs;
