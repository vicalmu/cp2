import React from 'react';

interface ModeCardProps {
  mode: 'gantt' | 'projects' | 'simulator';
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
}

const ModeCard: React.FC<ModeCardProps> = ({ mode, title, description, icon, onClick }) => {
  return (
    <div className={`mode-card ${mode}`} onClick={onClick}>
      <div className="mode-header">
        <span className="mode-icon" role="img" aria-label={title}>
          {icon}
        </span>
        <h3 className="mode-title">{title}</h3>
      </div>
      
      <p className="mode-description">{description}</p>
      
      <div className="mode-actions">
        <button className="mode-button">
          Acceder
          <span role="img" aria-label="arrow">
            →
          </span>
        </button>
      </div>
    </div>
  );
};

export default ModeCard;
