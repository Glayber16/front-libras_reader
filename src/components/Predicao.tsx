type Props = {
  title: string;
  letter: string;
  confidence: number;
  colorClass?: string;
};

export function Prediction({ 
  title, 
  letter, 
  confidence, 
  colorClass = "text-indigo-500"
}: Props) {
  const displayConfidence = confidence.toFixed(1);

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-sm text-center border border-gray-700 flex flex-col items-center">
      <h2 className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">
        {title}
      </h2>

      <div className={`text-8xl font-black ${colorClass} h-32 flex items-center justify-center transition-all duration-300`}>
        {letter}
      </div>

      <div className="w-full mt-2">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Confiança</span>
          <span>{displayConfidence}%</span>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${colorClass.replace('text', 'bg')}`} 
            style={{ width: `${confidence}%`, transition: "width 0.3s ease-in-out" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
