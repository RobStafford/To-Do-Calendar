import React, { useState, useEffect, useCallback } from 'react';
import { useDrag } from 'react-dnd';
import moment from 'moment';
import ContentEditable from 'react-contenteditable';
import { Button, Box, Grid, Card, CardHeader, CardContent, CardActions, Collapse, makeStyles, Typography, Toolbar, TextField,  TextareaAutosize, Stack } from '@material-ui/core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TaskOptionsModal from '../TaskOptionsModal.jsx';

//on hover over editable field -- pen icon or underline
const useStyles = makeStyles({
  grid: {
    display: 'inline-block',
    alignItems: 'center'
  },
  header: {
    fontSize: 12
  },
  textArea: {
    padding: '1rem',
    width: '90%',
    color: 'black'
  },
  card: {
    display: 'flex',
    border: '1rem solid black'
  }
  })

function Task({task, isMobile, deleteTask, draggedEvent, setDraggedEvent, handleDragStart, clickedTask, updateTodo, deleteTodo}) {
  // console.log('task in task', task)

  // For Modal opening and closing
  const [todo, setTodo] = useState(task);
  const [modalOpen, setModalOpen] = useState(false);
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();

  // const [modalInfo, setModalInfo] = useState();

  const convertDuration = (duration) => {
    const splitDuration = duration.split(':')
    const hours = splitDuration[0]
    const minutes = splitDuration[1]
    setHours(hours)
    setMinutes(minutes)
  }

  const updateTask = (task) => {
    console.log('update task', task)
    setTodo(task)
  }

  const classes = useStyles();

  useEffect(() => {
    convertDuration(todo.duration)
  }, [])

  useCallback(() => {
    convertDuration(todo.duration)
  }, [todo])

  return (
    <Grid item xs={12} lg={12}>
      <Grid item xs={12}>
        <Card onDragStart={() => handleDragStart(task)} draggable='true'>
          {modalOpen === true && <TaskOptionsModal setModalOpen={setModalOpen} modalOpen={modalOpen} task={task} updateTodo={updateTodo} deleteTodo={deleteTodo} updateTask={updateTask}/>}
          <CardContent>
            <div style={{display: 'flex', flexDirection: 'row', gap: '5%'}}>
              <Typography>
                {todo.title}
              </Typography>
              <div>Duration:</div>
              <Box>{hours} {hours === '01' ? 'hour' : 'hours'}</Box>
              <Box>{minutes} {minutes === '01' ? 'minute' : 'minutes'}</Box>
              {isMobile && addToCal}
            </div>
            <Typography>
                {todo.description}
              </Typography>
            <CardActions>
              <Button variant="contained" size="small" onClick={() => setModalOpen(true)}>Edit</Button>
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Task;
