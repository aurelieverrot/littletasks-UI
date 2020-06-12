import React from 'react';
import { Card, Grid, Form, Button } from 'semantic-ui-react';


const TasksList = (props) => {

  const DEFAULT_KID_SELECTED_VALUE = "something";


  // generate JSX for the tasks list
  let tasksList = [];
         
  for (let task of props.homeState.tasks) {
    const thatKidIsCurrentlySelected = props.homeState.selectedKidMenu === task.kiddo;
    const gottaDisplayEverybody = props.homeState.selectedKidMenu === DEFAULT_KID_SELECTED_VALUE;
    const taskNotDone = task.status === false;
    // 
    if (taskNotDone && (gottaDisplayEverybody || thatKidIsCurrentlySelected)) {
      tasksList.push(
        <Card className="taskBlock" key={task._id}>
          <Card.Content>
            <Card.Header>{task.description}</Card.Header>
            <Card.Meta>by {props.homeState.kids[task.kiddo] ? props.homeState.kids[task.kiddo].name : 'dunno'}</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green' onClick={props.handleDoneTask(task._id)}>
                Done!
              </Button>
              <Button basic color='red' onClick={props.handleDelete(task._id)}>
                Delete
              </Button>
            </div>
          </Card.Content>
        </Card>
        )  
      }
  }



  return(
    
      <Grid.Column className="tasksContainer ten wide" width={10}>
        <h3>{props.homeState.tasks.length} task(s) to complete today</h3>
        <Form onSubmit={props.handleSubmit} className="taskForm"> 
          <Form.Group >
            <Form.Input className="six wide"
              label='Description'
              placeholder='Describe the task'
              name='task'
              value={props.homeState.newTask}
              onChange={props.handleChange('newTask')} // search how is made handleChange usually
            />
            <Form.Select className="six wide"
              label='Kiddo'
              selection
              options={props.dropdownOptions}
              placeholder='Select a Kid'
              value={props.homeState.selectedKidDropdown}
              onChange={props.handleChange('selectedKidDropdown')}
              icon='i dropdown'
            />
            <Form.Button content='Add'  className="four wide " />
          </Form.Group>
        </Form>
        <Card.Group>
          {tasksList}
        </Card.Group>
      </Grid.Column>
    
  )
}

export default TasksList