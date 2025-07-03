import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";

const socket = io("http://localhost:3000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const location = useLocation();

  // Destructure from location.state
  const { senderId, recieverId } = location.state || {};

  if (!senderId || !recieverId) {
    return <div className="p-4 text-center">Invalid chat room</div>;
  }

  const getRoomId = (id1, id2) => [id1, id2].sort().join("_");
  const roomId = getRoomId(senderId, recieverId);

  useEffect(() => {
    socket.emit("joinRoom", { roomId });

    fetch(`http://localhost:3000/api/chat/${roomId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data));

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const msgData = {
      roomId,
      senderId,
      content: input,
    };

    socket.emit("sendMessage", msgData);
    // setMessages((prev) => [...prev, msgData]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto border rounded shadow-lg">
      <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg max-w-xs ${
              msg.senderId === senderId
                ? "bg-green-200 ml-auto"
                : "bg-white mr-auto"
            }`}
          >
            {msg.content}



<span className="text-[10px] font-thin flex flex-col items-end text-gray-500">
  <span>{new Date(msg.timestamp).toLocaleDateString()}</span>
  <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
</span>


          </div>
        ))}
      </div>

      <div className="flex p-2 border-t">
        <input
          type="text"
          className="flex-1 border rounded px-2 py-1 mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
