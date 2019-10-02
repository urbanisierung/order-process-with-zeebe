import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import ButtonsShowcase from './showcases/Buttons'
import ToastsShowcase from './showcases/Toasts'

const App: React.FC = () => {
  return (
    <Container className="p-3">
      <Jumbotron>
        <h1 className="header">Welcome to the mighty shop!</h1>
      </Jumbotron>
      <h2>Please place your order</h2>
      <Button variant="primary" className="mr-1" onClick={() => placeOrder()}>Order now</Button>
    </Container>
  );
}

function placeOrder() {
  console.log('order places...');
}

export default App;
