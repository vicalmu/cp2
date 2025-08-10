import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomeView from './components/home/HomeView';
import GanttView from './components/gantt/GanttView';
import './styles/global.css';
import './styles/home.css';
import './styles/gantt.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/gantt" element={<GanttView />} />
          <Route path="/proyectos" element={
            <div className="projects-container">
              <div className="projects-header">
                <h1>Modo Proyectos</h1>
                <p>Gestiona y organiza todos los proyectos de tu empresa con herramientas avanzadas de planificación y seguimiento.</p>
              </div>
            </div>
          } />
          <Route path="/simulador" element={
            <div className="simulator-container">
              <div className="simulator-header">
                <h1>Simulador Inteligente</h1>
                <p>Simula el impacto de nuevos proyectos en la capacidad de tus departamentos antes de implementarlos.</p>
              </div>
            </div>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
