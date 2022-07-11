import { useState } from "react";
import { Button } from "react-bootstrap";
import { Form, Container, Card } from "react-bootstrap";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <Container>
      <Card
        border="secondary"
        style={{
          maxWidth: "50rem",
          justifyContent: "center",
        }}
      >
        <Card.Body>
          <Card.Title>
            <h2 style={{ marginBottom: "3rem", textAlign: "center" }}>
              Log in to application{" "}
            </h2>
          </Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>username</Form.Label>
              <Form.Control
                type="text"
                placeholder="username..."
                style={{ maxWidth: "25rem", width: "70%" }}
                className="mb-3 "
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password..."
                style={{ maxWidth: "25rem", width: "70%" }}
                className="mb-5  "
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button type="submit">Login</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginForm;
