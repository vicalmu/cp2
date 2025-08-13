import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProjectsProvider } from './context/ProjectsContext';
import HomeView from './components/home/HomeView';
import GanttView from './components/gantt/GanttView';
import ProjectsView from './components/projects/ProjectsView';
import TestView from './components/test/TestView';
import './styles/global.css';
import './styles/home.css';
import './styles/gantt.css';
import './styles/projects.css';

const App: React.FC = () => {
  console.log('🔍 App.tsx - Renderizando aplicación');
  
  return (
    <ProjectsProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/gantt" element={<GanttView />} />
            <Route path="/proyectos" element={<ProjectsView />} />
            <Route path="/test" element={<TestView />} />
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
    </ProjectsProvider>
  );
};

export default App;
