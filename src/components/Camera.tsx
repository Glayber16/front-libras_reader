import Webcam from "react-webcam";
import type { RefObject } from "react";

type Props = {
  webcamRef: RefObject<Webcam | null>;
};

export function Camera({ webcamRef }: Props) {
  return (
    <div className="...">
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        screenshotQuality={0.5} 
        width={320}            
        height={240}
        
        className="w-full h-full object-cover scale-x-[-1]" 
        
        videoConstraints={{ 
            facingMode: "user",
            width: { ideal: 640 }, 
            height: { ideal: 480 } 
        }}
      />
    </div>
  );
}