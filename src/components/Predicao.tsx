type Props = {
  letter: string;
};

export function Prediction({ letter }: Props) {
  return (
    <div className="mt-8 bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-sm text-center border border-gray-700">
      <h2 className="text-white text-sm uppercase tracking-widest font-semibold mb-2">
        Letra Identificada
      </h2>
      <div className="text-8xl font-black text-indigo-500 h-32 flex items-center justify-center">
        {letter}
      </div>
    </div>
  );
}
