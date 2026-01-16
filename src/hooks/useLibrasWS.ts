import { useEffect, useRef, useState, useCallback } from "react";

type PredictionData = {
  letra: string;
  confianca: number;
};

type WSResponse = {
  mlp?: PredictionData;
  cnn?: PredictionData;
};

type WSMessage = {
  image: string;
};

export function useLibrasWS(url: string) {
  const ws = useRef<WebSocket | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const [predictions, setPredictions] = useState<{
    mlp: PredictionData;
    cnn: PredictionData;
  }>({
    mlp: { letra: "...", confianca: 0 },
    cnn: { letra: "...", confianca: 0 },
  });

  const [isConnected, setIsConnected] = useState(false);

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
      console.log("WebSocket conectado");
      setIsConnected(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    socket.onclose = () => {
      console.log("WebSocket desconectado. Tentando reconectar...");
      setIsConnected(false);
      ws.current = null;

      timeoutRef.current = window.setTimeout(() => {
        connect();
      }, 2000);
    };

    socket.onerror = (err) => {
      console.error("Erro no WebSocket:", err);
      socket.close();
    };

    socket.onmessage = (event) => {
      try {
        const data: WSResponse = JSON.parse(event.data);

        setPredictions((prev) => ({
          mlp: data.mlp || prev.mlp,
          cnn: data.cnn || prev.cnn,
        }));
      } catch (error) {
        console.error("Erro ao ler JSON:", error);
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

  return { predictions, isConnected, send };
}
