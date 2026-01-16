import { useEffect } from "react";
import { Camera } from "../components/Camera";
import { Prediction } from "../components/Predicao";
import { useWebcam } from "../hooks/useWebcam";
import { useLibrasWS } from "../hooks/useLibrasWS";

export default function LibrasDetector() {
  const { webcamRef, getVideoFrame } = useWebcam();
  const { predictions, send, isConnected } = useLibrasWS("ws://localhost:8000/ws");

  const FPS_INTERVAL = 150;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isConnected) return;

      const frame = getVideoFrame();
      if (frame) {
        send(frame);
      }
    }, FPS_INTERVAL);

    return () => clearInterval(intervalId);
  }, [getVideoFrame, send, isConnected]);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-6 space-y-8 min-h-screen bg-gray-900 text-white">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-white">
          Batalha de IAs: LIBRAS
        </h1>
        <div className="flex items-center justify-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${
              isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
            }`}
          ></span>
          <p className="text-sm text-gray-400 font-mono">
            STATUS: {isConnected ? "CONECTADO AO PYTHON" : "DESCONECTADO"}
          </p>
        </div>
      </div>

      <div className="relative w-full max-w-2xl shadow-2xl rounded-xl overflow-hidden border border-gray-700">
        <Camera webcamRef={webcamRef} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        <Prediction
          title="Rede MLP (Geometria)"
          letter={predictions.mlp.letra}
          confidence={predictions.mlp.confianca}
          colorClass="text-green-500"
        />

        <Prediction
          title="Rede CNN (Estrutural)"
          letter={predictions.cnn.letra}
          confidence={predictions.cnn.confianca}
          colorClass="text-red-500"
        />
      </div>
    </div>
  );
}
