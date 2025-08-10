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
  // Nombres de meses para mostrar
  
  const monthNames = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];
  
  const getCapacityForMonth = (monthData: { month: number; year: number }): MonthlyCapacity | undefined => {
    // Buscar la capacidad para el mes y año específicos
    const capacity = monthlyCapacities.find(cap => 
      cap.departmentId === department.id && 
      cap.month === monthData.month && 
      cap.year === monthData.year
    );
    
    // Buscar capacidad para el mes y año específicos
    
    return capacity;
  };

  const getCapacityColor = (percentage: number): string => {
    if (percentage >= 90) return 'capacity-critical';
    if (percentage >= 75) return 'capacity-warning';
    if (percentage >= 50) return 'capacity-medium';
    return 'capacity-low';
  };

  return (
    <>
      <div className="department-row">
        <div className="department-info">
          <button
            className={`expand-btn ${isExpanded ? 'expanded' : ''}`}
            onClick={() => onToggleProjects(department.id)}
            aria-label={isExpanded ? 'Contraer proyectos' : 'Expandir proyectos'}
          >
            <span className="expand-icon">
              {isExpanded ? '▼' : '▶'}
            </span>
          </button>
          <div className="department-details">
            <h4 className="department-name">{department.name}</h4>
            <span className="department-people">
              {department.people.length} personas
            </span>
          </div>
          <div className="department-status">
            <span className="status-indicator active"></span>
            <span className="status-text">Activo</span>
          </div>
        </div>

        <div className="capacity-cells">
          {months.map(month => {
            const capacity = getCapacityForMonth(month);
            if (!capacity) return <div key={`${month.month}-${month.year}`} className="capacity-cell empty" />;

            const tooltip = `${department.name} - ${monthNames[month.month]}: ${capacity.percentage}% de capacidad utilizada (${capacity.usedHours}h de ${Math.round(capacity.maxHours)}h disponibles)`;
            
            return (
              <div 
                key={`${month.month}-${month.year}`} 
                className={`capacity-cell ${getCapacityColor(capacity.percentage)}`}
                data-tooltip={tooltip}
              >
                <div className="capacity-percentage">
                  {capacity.percentage}%
                </div>
                <div className="capacity-hours">
                  {capacity.usedHours}h / {Math.round(capacity.maxHours)}h
                </div>
                <div 
                  className="capacity-bar"
                  style={{ 
                    width: `${Math.min(capacity.percentage, 100)}%`,
                    backgroundColor: capacity.percentage >= 90 ? 'var(--danger-color)' :
                                   capacity.percentage >= 75 ? 'var(--warning-color)' :
                                   capacity.percentage >= 50 ? 'var(--primary-color)' : 'var(--success-color)'
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DepartmentRow;
