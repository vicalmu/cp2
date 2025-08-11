import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ViewMode, Quarter, TimeRange } from '../../data/types';
import { mockDepartments, generateProjectsForYear, calculateMonthlyCapacityForYear } from '../../data/mockData';
import TimeSelector from './TimeSelector';
import MultiSelectDropdown from './MultiSelectDropdown';
import GanttTable from './GanttTable';

const GanttView: React.FC = () => {
  const navigate = useNavigate();
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

  // Sincronizar customRange cuando cambie el año
  useEffect(() => {
    setCustomRange(prev => ({
      ...prev,
      startYear: currentYear,
      endYear: currentYear
    }));
  }, [currentYear]);
  
  // Generar datos dinámicamente para el año seleccionado o rango personalizado
  const projectsForCurrentYear = useMemo(() => {
    if (viewMode === 'custom' && customRange) {
      // Para rangos personalizados, generar datos para todos los años involucrados
      const years = [];
      for (let year = customRange.startYear; year <= customRange.endYear; year++) {
        years.push(year);
      }
      
      // Generar proyectos para cada año y combinar
      const allProjects = years.flatMap(year => generateProjectsForYear(year));
      return allProjects;
    } else {
      // Para vista anual o trimestral, usar solo el año seleccionado
      return generateProjectsForYear(currentYear);
    }
  }, [currentYear, viewMode, customRange]);

  const monthlyCapacityForCurrentYear = useMemo(() => {
    if (viewMode === 'custom' && customRange) {
      // Para rangos personalizados, generar capacidad para todos los años involucrados
      const years = [];
      for (let year = customRange.startYear; year <= customRange.endYear; year++) {
        years.push(year);
      }
      
      // Generar capacidad para cada año y combinar
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
