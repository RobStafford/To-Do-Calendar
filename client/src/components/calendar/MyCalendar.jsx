import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { makeStyles, Container, Button } from '@material-ui/core';
import moment from 'moment';
import './CalendarStyle.scss';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

const DragAndDropCalendar = withDragAndDrop(Calendar)
const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  // console.log('eventList', eventList)
  const formatForCalendar = (list) => {
    if (list.length) {
      return list.flat().map(item => {
        console.log('item layer 1: ', item);
        return item.items;
      }).flat().map(item => {
        if (item !== undefined && item.length) {
          const taskCopy = item;
          taskCopy.start =  new Date(item.start);
          taskCopy.end_date = new Date(item.end_date);
          return taskCopy;
        } else {
          return;
        }
      })
    } else {
      return []
    }
  }

  return (
    <DragAndDropCalendar
      className='calendar'
      localizer={localizer}
      defaultView="week"
      events={formatForCalendar(props.myEvents).filter(item => item !== undefined ? item.in_calendar : false)}
      startAccessor="start"
      endAccessor="end_date"
      onSelectEvent={(event) => {
        props.changeTitle(event);
      }}
      min={new Date(moment().hour(6).minute(0))}
      max={new Date(moment().hour(23).minute(0))}
      onEventDrop={props.moveEvent}
      onEventResize={props.resizeEvent}
      onDropFromOutside={props.onDropFromOutside}
      style={{ height: 1000 }}
    />
  )
}

export default MyCalendar;