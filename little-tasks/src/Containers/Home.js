import React from 'react';
import { Card } from 'semantic-ui-react';

class Home extends React.Component {

  state = {
    tasks: ['task1', 'task2', 'task3']
  }


  render() {
    return(
      <div>
        <Card fluid as='h3'>You have {this.state.tasks.length} tasks to complete</Card>
        <Card.Group>
          <Card fluid header='Option 1' />
          <Card fluid header='Option 2' />
          <Card fluid header='Option 3' />
        </Card.Group>
      </div>
    )
  }
}

export default Home;