
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEye, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Image, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";

export default () => {
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputType = showPassword ? "text" : "password";
  const passwordIconColor = showPassword ? "#262B40" : "";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main>
      <section className="vh-lg-100 bg-soft d-flex align-items-center my-4">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border border-light rounded p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <div className="user-avatar large-avatar mx-auto mb-3 border-dark p-2">
                    <Image src='https://www.google.com/imgres?q=man%20face&imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-photo%2Fclose-up-upset-american-black-person_23-2148749582.jpg%3Fsemt%3Dais_hybrid%26w%3D740&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fafrican-man-face&docid=cinjPinuHW-klM&tbnid=8RrSPdDEdlaEtM&vet=12ahUKEwjrqNKxh8SNAxVqLPsDHf5xBv4QM3oECGkQAA..i&w=740&h=1110&hcb=2&ved=2ahUKEwjrqNKxh8SNAxVqLPsDHf5xBv4QM3oECGkQAA' className="rounded-circle" />
                  </div>
                  <h3 className="mb-3">Bonnie Green</h3>
                  <p className="text-gray">Better to be safe than sorry.</p>
                </div>
                <Form className="mt-5">
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type={passwordInputType} placeholder="Password" />
                      <InputGroup.Text onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon color={passwordIconColor} icon={faEye} />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Unlock
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
