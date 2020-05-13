import React from 'react';
import { Card, Grid } from 'semantic-ui-react';
import './Home.css';

class Home extends React.Component {

  state = {
    kids: ['kid1', 'kid2'],
    tasks: []
  }

  componentDidMount() {
    this.getTasks()
  }

  getTasks() {
    let hardCodedTasks = ['task1', 'task2', 'task3']
    let list = []
    for (let task of hardCodedTasks) {
      list.push(<Card fluid header={task} />)  
    }
    this.setState({
      tasks: list
    })
  }

  render() {
    return(
      <Grid className="homeContainer">
        <Grid.Row>
          <Grid.Column className="kidsList six wide" width={4}>
            My kiddos
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