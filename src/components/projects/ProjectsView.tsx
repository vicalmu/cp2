import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../context/ProjectsContext';
import { mockDepartments } from '../../data/mockData';
import { Project, ViewMode, Quarter, TimeRange } from '../../data/types';
import TimeSelector from '../gantt/TimeSelector';
import MultiSelectDropdown from '../gantt/MultiSelectDropdown';
import '../../styles/projects.css';

const ProjectsView: React.FC = () => {
  const navigate = useNavigate();
  const { projects, loading } = useProjects();
  
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
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  // Filtrar proyectos
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Filtro de búsqueda
      if (searchTerm && !project.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Filtro de departamentos
      if (selectedDepartments.length > 0 && 
          !project.departments.some(dept => selectedDepartments.includes(dept.departmentId))) {
        return false;
      }
      
      return true;
    });
  }, [projects, searchTerm, selectedDepartments]);

  // Generar meses del año
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const monthAbbr = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];

  const toggleProjectExpansion = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

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

  // JavaScript sticky behavior - con cálculo dinámico de posiciones
  useEffect(() => {
    const handleScroll = () => {
      const filtersHeader = document.getElementById('stickyFilters');
      const monthsHeader = document.getElementById('stickyMonths');
      
      if (filtersHeader && monthsHeader) {
        const stickyFilters = filtersHeader.offsetTop;
        const stickyMonths = monthsHeader.offsetTop;
        
        // Filtros sticky
        if (window.pageYOffset > stickyFilters) {
          filtersHeader.classList.add('sticky1');
          
          // Calcular posición dinámica para el header de meses
          const filtersHeight = filtersHeader.offsetHeight;
          monthsHeader.style.top = `${filtersHeight}px`;
        } else {
          filtersHeader.classList.remove('sticky1');
          monthsHeader.style.top = '';
        }
        
        // Header de meses sticky
        if (window.pageYOffset > stickyMonths) {
          monthsHeader.classList.add('sticky2');
        } else {
          monthsHeader.classList.remove('sticky2');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="projects-container">
        <div className="projects-loading">
          <div className="loading-spinner"></div>
          <p>Cargando proyectos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-container">
      {/* Header compacto */}
      <div className="projects-header">
        <div className="header-content">
          <div className="header-left">
            <button 
              onClick={() => navigate('/')}
              className="back-button"
              aria-label="Volver al inicio"
            >
              <span className="back-icon">←</span>
              <span className="back-text">Inicio</span>
            </button>
            <div className="header-title-section">
              <h1 className="main-title">Gestión de Proyectos</h1>
              <p className="subtitle">Vista tabular avanzada con análisis de capacidad</p>
            </div>
          </div>
          <div className="header-right">
            <button 
              onClick={() => navigate('/gantt')}
              className="gantt-button"
              aria-label="Ver vista Gantt"
            >
              <span className="button-icon">📊</span>
              <span className="button-text">Vista Gantt</span>
            </button>
          </div>
        </div>
      </div>

      {/* Header sticky (barra de filtros) */}
      <div className="header" id="stickyFilters">
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
              
              <div className="filter-group">
                <label htmlFor="search-input">Buscar:</label>
                <input
                  id="search-input"
                  type="text"
                  placeholder="Nombre del proyecto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="filter-input"
                />
              </div>
            </div>
            
            <div className="controls-right">
              <MultiSelectDropdown
                departments={mockDepartments}
                selectedDepartments={selectedDepartments}
                onSelectionChange={setSelectedDepartments}
              />
              
                             <button 
                 onClick={() => {
                   setSearchTerm('');
                   setSelectedDepartments(mockDepartments.map(dept => dept.id));
                 }}
                 className="btn btn-outline"
               >
                 🔄 Limpiar
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Header de meses */}
      <div className="table-header" id="stickyMonths">
        <div className="project-column-header">
          <span className="header-title">Proyectos</span>
          <span className="header-subtitle">Información y controles</span>
        </div>
        {months.map((month, index) => (
          <div key={index} className="month-column-header">
            <span className="month-name">{month}</span>
            <span className="month-abbr">{monthAbbr[index]}</span>
          </div>
        ))}
      </div>

      {/* Tabla de proyectos */}
      <div className="projects-table-wrapper">
        <div className="table-container">
          {/* Filas de proyectos */}
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-section">
              {/* Fila principal del proyecto */}
              <div className="project-main-row">
                <div className="project-info-cell">
                  <div className="project-header">
                    <div className="project-title-section">
                      <h3 className="project-name">{project.name}</h3>
                      <p className="project-description">{project.description}</p>
                    </div>
                    <div className="project-meta">
                      <div className="meta-item">
                        <span className="meta-icon">⏱️</span>
                        <span className="meta-value">{project.totalHours.toLocaleString()}h</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-icon">📅</span>
                        <span className="meta-value">
                          {project.startDate.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })} - {project.endDate.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleProjectExpansion(project.id)}
                    className="expand-button"
                    aria-label={expandedProjects.has(project.id) ? 'Contraer proyecto' : 'Expandir proyecto'}
                  >
                    <span className={`expand-icon ${expandedProjects.has(project.id) ? 'expanded' : ''}`}>
                      {expandedProjects.has(project.id) ? '▼' : '▶'}
                    </span>
                    <span className="expand-text">
                      {expandedProjects.has(project.id) ? 'Ocultar detalles' : 'Ver departamentos'}
                    </span>
                  </button>
                </div>

                {/* Celdas de meses para el proyecto principal */}
                {months.map((month, monthIndex) => {
                  const totalHours = project.departments.reduce((total, dept) => {
                    return total + (dept.monthlyDistribution[monthIndex] || 0);
                  }, 0);

                  return (
                    <div key={monthIndex} className="month-cell project-month-cell">
                      {totalHours > 0 ? (
                        <div className="project-month-info">
                          <span className="total-hours">{totalHours}h</span>
                          <span className="department-count">
                            {project.departments.filter(dept => 
                              dept.monthlyDistribution[monthIndex] > 0
                            ).length} dept.
                          </span>
                        </div>
                      ) : (
                        <span className="no-data">-</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Filas expandidas de departamentos */}
              {expandedProjects.has(project.id) && (
                <div className="departments-section">
                  {project.departments.map((dept) => {
                    const deptInfo = mockDepartments.find(d => d.id === dept.departmentId);
                    return (
                      <div key={dept.departmentId} className="department-row">
                        <div className="department-info-cell">
                          <div className="department-header">
                            <span className="department-name">{deptInfo?.name || dept.departmentId}</span>
                            <span className="department-total">{dept.hours.toLocaleString()}h total</span>
                          </div>
                        </div>

                        {/* Celdas de meses para el departamento */}
                        {months.map((month, monthIndex) => {
                          const monthHours = dept.monthlyDistribution[monthIndex] || 0;
                          const deptCapacity = deptInfo?.maxCapacityPerMonth || 1;
                          const percentage = Math.round((monthHours / deptCapacity) * 100);

                          return (
                            <div key={monthIndex} className="month-cell department-month-cell">
                              {monthHours > 0 ? (
                                <div className="department-month-data">
                                  <div className="hours-display">
                                    <span className="hours-value">{monthHours}h</span>
                                    <span className="percentage-badge">{percentage}%</span>
                                  </div>
                                  <div className="capacity-bar">
                                    <div 
                                      className="capacity-fill" 
                                      style={{ width: `${Math.min(percentage, 100)}%` }}
                                    ></div>
                                  </div>
                                </div>
                              ) : (
                                <span className="no-data">-</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Estilos CSS inline para sticky behavior - simple y funcional como /test */}
      <style>{`
        .sticky1 {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          z-index: 1000 !important;
          background: white !important;
        }
        
        .sticky2 {
          position: fixed !important;
          left: 0 !important;
          width: 100% !important;
          z-index: 1000 !important;
          background: white !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
        }
        
        /* Ajustar contenido cuando los headers están sticky */
        .sticky1 ~ .table-header {
          margin-top: 80px !important;
        }
        
        .sticky1 + .sticky2 ~ .projects-table-wrapper {
          margin-top: 160px !important;
        }
      `}</style>
    </div>
  );
};

export default ProjectsView;
