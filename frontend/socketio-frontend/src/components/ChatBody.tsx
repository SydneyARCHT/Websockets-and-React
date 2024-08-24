import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Socket } from "socket.io-client";

interface ChatBodyProps {
  socket: Socket;
  username: string;
}

interface Message {
  username: string;
  text: string;
}

const ChatBody = ({ socket, username }: ChatBodyProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const handleMessage = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on('message', handleMessage);

    return () => {
      socket.off('message', handleMessage);
    };
  }, [socket]);

  return (
    <Container>
      {messages.map((message, index) => (
        <Card
          className={`my-3 ${message.username === username ? 'text-end' : ''}`}
          key={index}
        >
          <Card.Body>
            <strong>{message.username}</strong>: {message.text}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default ChatBody;