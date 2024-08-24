import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

interface UsernameProps {
  setUsername: (username: string) => void;
}

const UsernameInput = ({ setUsername }: UsernameProps) => {
  const [username, setUsernameInput] = useState("");

  const handleSetUsername = (event: React.FormEvent) => {
    event.preventDefault();
    setUsername(username);
  };

  return (
    <Container>
      <Form onSubmit={handleSetUsername} className="mb-3">
        <Form.Group className="mb-3">
          <Form.Label>Username: </Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(event) => setUsernameInput(event.target.value)}
            autoComplete="off"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Set Username
        </Button>
      </Form>
    </Container>
  );
};

export default UsernameInput;