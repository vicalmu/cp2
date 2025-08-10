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

  // Estado para manejar departamentos expandidos

  const getMonthsToShow = (): { month: number; year: number }[] => {
    // Determinar el año a mostrar basado en los proyectos
    const yearToShow = projects.length > 0 ? projects[0].startDate.getFullYear() : new Date().getFullYear();
    
    switch (viewMode) {
      case 'year':
        // Para vista anual, mostrar solo el año de los proyectos
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
        
        const months: { month: number; year: number }[] = [];
        
        // Si el rango cruza años, generar meses para cada año
        if (customRange.startYear !== customRange.endYear) {
          // Año de inicio
          for (let month = customRange.startMonth; month < 12; month++) {
            months.push({ month, year: customRange.startYear });
          }
          
          // Años intermedios (si los hay)
          for (let year = customRange.startYear + 1; year < customRange.endYear; year++) {
            for (let month = 0; month < 12; month++) {
              months.push({ month, year });
            }
          }
          
          // Año final
          for (let month = 0; month <= customRange.endMonth; month++) {
            months.push({ month, year: customRange.endYear });
          }
        } else {
          // Rango dentro del mismo año
          for (let month = customRange.startMonth; month <= customRange.endMonth; month++) {
            months.push({ month, year: customRange.startYear });
          }
        }
        
        return months;
      
      default:
        // Por defecto, mostrar solo el año de los proyectos
        return Array.from({ length: 12 }, (_, i) => ({ month: i, year: yearToShow }));
    }
  };

  const months = getMonthsToShow();
  const monthNames = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];
  
  // Meses calculados para mostrar

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

  const filteredDepartments = departments.filter(dept => 
    selectedDepartments.includes(dept.id)
  );

  return (
    <div className="gantt-table">
      {/* Header con meses */}
      <div className="gantt-header">
        <div className="header-info">
          <h3>Departamentos</h3>
          <span className="header-subtitle">
            {filteredDepartments.length} departamentos seleccionados
          </span>
        </div>
        <div className="header-months">
          {months.map((month, index) => {
            // Detectar si es el primer mes de un año (para agregar separador visual)
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
      </div>

      {/* Filas de departamentos y proyectos */}
      <div className="gantt-body">
        {filteredDepartments.map(department => {
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
