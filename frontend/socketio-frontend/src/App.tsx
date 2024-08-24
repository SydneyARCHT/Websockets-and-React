import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { io } from "socket.io-client";
import MessageInput from "./components/MessageInput";
import ChatBody from "./components/ChatBody";


const socket = io("http://127.0.0.1:5000", {
  autoConnect: false,
});

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [username, setUsername] = useState<string | null>(null);

  const handleConnect = () => {
    if (username) {
      socket.connect();
      setIsConnected(true);
    }
  };

  const handleDisconnect = () => {
    socket.disconnect();
    setIsConnected(false);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSetUsername = (event: React.FormEvent) => {
    event.preventDefault(); 
    if (username) {
      handleConnect();
    }
  };

  return (
    <Container>
      <p>
        Connection Status: {isConnected ? "Connected!" : "Not Connected :/"}
      </p>

      {!username ? (
        <Form onSubmit={handleSetUsername} className="mb-3">
          <Form.Group className="mb-3">
            <Form.Label>Username: </Form.Label>
            <Form.Control
              type="text"
              value={username || ""}
              onChange={handleUsernameChange}
              autoComplete="off"
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Set Username
          </Button>
        </Form>
      ) : (
        <>
          {isConnected ? (
            <>
              <ChatBody socket={socket} username={username} />
              <MessageInput socket={socket} username={username} />
              <Button onClick={handleDisconnect} variant="danger">
                Disconnect
              </Button>
            </>
          ) : (
            <Button onClick={handleConnect} variant="success">
              Connect
            </Button>
          )}
        </>
      )}
    </Container>
  );
}

export default App;