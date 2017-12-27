import React, { Component } from 'react';
import Timeline from 'react-calendar-timeline/lib';
import moment from 'moment';

class Calendar extends Component {
  state = {
    groups : [
      { id: 1, title: 'Group 01' },
      { id: 2, title: 'Group 02' },
      { id: 3, title: 'Group 03' }
    ],
    items : [
      {id: 1, group: 1, title: 'item 1', start_time: moment(), end_time: moment().add(1, 'hour'), canChangeGroup: false, sizeTime: 1},
      {id: 2, group: 2, title: 'item 2', start_time: moment().add(-0.5, 'hour'), end_time: moment().add(0.5, 'hour'), canChangeGroup: false, sizeTime: 1},
      {id: 3, group: 1, title: 'item 3', start_time: moment().add(2, 'hour'), end_time: moment().add(4, 'hour'), canChangeGroup: false, sizeTime: 2},
      {id: 4, group: 3, title: 'item 4', start_time: moment().add(2, 'hour'), end_time: moment().add(3, 'hour'), canChangeGroup: false, sizeTime: 1}
    ]
  };

  itemMoveHandler = (itemId, dragTime) => {
    const savedItems = [
      ...this.state.items
  ];

    const changedItem = savedItems.findIndex((i) => i.id === itemId);
    savedItems[changedItem].start_time = dragTime;
    savedItems[changedItem].end_time = moment(dragTime).add(savedItems[changedItem].sizeTime, 'hour');
    
    this.setState({ items: savedItems });
  }

  render() {
    return (
      <Timeline 
        groups={this.state.groups}
        items={this.state.items}
        defaultTimeStart={moment().add(-12, 'hour')}
        defaultTimeEnd={moment().add(12, 'hour')}
        onItemMove={this.itemMoveHandler}
      />
    );
  }
}

export default Calendar;
