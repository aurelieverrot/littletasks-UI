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
    this.getTasksFromApi()

  }

  getTasksFromApi() {
    TasksApi.tasksIndex()
    .then(res => 
      this.setState({
      // 1/ set this.state.tasks = to res.data
      // 2/ generate the JSX in the render method
        tasks: res.data
      }))
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

     // generate JSX
     let tasksList = [];
     for (let task of this.state.tasks) {
       tasksList.push(<Card fluid header={task.description}/>)  
     }

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
              {tasksList}
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>

    )
  }
}

export default Home;