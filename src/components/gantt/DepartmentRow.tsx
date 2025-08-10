import React from 'react';
import { Department, MonthlyCapacity } from '../../data/types';

interface DepartmentRowProps {
  department: Department;
  monthlyCapacities: MonthlyCapacity[];
  months: { month: number; year: number }[];
  onToggleProjects: (departmentId: string) => void;
  isExpanded: boolean;
}

const DepartmentRow: React.FC<DepartmentRowProps> = ({
  department,
  monthlyCapacities,
  months,
  onToggleProjects,
  isExpanded
}) => {
  const getCapacityCell = (monthData: { month: number; year: number }) => {
    const capacity = monthlyCapacities.find(cap => 
      cap.departmentId === department.id && 
      cap.month === monthData.month && 
      cap.year === monthData.year
    );

    if (!capacity) {
      return <div key={`${monthData.month}-${monthData.year}`} className="capacity-cell empty" />;
    }

    const { usedHours, maxHours, percentage } = capacity;
    
    // Determinar la clase de capacidad basada en el porcentaje
    let capacityClass = 'capacity-low';
    if (percentage >= 100) {
      capacityClass = 'capacity-critical';
    } else if (percentage >= 80) {
      capacityClass = 'capacity-warning';
    } else if (percentage >= 60) {
      capacityClass = 'capacity-medium';
    }

    return (
      <div key={`${monthData.month}-${monthData.year}`} className={`capacity-cell ${capacityClass}`}>
        <div className="capacity-percentage">{Math.round(percentage)}%</div>
        <div className="capacity-hours">{usedHours}h / {maxHours}h</div>
        <div className="capacity-bar">
          <div 
            className="capacity-bar-fill" 
            style={{ 
              width: `${Math.min(percentage, 100)}%`,
              backgroundColor: percentage >= 100 ? '#dc3545' : 
                             percentage >= 80 ? '#fd7e14' : 
                             percentage >= 60 ? '#ffc107' : '#28a745'
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="department-row">
      <div className="department-row-header" onClick={() => onToggleProjects(department.id)}>
        <div className="department-info">
          <button className="expand-btn">
            <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
          </button>
          <div className="department-details">
            <h4 className="department-name">{department.name}</h4>
            <span className="department-people">{department.people.length} personas</span>
          </div>
          <div className="department-status">
            <span className="status-indicator"></span>
            <span className="status-text">Activo</span>
          </div>
        </div>
        
        <div className="capacity-cells">
          {months.map(month => getCapacityCell(month))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentRow;
