import React from 'react';
import { Card, Grid, Form } from 'semantic-ui-react';
import './Home.css';
import TasksApi from '../api/TasksApi';
import KiddosApi from '../api/KiddosApi';

class Home extends React.Component {

  state = {
    kids: [],
    tasks: [],
    newTask: '',
    selectedKid: ''
  }

  componentDidMount() {
    // fire these methods when render the page the first time
    this.getKiddosFromApi()
    this.getTasksFromApi()
  }

  getTasksFromApi() {
    TasksApi.tasksIndex()
    .then(res => 
      this.setState({
      // set this.state.tasks equal to res.data to have the whole object in the state
        tasks: res.data
      }))
  }

  getKiddosFromApi() {
    KiddosApi.kiddosIndex()
    .then(res => 
      this.setState({
        kids: res.data
      }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    TasksApi.tasksCreate({
      description: this.state.newTask,
      kiddo: this.state.selectedKid
    })
    .then(res => {
                    this.setState({
                      tasks: this.state.tasks.concat(res.data),
                      newTask: '',
                      selectedKid: ''
                    })
                }
    )
  }

  // handleChangeDescription = (e, { value }) => {
  //   this.setState({
  //     newTask: value,
  //   })
  // }

  // handleChangeKiddo = (e, { value }) => {
  //   this.setState({
  //     selectedKid: value,
  //   })
  // }

  // fonction qui retourne une fonction
  handleChange = (key) =>

    (e, { value }) => {

      // create new state object
      let newState = {};
      newState[key] = value;


      // set it to the state
      this.setState(newState)
    }


  render() {
    console.log(this.state)

    // generate JSX for the tasks list
    let tasksList = [];
    for (let task of this.state.tasks) {
      tasksList.push(<Card fluid header={task.description}/>)  
    }

    // generate JSX for the kiddos list
    let kiddosList = [];
    for (let kid of this.state.kids) {
      kiddosList.push(
        <Card
          href='#card-example-link-card'
          header={kid.name}
        />
      )}
    
    const dropdownOptions = [];
    for (let kid of this.state.kids) {
      dropdownOptions.push({
        key: kid._id,
        text: kid.name,
        value: kid._id
      })
    }
    // console.log(this.state.kids)

    return(
      <Grid className="homeContainer">
        <Grid.Row>
          <Grid.Column className="kidsList six wide" width={4}>
            <h3>My kiddos</h3>
            {kiddosList}
          </Grid.Column>
          <Grid.Column className="tasksContainer ten wide" width={10}>
            <h3>You have {this.state.tasks.length} tasks to complete today</h3>
            <Form onSubmit={this.handleSubmit}> 
              <Form.Group>
                <Form.Input
                  label='Description'
                  placeholder='Describe the task'
                  name='task'
                  value={this.state.newTask}
                  onChange={this.handleChange('newTask')} // search how is made handleChange usually
                />
                <Form.Select
                  label='Kiddo'
                  selection
                  options={dropdownOptions}
                  placeholder='Select a Kid'
                  value={this.state.selectedKid}
                  onChange={this.handleChange('selectedKid')}
                />
                <Form.Button content='Add' />
              </Form.Group>
            </Form>
            <Card.Group>
              {tasksList}
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Home;