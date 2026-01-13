import { useEffect } from "react";
import { Camera } from "../components/Camera";
import { Prediction } from "../components/Predicao";
import { useWebcam } from "../hooks/useWebcam";
import { useLibrasWS } from "../hooks/useLibrasWS";

export default function LibrasDetector() {
  const { webcamRef, getVideoFrame } = useWebcam();
  const { letter, send, isConnected } = useLibrasWS("ws://localhost:8000/ws");

  const FPS_INTERVAL = 100; // 10 FPS

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isConnected) return;

      const frame = getVideoFrame();
      if (frame) {
        send(frame); // ✅ Correto
      }
    }, FPS_INTERVAL);

    return () => clearInterval(intervalId);
  }, [getVideoFrame, send, isConnected]);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 space-y-6">
      <div className="relative w-full max-w-2xl">
        <Camera webcamRef={webcamRef} />

        
      </div>

      <Prediction letter={letter} />
    </div>
  );
}
