import { useEffect, useRef, useState, useCallback } from "react";

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
  const timeoutRef = useRef<number | null>(null);

  const connect = useCallback(() => {
    if (
      ws.current &&
      (ws.current.readyState === WebSocket.OPEN ||
        ws.current.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    const socket = new WebSocket(url);
    ws.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    socket.onclose = () => {
      setIsConnected(false);
      ws.current = null;

      timeoutRef.current = window.setTimeout(() => {
        connect();
      }, 2000);
    };

    socket.onerror = () => {
      socket.close();
    };

    socket.onmessage = (event) => {
      try {
        const data: WSResponse = JSON.parse(event.data);
        if (data.letter) {
          setLetter(data.letter);
        }
      } catch {

      }
    };
  }, [url]);

  useEffect(() => {
    connect();

    return () => {
      if (ws.current) ws.current.close();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [connect]);

  const send = useCallback((image: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      const payload: WSMessage = { image };
      ws.current.send(JSON.stringify(payload));
    }
  }, []);

  return { letter, isConnected, send };
}
