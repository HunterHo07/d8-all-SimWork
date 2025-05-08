export function generateStaticParams() {
  return [{ id: "demo-scenario" }];
}

export default function SimulationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full bg-black/80 border border-indigo-500/50 rounded-xl p-8 text-center backdrop-blur-sm shadow-glow-blue">
        <h2 className="text-2xl font-bold mb-4">Simulation</h2>
        <p className="text-gray-400 mb-6">
          This is a static placeholder for the simulation page. In the full app, this would show an interactive simulation.
        </p>
        <a
          href="/"
          className="inline-block px-4 py-2 bg-black border border-indigo-500 text-white rounded-md shadow-glow-blue hover:shadow-glow-blue-lg hover:scale-105 active:scale-95 backdrop-blur-sm transition-all"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
