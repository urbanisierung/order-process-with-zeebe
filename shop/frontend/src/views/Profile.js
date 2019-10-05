import React from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "reactstrap";
import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";

const Profile = () => {
  const { loading, user } = useAuth0();
  if (loading || !user) {
    return <Loading />;
  }

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>
      <Row>
        <Button
          variant="primary"
          className="mr-1"
          onClick={() => {
            console.log(`Placing order for ${user.name} (${user.email})`);
            placeOrder(user.name, user.email);
          }}
        >
          Order now
        </Button>
      </Row>
    </Container>
  );
};

function placeOrder(name, email) {
  console.log("placing order");
  axios({
    method: "POST",
    url: "/api/order",
    data: {
      name,
      email
    }
  })
    .then(res => {
      console.log(JSON.stringify(res));
    })
    .catch(e => {
      console.log(e);
    });
}

export default Profile;
