import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Login from './authentication/Login.jsx';
import Registration from './authentication/Registration.jsx';
import MyCalendar from './calendar/MyCalendar.jsx';
import ToDoList from './to-do-list/ToDoList.jsx';
import TopBar from './TopBar.jsx';
import TestToDo from './calendar/TestToDo.jsx';

function Home (
  {isMobile={isMobile},
  onCalendar={onCalendar},
  setOnCalendar={setOnCalendar},
  addToCalendar={addToCalendar},
  myEvents={myEvents},
  moveEvent={moveEvent},
  resizeEvent={resizeEvent},
  changeTitle={changeTitle},
  handleDragStart={handleDragStart},
  draggedEvent={draggedEvent},
  setDraggedEvent={setDraggedEvent},
  onDropFromOutside={onDropFromOutside}}){

  const naviBar = (<TopBar isMobile={isMobile} onCalendar={onCalendar} setOnCalendar={setOnCalendar}/>)
  const toDoList = (<ToDoList addToCalendar={addToCalendar}/>)
  const myCalender = (<MyCalendar myEvents={myEvents} moveEvent={moveEvent} resizeEvent={resizeEvent} changeTitle={changeTitle} onDropFromOutside={onDropFromOutside}/>)
  const testToDo = (<TestToDo draggedEvent={draggedEvent} setDraggedEvent={setDraggedEvent} handleDragStart={handleDragStart}/>)
  // condition redering base on device
  const renderContent = () => {
    // view for mobile and in to do list page
    if (isMobile && !onCalendar) {
      return (
        <div>
          {naviBar}
          <div className="">
            {toDoList}
          </div>
        </div>
      )
    } else if (isMobile && onCalendar) {
      // // view for mobile and in calendar page
      return (
        <div>
          {naviBar}
          <div>
            {myCalender}
          </div>
        </div>
      )
    } else {
      return (
        // view for desktop display both calendar and to do list
        <div>
          {naviBar}
          {myCalender}
          {testToDo}
          {/* {toDoList} */}
        </div>
      )
    }
 }
  return (
    <div>
      {renderContent()}
    </div>
  )
}

export default Home;