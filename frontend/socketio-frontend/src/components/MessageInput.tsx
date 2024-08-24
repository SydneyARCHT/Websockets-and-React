import { FormEvent, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Socket } from "socket.io-client";

interface MessageInputProps {
  socket: Socket;
  username: string;
}

const MessageInput = ({ socket, username }: MessageInputProps) => {
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = (event: FormEvent) => {
    event.preventDefault();
    socket.emit('message', { text: message, username });
    setMessage("");
  };

  return (
    <Container>
      <Form onSubmit={handleSendMessage} className="mb-3">
        <Form.Group className="mb-3">
          <Form.Label>Message: </Form.Label>
          <Form.Control
            type="text"
            autoComplete="off"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </Container>
  );
};

export default MessageInput;