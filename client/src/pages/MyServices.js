import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

import Auth from "../utils/auth";

import { GET_CUSTOMER_BY_ID } from "../utils/queries";
import { UNSAVE_SERVICE } from "../utils/mutations";

const MyServices = () => {
  const { profileId } = useParams();
  const [unsaveService] = useMutation(UNSAVE_SERVICE);
  const { loading, data } = useQuery(GET_CUSTOMER_BY_ID, {
    variables: { userId: profileId },
  });
  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  //   console.log(profileId);

  const userData = data.getCustomerById;

  const handleDeleteService = async (serviceId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await unsaveService({ variables: { serviceId } });
      console.log(response);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved services!</h1>
        </Container>
      </div>
      <Container>
        <h2>
          {userData.savedExperiences.length
            ? `Viewing ${userData.savedExperiences.length} saved ${
                userData.savedExperiences.length === 1
                  ? "experience"
                  : "experiences"
              }:`
            : "You have no saved experiences!"}
        </h2>
        <Row>
          {userData.savedExperiences.map((experience) => {
            return (
              <Col md="4">
                <Card key={experience._id} border="dark">
                  <Card.Body>
                    <Card.Title>{experience.name}</Card.Title>
                    <p className="small">Vendor: {experience.vendor.name}</p>
                    <Card.Text>{experience.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteService(experience._id)}
                    >
                      Delete this Service!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default MyServices;
