import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";

const App: React.FC = () => {
  return (
    <Container className="p-3">
      <Jumbotron>
        <h1 className="header">Welcome to the mighty shop!</h1>
      </Jumbotron>
      <h2>Please place your order</h2>
      <Form>
        <Form.Group controlId="order-customer-name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" />
          <Form.Text className="text-muted">First name is enough</Form.Text>
        </Form.Group>
        <Form.Group controlId="order-customer-email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
      </Form>
      <Button
        variant="primary"
        className="mr-1"
        onClick={() => {
          const nameElement = document.getElementById(
            "order-customer-name"
          ) as HTMLInputElement;
          const emailElement = document.getElementById(
            "order-customer-email"
          ) as HTMLInputElement;
          if (nameElement && emailElement) {
            console.log(`Placing order for ${nameElement["value"]} (${emailElement["value"]})`);
            placeOrder(nameElement["value"], emailElement["value"]);
          }
        }}
      >
        Order now
      </Button>
    </Container>
  );
};

function placeOrder(name: string, email: string) {
  axios({
    method: "POST",
    url: "/api/order",
    data: {
      name: "Adam",
      email: "adam.urban@gmail.com"
    }
  });
  console.log("order placed...");
}

export default App;
