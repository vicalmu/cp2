import React from 'react';
import { Project } from '../../data/types';

interface ProjectRowProps {
  project: Project;
  months: { month: number; year: number }[];
  departmentId: string;
  isVisible: boolean;
}

const ProjectRow: React.FC<ProjectRowProps> = ({
  project,
  months,
  departmentId,
  isVisible
}) => {
  if (!isVisible) return null;

  const projectDept = project.departments.find(d => d.departmentId === departmentId);
  if (!projectDept) return null;

  const startMonth = project.startDate.getMonth();
  const endMonth = project.endDate.getMonth();
  const startYear = project.startDate.getFullYear();
  const endYear = project.endDate.getFullYear();

  const getProjectCell = (monthData: { month: number; year: number }) => {
    // Verificar si el mes está dentro del rango del proyecto (considerando años)
    const isInProjectRange = (
      (monthData.year > startYear || (monthData.year === startYear && monthData.month >= startMonth)) &&
      (monthData.year < endYear || (monthData.year === endYear && monthData.month <= endMonth))
    );

    if (!isInProjectRange) {
      return <div key={`${monthData.month}-${monthData.year}`} className="project-cell empty" />;
    }

    // Calcular el índice del mes dentro de la distribución mensual del proyecto
    let monthIndex = 0;
    if (monthData.year === startYear) {
      monthIndex = monthData.month - startMonth;
    } else {
      // Si estamos en un año posterior, sumar los meses del año anterior
      monthIndex = (12 - startMonth) + (monthData.year - startYear - 1) * 12 + monthData.month;
    }

    const hours = projectDept.monthlyDistribution[monthIndex] || 0;
    
    if (hours === 0) {
      return <div key={`${monthData.month}-${monthData.year}`} className="project-cell empty" />;
    }

    // Calcular el porcentaje de capacidad que representa este proyecto
    const department = project.departments.find(d => d.departmentId === departmentId);
    const totalDepartmentHours = department?.hours || 0;
    const percentage = totalDepartmentHours > 0 ? Math.round((hours / totalDepartmentHours) * 100) : 0;

    return (
      <div key={`${monthData.month}-${monthData.year}`} className="project-cell active">
        <div className="project-hours">{hours}h</div>
        <div className="project-percentage">{percentage}%</div>
        <div className="project-bar" style={{ width: `${Math.min(percentage, 100)}%` }} />
      </div>
    );
  };

  return (
    <div className="project-row">
      <div className="project-info">
        <div className="project-details">
          <h5 className="project-name">{project.name}</h5>
          <span className="project-description">{project.description}</span>
          <div className="project-meta">
            <span className="project-duration">
              {startMonth + 1}/{startYear} - {endMonth + 1}/{endYear}
            </span>
            <span className="project-priority high">Alta</span>
            <span className="project-total-hours">Total: {projectDept.hours}h</span>
          </div>
        </div>
      </div>

      <div className="project-cells">
        {months.map(month => getProjectCell(month))}
      </div>
    </div>
  );
};

export default ProjectRow;
