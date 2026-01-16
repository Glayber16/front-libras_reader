import LibrasDetector from './pages/Detector';

function App() {
  return (
    <div className="min-h-screen  bg-slate-900 text-slate-900  flex flex-col">
      
      <header className="w-full py-6 px-8  bg-slate-800 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold bg-purple-600 bg-clip-text text-transparent">
            Leitor de Libras
          </h1>
          <p className="text-sm text-white ">
            Reconhecimento em Tempo Real
          </p>
        </div>
        
        <div className="text-sm bg-slate-700 px-3 py-1 rounded-md text-white">
          UFC - Eng. Computação
        </div>
      </header>
      
    
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <LibrasDetector />
      </main>
    </div>
  )
}

export default App