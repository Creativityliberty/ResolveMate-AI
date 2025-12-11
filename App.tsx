import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ScenarioSelection from './pages/ScenarioSelection';
import Simulation from './pages/Simulation';
import Report from './pages/Report';
import History from './pages/History';
import Settings from './pages/Settings';
import CreateScenario from './pages/CreateScenario';
import { Scenario, AnalysisReport, Message } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [reportData, setReportData] = useState<AnalysisReport | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleScenarioSelect = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setCurrentPage('simulation');
  };

  const handleSimulationFinish = (report: AnalysisReport, messages: Message[]) => {
    setReportData(report);
    setCurrentPage('report');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
    setSelectedScenario(null);
    setReportData(null);
  };

  // Render Page Logic for Fullscreen Modes (No Sidebar)
  if (currentPage === 'simulation' && selectedScenario) {
    return (
      <Simulation 
        scenario={selectedScenario} 
        onFinish={handleSimulationFinish}
        onExit={handleBackToDashboard}
      />
    );
  }

  if (currentPage === 'report' && reportData) {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
         <Sidebar 
          currentPage={'scenarios'} 
          setPage={setCurrentPage} 
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
        <Report report={reportData} onClose={handleBackToDashboard} />
      </div>
    );
  }

  // Main Layout for Dashboard/Selection/History/Settings/Create
  let content;
  switch (currentPage) {
    case 'dashboard':
      content = <Dashboard setPage={setCurrentPage} />;
      break;
    case 'scenarios':
      content = <ScenarioSelection onSelect={handleScenarioSelect} />;
      break;
    case 'history':
      content = <History setPage={setCurrentPage} />;
      break;
    case 'profile':
      content = <Settings />;
      break;
    case 'create-scenario': // Added case for create scenario
      content = <CreateScenario onBack={() => setCurrentPage('dashboard')} />;
      break;
    default:
      content = <Dashboard setPage={setCurrentPage} />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-surface-dark border-b border-white/5 z-30 flex items-center px-4">
        <button onClick={() => setIsMobileOpen(true)} className="text-white p-2">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <span className="ml-4 font-bold text-white text-lg">NegoMaster AI</span>
      </div>

      <Sidebar 
        currentPage={currentPage} 
        setPage={setCurrentPage} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      
      <div className="flex-1 flex flex-col pt-16 lg:pt-0 overflow-hidden">
        {content}
      </div>
    </div>
  );
};

export default App;
