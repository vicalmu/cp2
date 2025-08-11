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
        
        // Para rangos personalizados, mostrar solo los meses del rango seleccionado
        const monthsToShow = [];
        let currentDate = new Date(customRange.startYear, customRange.startMonth);
        const endDate = new Date(customRange.endYear, customRange.endMonth);
        
        while (currentDate <= endDate) {
          monthsToShow.push({
            month: currentDate.getMonth(),
            year: currentDate.getFullYear()
          });
          
          // Avanzar al siguiente mes
          currentDate.setMonth(currentDate.getMonth() + 1);
        }
        
        return monthsToShow;
      
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
    
    // En modo personalizado, siempre mostrar el año para mayor claridad
    if (viewMode === 'custom') {
      return `${monthName} ${monthData.year}`;
    }
    
    // Para otros modos, solo mostrar el año si es diferente al año base
    const baseYear = projects.length > 0 ? projects[0].startDate.getFullYear() : new Date().getFullYear();
    if (monthData.year !== baseYear) {
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

  // Establecer la variable CSS para el número de meses
  React.useEffect(() => {
    const monthCount = months.length.toString();
    document.documentElement.style.setProperty('--month-count', monthCount);
    console.log('🔧 CSS Variable --month-count set to:', monthCount, 'months');
    console.log('🔧 Months array:', months);
    
    // Verificar que la variable se estableció correctamente
    const computedValue = getComputedStyle(document.documentElement).getPropertyValue('--month-count');
    console.log('🔧 CSS Variable computed value:', computedValue);
    
    // Verificar que se aplica a las celdas
    const projectCells = document.querySelector('.project-cells');
    if (projectCells) {
      const computedStyle = getComputedStyle(projectCells);
      console.log('🔧 Project cells grid-template-columns:', computedStyle.gridTemplateColumns);
      console.log('🔧 Project cells min-width:', computedStyle.minWidth);
    }
  }, [months]);

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
