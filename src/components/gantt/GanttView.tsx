import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../context/ProjectsContext';
import { ViewMode, Quarter, TimeRange } from '../../data/types';
import { mockDepartments, calculateMonthlyCapacityForYear } from '../../data/mockData';
import TimeSelector from './TimeSelector';
import MultiSelectDropdown from './MultiSelectDropdown';
import GanttTable from './GanttTable';

const GanttView: React.FC = () => {
  const navigate = useNavigate();
  const { projects } = useProjects();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState<ViewMode>('year');
  const [selectedQuarter, setSelectedQuarter] = useState<Quarter | undefined>(undefined);
  const [customRange, setCustomRange] = useState<TimeRange>({
    startMonth: 0,
    endMonth: 11,
    startYear: currentYear,
    endYear: currentYear
  });
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(
    mockDepartments.map(dept => dept.id)
  );

  // Sincronizar customRange cuando cambie el año (solo si NO está en modo personalizado)
  useEffect(() => {
    if (viewMode !== 'custom') {
      setCustomRange(prev => ({
        ...prev,
        startYear: currentYear,
        endYear: currentYear
      }));
    }
  }, [currentYear, viewMode]);
  
  // Filtrar proyectos según el año seleccionado o rango personalizado
  const projectsForCurrentYear = useMemo(() => {
    if (viewMode === 'custom' && customRange) {
      // Para rangos personalizados, filtrar proyectos que estén en el rango
      return projects.filter(project => {
        const projectStartYear = project.startDate.getFullYear();
        const projectEndYear = project.endDate.getFullYear();
        
        // Verificar si el proyecto se solapa con el rango personalizado
        return (projectStartYear <= customRange.endYear && projectEndYear >= customRange.startYear);
      });
    } else {
      // Para vista anual o trimestral, filtrar proyectos del año seleccionado
      return projects.filter(project => {
        const projectStartYear = project.startDate.getFullYear();
        const projectEndYear = project.endDate.getFullYear();
        
        // Verificar si el proyecto está activo en el año seleccionado
        return (projectStartYear <= currentYear && projectEndYear >= currentYear);
      });
    }
  }, [projects, currentYear, viewMode, customRange]);

  const monthlyCapacityForCurrentYear = useMemo(() => {
    if (viewMode === 'custom' && customRange) {
      // Para rangos personalizados, calcular capacidad para todos los años involucrados
      const years = [];
      for (let year = customRange.startYear; year <= customRange.endYear; year++) {
        years.push(year);
      }
      
      // Calcular capacidad para cada año
      const allCapacities = years.flatMap(year => calculateMonthlyCapacityForYear(year));
      return allCapacities;
    } else {
      // Para vista anual o trimestral, usar solo el año seleccionado
      return calculateMonthlyCapacityForYear(currentYear);
    }
  }, [currentYear, viewMode, customRange]);

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    if (mode === 'quarter') {
      setSelectedQuarter(1);
    } else {
      setSelectedQuarter(undefined);
    }
  };

  const handleYearChange = (year: number) => {
    setCurrentYear(year);
  };

  const handleQuarterChange = (quarter: Quarter) => {
    setSelectedQuarter(quarter);
  };

  const handleCustomRangeChange = (range: TimeRange) => {
    setCustomRange(range);
  };

  return (
    <div className="gantt-view">
      <div className="gantt-header-section">
        <div className="gantt-header-content">
          <div className="gantt-header-left">
            <button 
              onClick={() => navigate('/')}
              className="gantt-back-button"
              aria-label="Volver al inicio"
            >
              <span className="back-icon">←</span>
              <span className="back-text">Inicio</span>
            </button>
            <h1 className="gantt-header-title">Modo Gantt - Capacidad de Departamentos</h1>
          </div>
          <div className="gantt-header-right">
            <button 
              onClick={() => navigate('/proyectos')}
              className="gantt-projects-button"
              aria-label="Gestionar proyectos"
            >
              📋 Gestionar Proyectos
            </button>
          </div>
        </div>
      </div>

      <div className="gantt-controls">
        <div className="controls-main-row">
          <div className="controls-left">
            <TimeSelector
              currentYear={currentYear}
              viewMode={viewMode}
              selectedQuarter={selectedQuarter}
              customRange={customRange}
              onViewModeChange={handleViewModeChange}
              onYearChange={handleYearChange}
              onQuarterChange={handleQuarterChange}
              onCustomRangeChange={handleCustomRangeChange}
            />
          </div>
          <div className="controls-right">
            <MultiSelectDropdown
              departments={mockDepartments}
              selectedDepartments={selectedDepartments}
              onSelectionChange={setSelectedDepartments}
            />
          </div>
        </div>
      </div>

      <div className="gantt-content">
        <GanttTable
          departments={mockDepartments}
          projects={projectsForCurrentYear}
          monthlyCapacities={monthlyCapacityForCurrentYear}
          viewMode={viewMode}
          selectedQuarter={selectedQuarter}
          customRange={customRange}
          selectedDepartments={selectedDepartments}
        />
      </div>

      {/* Resumen de capacidad al final */}
      <div className="capacity-summary">
        <div className="summary-card">
          <h3>Resumen de Capacidad</h3>
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-label">Departamentos activos:</span>
              <span className="stat-value">{selectedDepartments.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total de personas:</span>
              <span className="stat-value">
                {mockDepartments
                  .filter(dept => selectedDepartments.includes(dept.id))
                  .reduce((total, dept) => total + dept.people.length, 0)
                }
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Capacidad total anual:</span>
              <span className="stat-value">
                {mockDepartments
                  .filter(dept => selectedDepartments.includes(dept.id))
                  .reduce((total, dept) => total + dept.maxCapacityPerYear, 0)
                  .toLocaleString()
                }h
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttView;
