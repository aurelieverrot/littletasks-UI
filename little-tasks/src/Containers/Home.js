import React from 'react';
import { Card, Grid } from 'semantic-ui-react';
import './Home.css';
import TasksApi from '../api/TasksApi';

class Home extends React.Component {

  state = {
    kids: [],
    tasks: []
  }

  componentDidMount() {
    this.getKiddos()
    this.getTasks()
  }

  getTasks() {
    let hardCodedTasks = ['task1', 'task2', 'task3'];
    const tasksFromApi = TasksApi.tasksIndex()
    .then(res => console.log(res.data));

    let list = [];
    for (let task of tasksFromApi) {
      list.push(<Card fluid header={task}/>)  
    }
    this.setState({
      tasks: list
    })
  }

  getKiddos() {
    let hardCodedKiddos = ['kid1', 'kid2'];
    let list = [];
    for (let kid of hardCodedKiddos) {
      list.push(
        <Card
          href='#card-example-link-card'
          header={kid}
        />
      )
    }
    this.setState({
      kids: list
    })
  }

  render() {
    return(
      <Grid className="homeContainer">
        <Grid.Row>
          <Grid.Column className="kidsList six wide" width={4}>
            <h3>My kiddos</h3>
            {this.state.kids}
          </Grid.Column>
          <Grid.Column className="tasksContainer ten wide" width={10}>
          <h3>You have {this.state.tasks.length} tasks to complete today</h3>
            <Card.Group>
              {this.state.tasks}
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>

    )
  }
}

export default Home;