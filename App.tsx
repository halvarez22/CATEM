import React, { useState } from 'react';
import Header from './components/Header';
import ReportForm from './components/ReportForm';
import SubmissionSuccess from './components/SubmissionSuccess';
import TrackReport from './components/TrackReport';
import type { View } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<View>('form');
  const [trackingId, setTrackingId] = useState<string | null>(null);

  const handleReportSubmitted = (id: string) => {
    setTrackingId(id);
    setView('success');
  };

  const handleNavigate = (newView: View) => {
    setView(newView);
  };

  const renderView = () => {
    switch (view) {
      case 'form':
        return <ReportForm onSubmitted={handleReportSubmitted} />;
      case 'success':
        return <SubmissionSuccess trackingId={trackingId!} onNavigate={handleNavigate} />;
      case 'track':
        return <TrackReport />;
      default:
        return <ReportForm onSubmitted={handleReportSubmitted} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1a202c] text-slate-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl">
        <Header onNavigate={handleNavigate} currentView={view} />
        <main className="mt-8">
          {renderView()}
        </main>
      </div>
       <footer className="w-full max-w-3xl mt-12 text-center text-xs text-slate-500">
          <p>&copy; 2025 CATEM</p>
          <p>Protegiendo los derechos de los trabajadores con tecnología segura.</p>
          <p className="mt-2">Powered by pai-b &copy; 2025 Todos los derechos reservados.</p>
        </footer>
    </div>
  );
};

export default App;