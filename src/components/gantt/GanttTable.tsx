import React, { useState } from 'react';
import { Department, Project, MonthlyCapacity, ViewMode, Quarter, TimeRange } from '../../data/types';
import DepartmentRow from './DepartmentRow';
import ProjectRow from './ProjectRow';

interface GanttTableProps {
  departments: Department[];
  projects: Project[];
  monthlyCapacities: MonthlyCapacity[];
  viewMode: ViewMode;
  selectedQuarter?: Quarter;
  customRange?: TimeRange;
  selectedDepartments: string[];
}

const GanttTable: React.FC<GanttTableProps> = ({
  departments,
  projects,
  monthlyCapacities,
  viewMode,
  selectedQuarter,
  customRange,
  selectedDepartments
}) => {
  const [expandedDepartments, setExpandedDepartments] = useState<Set<string>>(new Set());

  const getMonthsToShow = (): { month: number; year: number }[] => {
    // Determinar el año a mostrar basado en los proyectos
    const yearToShow = projects.length > 0 ? projects[0].startDate.getFullYear() : new Date().getFullYear();
    
    switch (viewMode) {
      case 'year':
        // Para vista anual, mostrar exactamente 12 meses del año
        return Array.from({ length: 12 }, (_, i) => ({ month: i, year: yearToShow }));
      
      case 'quarter':
        if (!selectedQuarter) {
          // Si no hay trimestre seleccionado, mostrar solo el año de los proyectos
          return Array.from({ length: 12 }, (_, i) => ({ month: i, year: yearToShow }));
        }
        
        // Para trimestre específico, mostrar solo ese trimestre del año de los proyectos
        const startMonth = (selectedQuarter - 1) * 3;
        return Array.from({ length: 3 }, (_, i) => ({ month: startMonth + i, year: yearToShow }));
      
      case 'custom':
        if (!customRange) {
          // Si no hay rango personalizado, mostrar solo el año de los proyectos
          return Array.from({ length: 12 }, (_, i) => ({ month: i, year: yearToShow }));
        }
        
        // Para rangos personalizados, siempre mostrar 12 meses para mantener la estructura
        // Si el rango cruza años, usar el año de inicio como base
        const baseYear = customRange.startYear;
        return Array.from({ length: 12 }, (_, i) => ({ month: i, year: baseYear }));
      
      default:
        // Por defecto, mostrar exactamente 12 meses del año
        return Array.from({ length: 12 }, (_, i) => ({ month: i, year: yearToShow }));
    }
  };

  const months = getMonthsToShow();
  const monthNames = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];
  
  // Función para obtener el nombre del mes con el año si es necesario
  const getMonthDisplayName = (monthData: { month: number; year: number }) => {
    const monthName = monthNames[monthData.month];
    const yearToShow = projects.length > 0 ? projects[0].startDate.getFullYear() : new Date().getFullYear();
    
    // Solo mostrar el año si no es el año de los proyectos o si estamos en modo personalizado
    if (viewMode === 'custom' && monthData.year !== yearToShow) {
      return `${monthName} ${monthData.year}`;
    }
    
    return monthName;
  };

  const toggleDepartment = (departmentId: string) => {
    const newExpanded = new Set(expandedDepartments);
    if (newExpanded.has(departmentId)) {
      newExpanded.delete(departmentId);
    } else {
      newExpanded.add(departmentId);
    }
    setExpandedDepartments(newExpanded);
  };

  const filteredDepartments = departments.filter((dept: Department) => 
    selectedDepartments.includes(dept.id)
  );

  return (
    <div className="gantt-table">
      <div className="gantt-table-content">
        {/* Header con meses como columnas */}
        <div className="gantt-table-header-row">
          <div className="header-info">
            <h3>Departamentos</h3>
            <span className="header-subtitle">
              {filteredDepartments.length} departamentos seleccionados
            </span>
          </div>
          {months.map((month, index) => {
            const isYearStart = month.month === 0;
            const isFirstMonth = index === 0;
            
            return (
              <div 
                key={`${month.month}-${month.year}`} 
                className="month-header"
                data-year-separator={isYearStart && !isFirstMonth ? "true" : "false"}
              >
                <span className="month-name">{getMonthDisplayName(month)}</span>
                <span className="month-year">{month.year}</span>
              </div>
            );
          })}
        </div>

        {/* Filas de departamentos y proyectos */}
        {filteredDepartments.map((department: Department) => {
          const isExpanded = expandedDepartments.has(department.id);
          const departmentProjects = projects.filter(project =>
            project.departments.some(d => d.departmentId === department.id)
          );

          return (
            <div key={department.id} className="department-section">
              <DepartmentRow
                department={department}
                monthlyCapacities={monthlyCapacities}
                months={months}
                onToggleProjects={toggleDepartment}
                isExpanded={isExpanded}
              />
              
              {/* Proyectos del departamento */}
              {isExpanded && departmentProjects.map(project => (
                <ProjectRow
                  key={`${department.id}-${project.id}`}
                  project={project}
                  months={months}
                  departmentId={department.id}
                  isVisible={true}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GanttTable;
