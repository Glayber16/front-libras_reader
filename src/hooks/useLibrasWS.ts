import { useEffect, useRef, useState } from "react";

type WSMessage = {
  image: string;
};

type WSResponse = {
  letter?: string;
};

export function useLibrasWS(url: string) {
  const ws = useRef<WebSocket | null>(null);
  const [letter, setLetter] = useState("...");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(url);
    ws.current = socket;

    socket.onopen = () => setIsConnected(true);
    socket.onclose = () => {
      setIsConnected(false);
      setLetter("...");
    };

    socket.onmessage = (event) => {
      const data: WSResponse = JSON.parse(event.data);
      if (data.letter) {
        setLetter(data.letter);
      }
    };

    return () => socket.close();
  }, [url]);

  const send = (image: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      const payload: WSMessage = { image };
      ws.current.send(JSON.stringify(payload));
    }
  };

  return { letter, isConnected, send };
}
