import { useRef } from "react";
import Webcam from "react-webcam";

export function useWebcam() {
    const webcamRef = useRef<Webcam | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const getVideoFrame = () => {
        const video = webcamRef.current?.video;
        if (!video) return null;
        if (!canvasRef.current) {
            canvasRef.current = document.createElement("canvas");
        }

    
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) return null;

        ctx.drawImage(video, 0, 0);
        return canvas.toDataURL("image/jpeg", 0.6);
  };

  return { webcamRef, getVideoFrame };
}
