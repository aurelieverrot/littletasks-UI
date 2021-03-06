import React from 'react';
import TasksList from '../components/TasksList/TasksList'
import { Card, Grid, Form, Button } from 'semantic-ui-react';
import './Home.css';
import TasksApi from '../api/TasksApi';
import KiddosApi from '../api/KiddosApi';

const DEFAULT_KID_SELECTED_VALUE = "something";
class Home extends React.Component {

  state = {
    kids: [],
    tasks: [],
    newTask: '',
    selectedKidDropdown: null,
    selectedKidMenu: DEFAULT_KID_SELECTED_VALUE
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
    .then(res => {
      const listOfKids = res.data;
      let dict = {}
      listOfKids.forEach(function(element) {
        dict[element._id] = element
      })
      this.setState({
        kids: dict
      })})
  }

  selectKiddo = (kiddoId) =>
    (e) => {
      e.preventDefault()
      this.setState({
        selectedKidMenu: kiddoId
      })
    }

  handleSubmit = (e) => {
    e.preventDefault()
    TasksApi.tasksCreate({
      description: this.state.newTask,
      kiddo: this.state.selectedKidDropdown
    })
    .then(res => {
      // after response from API, we update the state with the new task 
      // and set the values of input and dropdown back to '' in the state
        this.setState({
          tasks: this.state.tasks.concat(res.data),
          newTask: '',
          selectedKidDropdown: ''
        })
      }
    )
  }

  handleDelete = (taskId) =>
    (e) => {
      e.preventDefault()
      TasksApi.tasksDelete(taskId)
      .then(res => {
        let remainingTasks = this.state.tasks.filter((task) => task._id !== taskId)
        this.setState({tasks: remainingTasks})
      })
      .catch(error => {
        if (!error.status) {
          console.log("There might be a problem with the connexion")
          return
        }
        // if already deleted, in any case, not in the DB anymore
        if(error.response.status === 404) {
          // drop it if it's nowhere to be found
          let remainingTasks = this.state.tasks.filter((task) => task._id !== taskId)
          this.setState({tasks: remainingTasks})
          alert(error.response.statusText)
        }
      })
    }

  handleDoneTask = (taskId) =>
    (e) => { 
      e.preventDefault()
      this.state.tasks.forEach((task) => {
        if (task._id === taskId) {
          task.status = true
        }
      })
      TasksApi.tasksUpdate(taskId, {status: true})
      .then(res => 
        this.setState({
          tasks: this.state.tasks
        }))
    }

  handleChange = (key) =>
  // the key is given in the JSX
    (e, { value }) => {
      // create new state object
      let newState = {};
      newState[key] = value;
      // set it to the state
      this.setState(newState)
    }

  render() {

    // generate JSX for the kiddos list
    let kiddosList = [];
    const dropdownOptions = [];

    kiddosList.push(
      <Card
        href='#card-example-link-card'
        header="All kiddos"
        key="all"
        onClick={this.selectKiddo(DEFAULT_KID_SELECTED_VALUE)}
      />
    )

    for(let kid of Object.values(this.state.kids)) {
      kiddosList.push(
        <Card 
          key={kid._id}
          onClick={this.selectKiddo(kid._id)}
          className="kiddoCards">
          <Card.Content>
            <Card.Header>{kid.name}</Card.Header>
          </Card.Content>
          <Card.Content extra>
              Points: {kid.totalPoints}
          </Card.Content>
        </Card>
      )
      
      dropdownOptions.push({
        key: kid._id,
        text: kid.name,
        value: kid._id
      })
    }

    return(
      <Grid className="homeContainer">
        <Grid.Row>
          <Grid.Column className="kidsList four wide" width={4}>
            <h3>My kiddos</h3>
            {kiddosList}
          </Grid.Column>
          <TasksList
            dropdownOptions={dropdownOptions}
            homeState={this.state}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            handleDelete={this.handleDelete}
            handleDoneTask={this.handleDoneTask}
            />
        </Grid.Row>
      </Grid>
    )
  }
}

export default Home;