import { useEffect, useRef, useState, useCallback } from "react";

type PredictionData = { letra: string; confianca: number; };

type ROI = { x: number; y: number; w: number; h: number; } | null;

type WSResponse = {
  mlp?: PredictionData;
  cnn?: PredictionData;
  roi?: ROI; 
};

export function useLibrasWS(url: string) {
  const ws = useRef<WebSocket | null>(null);
  const [data, setData] = useState<{
    predictions: { mlp: PredictionData; cnn: PredictionData };
    roi: ROI;
  }>({
    predictions: {
      mlp: { letra: "-", confianca: 0 },
      cnn: { letra: "-", confianca: 0 },
    },
    roi: null,
  });

  const [isConnected, setIsConnected] = useState(false);


  const connect = useCallback(() => {
     if (ws.current?.readyState === WebSocket.OPEN) return;
     const socket = new WebSocket(url);
     ws.current = socket;
     
     socket.onopen = () => setIsConnected(true);
     socket.onclose = () => { setIsConnected(false); setTimeout(connect, 2000); };
     
     socket.onmessage = (event) => {
        try {
           const res: WSResponse = JSON.parse(event.data);
           setData((prev) => ({
              predictions: {
                 mlp: res.mlp || prev.predictions.mlp,
                 cnn: res.cnn || prev.predictions.cnn,
              },
              roi: res.roi || null 
           }));
        } catch {}
     };
  }, [url]);

  useEffect(() => { connect(); return () => ws.current?.close(); }, [connect]);

  const send = useCallback((image: string) => {
     if (ws.current?.readyState === WebSocket.OPEN) ws.current.send(JSON.stringify({ image }));
  }, []);

  return { predictions: data.predictions, roi: data.roi, isConnected, send };
}