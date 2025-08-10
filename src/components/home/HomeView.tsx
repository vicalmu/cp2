import React from 'react';
import { useNavigate } from 'react-router-dom';
import ModeSelector from './ModeSelector';

const HomeView: React.FC = () => {
  const navigate = useNavigate();

  const handleModeSelect = (mode: 'gantt' | 'projects' | 'simulator') => {
    switch (mode) {
      case 'gantt':
        navigate('/gantt');
        break;
      case 'projects':
        navigate('/proyectos');
        break;
      case 'simulator':
        navigate('/simulador');
        break;
    }
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">Capacity Planner</h1>
        <p className="home-subtitle">
          Optimiza la capacidad de tu empresa. Analiza la carga de departamentos, 
          gestiona proyectos y simula el impacto de nuevas iniciativas con precisión.
        </p>
      </div>
      
      <ModeSelector onModeSelect={handleModeSelect} />
    </div>
  );
};

export default HomeView;
