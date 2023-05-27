import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Auth from "../utils/auth";

import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries.js";

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  const { data } = useQuery(GET_ME);
  const userData = data?.me || {};
  // console.log(userData);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            Travel Buddy
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar" className="d-flex flex-row-reverse">
            <Nav className="ml-auto d-flex">
              {/* Always show the vendors page link */}
              <Nav.Link as={Link} to="/vendors">
                Vendors
              </Nav.Link>

              {/* Show login/signup or logout based on user authentication */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to={`/profiles/${userData._id}`}>
                    {`${userData.usertype}`}'s Profile
                  </Nav.Link>

                  {userData.usertype === "Customer" && (
                    <>
                      <Nav.Link as={Link} to={`/myservices/${userData._id}`}>
                        My Services
                      </Nav.Link>
                    </>
                  )}

                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>
                  Login/Sign Up
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
