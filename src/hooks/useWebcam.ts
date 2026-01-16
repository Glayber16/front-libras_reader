import { useRef, useCallback } from "react";
import Webcam from "react-webcam";

export function useWebcam() {
  const webcamRef = useRef<Webcam>(null);

  const getVideoFrame = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    
    return imageSrc || null;
  }, []);

  return { webcamRef, getVideoFrame };
}