import React from 'react';
import { Card, Grid, Form } from 'semantic-ui-react';
import './Home.css';
import TasksApi from '../api/TasksApi';
import KiddosApi from '../api/KiddosApi';

class Home extends React.Component {

  state = {
    kids: [],
    tasks: [],
    newTask: ''
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
      // set this.state.tasks = to res.data
        tasks: res.data
      }))
  }

  getKiddosFromApi() {
    //To Do: Get kids from API, put Kid data in state, generate JSX
    KiddosApi.kiddosIndex()
    .then(res => 
      this.setState({
        kids: res.data
      }))
      console.log(this.state)
    // let hardCodedKiddos = ['kid1', 'kid2'];
    // let list = [];
    // for (let kid of hardCodedKiddos) {
    //   list.push(
    //     <Card
    //       href='#card-example-link-card'
    //       header={kid}
    //     />
    //   )}
    // this.setState({
    //   kids: list
    // })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    TasksApi.tasksCreate({
      description: this.state.newTask
    })
    .then(res => this.setState({
      tasks: this.state.tasks.concat(res.data)
    }))
  }

  handleChange = (e) => {
    this.setState({
      newTask: e.target.value
    })
  }

  render() {
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
        key: kid.name,
        text: kid.name,
        value: kid.name
      })
    }

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
                //  value={onInput}
                  onChange={this.handleChange} // search how is made handleChange usually
                />
                <Form.Select
                  
                  label='Kiddo'
                  selection
                  options={dropdownOptions}
                  placeholder='Select a Kid'
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