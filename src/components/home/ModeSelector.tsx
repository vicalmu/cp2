import React from 'react';
import ModeCard from './ModeCard';

interface ModeSelectorProps {
  onModeSelect: (mode: 'gantt' | 'projects' | 'simulator') => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ onModeSelect }) => {
  const modes = [
    {
      id: 'gantt' as const,
      title: 'Modo Gantt',
      description: 'Visualiza la capacidad de tus departamentos en el tiempo. Analiza la carga mensual y trimestral con una vista clara de la distribución de recursos.',
      icon: '📊'
    },
    {
      id: 'projects' as const,
      title: 'Modo Proyectos',
      description: 'Gestiona y analiza todos tus proyectos. Visualiza el progreso, asigna recursos y mantén un control completo de la cartera de proyectos.',
      icon: '📋'
    },
    {
      id: 'simulator' as const,
      title: 'Simulador Inteligente',
      description: 'Simula el impacto de nuevos proyectos en tu empresa. Analiza la viabilidad y obtén recomendaciones para optimizar la capacidad.',
      icon: '🧠'
    }
  ];

  return (
    <div className="modes-container">
      <div className="modes-grid">
        {modes.map((mode) => (
          <ModeCard
            key={mode.id}
            mode={mode.id}
            title={mode.title}
            description={mode.description}
            icon={mode.icon}
            onClick={() => onModeSelect(mode.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ModeSelector;
