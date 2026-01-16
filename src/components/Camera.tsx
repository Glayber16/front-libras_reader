import Webcam from "react-webcam";
import type { RefObject } from "react";

type Props = {
  webcamRef: RefObject<Webcam | null>;
};

export function Camera({ webcamRef }: Props) {
  return (
    <div className="relative w-full max-w-2xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-gray-800">
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
        className="w-full h-full object-cover scale-x-[-1]"
        videoConstraints={{
          facingMode: "user",
          width: 640,
          height: 480
        }}
      />
    </div>
  );
}
