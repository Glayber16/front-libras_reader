import { useRef, useCallback } from "react";
import Webcam from "react-webcam";

export function useWebcam() {
  const webcamRef = useRef<Webcam>(null);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const getVideoFrame = useCallback(() => {
    const video = webcamRef.current?.video;
    if (!video || video.readyState !== 4) return null;

    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
      canvasRef.current.width = 320; 
      canvasRef.current.height = 240;
    }

    const canvas = canvasRef.current;
    
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    if (ctx) {

      ctx.drawImage(video, 0, 0, 320, 240);
      return canvas.toDataURL("image/jpeg", 0.5);
    }
    
    return null;
  }, []);

  return { webcamRef, getVideoFrame };
}