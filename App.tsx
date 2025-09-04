import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ReportForm from './components/ReportForm';
import SubmissionSuccess from './components/SubmissionSuccess';
import TrackReport from './components/TrackReport';
import Dashboard from './components/Dashboard';
import ManagerialDashboard from './components/ManagerialDashboard';
import Notification from './components/Notification';
import Login from './components/Login';
import type { View, ReportData } from './types';
import { ReportStatus } from './types';
import { mockReports } from './data/mockReports';
import { generateTrackingId } from './services/geminiService';

export type DashboardFilters = Partial<Record<'status' | 'severity' | 'category', string>>;

const App: React.FC = () => {
  const [view, setView] = useState<View>('form');
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [reports, setReports] = useState<ReportData[]>(mockReports);
  const [dashboardFilters, setDashboardFilters] = useState<DashboardFilters>({});
  const [notification, setNotification] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginRedirectView, setLoginRedirectView] = useState<View | null>(null);

  useEffect(() => {
    if (isAuthenticated && (view === 'dashboard' || view === 'managerialDashboard')) {
      const intervalId = window.setInterval(() => {
        const isNewReport = Math.random() > 0.8;
        if (isNewReport) {
           const newMockReport: ReportData = {
              id: generateTrackingId(),
              title: 'Reporte Simulado de Prueba',
              description: 'Este es un reporte simulado para demostrar la funcionalidad de notificaciones.',
              files: [],
              status: ReportStatus.RECIBIDO,
              analysis: {
                category: 'Prueba',
                severity: 'Baja',
                summary: 'Reporte de prueba.'
              },
              timestamp: new Date().toISOString(),
              internalNotes: [],
           };
           setReports(prev => [newMockReport, ...prev]);
           setNotification(`Nuevo reporte: ${newMockReport.id}`);
        }
      }, 10000);
      return () => window.clearInterval(intervalId);
    }
  }, [view, isAuthenticated]);

  const handleReportSubmitted = (report: ReportData) => {
    setTrackingId(report.id);
    setReports(prev => [report, ...prev]);
    setView('success');
    setNotification(`Reporte ${report.id} ha sido recibido.`);
  };
  
  const handleUpdateReport = (updatedReport: ReportData) => {
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === updatedReport.id ? updatedReport : report
      )
    );
  };

  const handleNavigate = (newView: View) => {
    if ((newView === 'dashboard' || newView === 'managerialDashboard') && !isAuthenticated) {
        setLoginRedirectView(newView);
        setView('login');
        return;
    }

    if (view === 'dashboard' && newView !== 'dashboard') {
      setDashboardFilters({});
    }
    setView(newView);
  };

  const handleLoginSuccess = (redirectTo: View) => {
      setIsAuthenticated(true);
      setView(redirectTo);
      setLoginRedirectView(null);
  }

  const handleLogout = () => {
      setIsAuthenticated(false);
      setView('form');
  }

  const handleDrillDown = (filters: DashboardFilters) => {
    setDashboardFilters(filters);
    setView('dashboard');
  };

  const renderView = () => {
    switch (view) {
      case 'form':
        return <ReportForm onSubmitted={handleReportSubmitted} />;
      case 'success':
        return <SubmissionSuccess trackingId={trackingId!} onNavigate={handleNavigate} />;
      case 'track':
        return <TrackReport reports={reports} />;
      case 'login':
        return <Login onLoginSuccess={handleLoginSuccess} redirectTo={loginRedirectView || 'dashboard'} />;
      case 'dashboard':
        return isAuthenticated ? <Dashboard 
                  reports={reports} 
                  onUpdateReport={handleUpdateReport} 
                  initialFilters={dashboardFilters}
                  onBackToManagerial={() => handleNavigate('managerialDashboard')}
               /> : null; // Should be unreachable due to handleNavigate logic
      case 'managerialDashboard':
        return isAuthenticated ? <ManagerialDashboard reports={reports} onDrillDown={handleDrillDown} /> : null; // Should be unreachable
      default:
        return <ReportForm onSubmitted={handleReportSubmitted} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1a202c] text-slate-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
      <div className="w-full max-w-7xl">
        <Header onNavigate={handleNavigate} currentView={view} isAuthenticated={isAuthenticated} onLogout={handleLogout}/>
        <main className="mt-8">
          {renderView()}
        </main>
      </div>
       <footer className="w-full max-w-7xl mt-12 text-center text-xs text-slate-500">
          <p>&copy; 2025 CATEM</p>
          <p>Protegiendo los derechos de los trabajadores con tecnología segura.</p>
          <p className="mt-2">Powered by pai-b &copy; 2025 Todos los derechos reservados.</p>
        </footer>
    </div>
  );
};

export default App;
