import Webcam from "react-webcam";
import { memo } from "react";
import type { RefObject } from "react";

type ROI = { x: number; y: number; w: number; h: number; } | null;

type Props = {
  webcamRef: RefObject<Webcam | null>;
  roi?: ROI; 
};

export const Camera = memo(function Camera({ webcamRef, roi }: Props) {
  return (
    <div className="relative w-full max-w-2xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-gray-800 group">
      
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        screenshotQuality={0.5}
        width={320}
        height={240}
        className="absolute top-0 left-0 w-full h-full object-cover scale-x-[-1]"
        videoConstraints={{ facingMode: "user", width: 640, height: 480 }}
      />

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none scale-x-[-1]">
        {roi && (
            <div 
                style={{
                    position: "absolute",
                    left: `${roi.x}%`,
                    top: `${roi.y}%`,
                    width: `${roi.w}%`,
                    height: `${roi.h}%`,
                    transition: "all 0.1s linear"
                }}
                className="border-4 border-green-500 rounded-lg shadow-[0_0_15px_rgba(0,255,0,0.5)]"
            >
                <span className="absolute -top-8 left-0 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded scale-x-[-1]">
                    MÃO DETECTADA
                </span>
            </div>
        )}
      </div>

    </div>
  );
});

