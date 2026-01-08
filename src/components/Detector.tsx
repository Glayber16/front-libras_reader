import React, { useRef, useState, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';

const LibrasDetector = () => {
  const webcamRef = useRef<Webcam>(null);
  const ws = useRef<WebSocket | null>(null);
  const [letter, setLetter] = useState<string>('...');
  const [isConnected, setIsConnected] = useState(false);

  const SEND_INTERVAL = 100; 

  useEffect(() => {
    
    const socket = new WebSocket('ws://localhost:8000/ws');
    ws.current = socket;

    socket.onopen = () => {
      console.log('Conectado ao servidor de LIBRAS');
      setIsConnected(true);
    };

    socket.onclose = () => {
      console.log('Desconectado');
      setIsConnected(false);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.letter) {
        setLetter(data.letter);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const captureAndSend = useCallback(() => {
    if (webcamRef.current && ws.current && ws.current.readyState === WebSocket.OPEN) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        ws.current.send(JSON.stringify({ image: imageSrc }));
      }
    }
  }, [webcamRef]);

  useEffect(() => {
    const intervalId = setInterval(captureAndSend, SEND_INTERVAL);
    return () => clearInterval(intervalId);
  }, [captureAndSend]);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4">
      
      
      <div className="relative w-full max-w-2xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-gray-800">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full h-full object-cover transform scale-x-[-1]" 
          videoConstraints={{ facingMode: "user" }}
        />
        
        
       
      </div>

     
      <div className="mt-8 bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-sm text-center border border-gray-700 transition-all hover:scale-105">
        <h2 className="text-white text-sm uppercase tracking-widest font-semibold mb-2">
          Letra Identificada
        </h2>
        <div className="text-8xl font-black text-indigo-600 dark:text-indigo-400 h-32 flex items-center justify-center">
          {letter}
        </div>
      </div>
      
    </div>
  );
};

export default LibrasDetector;