import React, { useState } from 'react';
import { ProjectFilters as ProjectFiltersType } from '../../data/types';
import { PROJECT_STATUSES, PROJECT_PRIORITIES } from '../../data/types';
import { mockDepartments } from '../../data/mockData';
import '../../styles/projects.css';

interface ProjectFiltersProps {
  filters: ProjectFiltersType;
  onFiltersChange: (filters: ProjectFiltersType) => void;
  onReset: () => void;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({ filters, onFiltersChange, onReset }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof ProjectFiltersType, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleSearchChange = (search: string) => {
    handleFilterChange('search', search);
  };

  const handleDepartmentChange = (departmentId: string, checked: boolean) => {
    const newDepartments = checked
      ? [...filters.departments, departmentId]
      : filters.departments.filter(id => id !== departmentId);
    handleFilterChange('departments', newDepartments);
  };

  const handleDateRangeChange = (field: 'start' | 'end', value: string | null) => {
    const dateValue = value ? new Date(value) : null;
    handleFilterChange('dateRange', {
      ...filters.dateRange,
      [field]: dateValue
    });
  };

  const handleStatusChange = (statusId: string, checked: boolean) => {
    const newStatuses = checked
      ? [...filters.status, statusId]
      : filters.status.filter(id => id !== statusId);
    handleFilterChange('status', newStatuses);
  };

  const handlePriorityChange = (priorityId: string, checked: boolean) => {
    const newPriorities = checked
      ? [...filters.priority, priorityId]
      : filters.priority.filter(id => id !== priorityId);
    handleFilterChange('priority', newPriorities);
  };

  const handleHoursRangeChange = (field: 'min' | 'max', value: number) => {
    handleFilterChange('hoursRange', {
      ...filters.hoursRange,
      [field]: value
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.departments.length > 0) count++;
    if (filters.dateRange.start || filters.dateRange.end) count++;
    if (filters.status.length > 0) count++;
    if (filters.priority.length > 0) count++;
    if (filters.hoursRange.min > 0 || filters.hoursRange.max < 10000) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="project-filters">
      <div className="filters-header">
        <h3>Filtros</h3>
        <button 
          className="expand-toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? 'Contraer filtros' : 'Expandir filtros'}
        >
          {isExpanded ? '▼' : '▶'}
        </button>
        {activeFiltersCount > 0 && (
          <span className="active-filters-badge">{activeFiltersCount}</span>
        )}
      </div>

      <div className={`filters-content ${isExpanded ? 'expanded' : ''}`}>
        {/* Búsqueda */}
        <div className="filter-section">
          <label className="filter-label">🔍 Búsqueda</label>
          <input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="filter-input"
            aria-label="Buscar proyectos"
          />
        </div>

        {/* Departamentos */}
        <div className="filter-section">
          <label className="filter-label">🏢 Departamentos</label>
          <div className="filter-checkboxes">
            {mockDepartments.map(department => (
              <label key={department.id} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.departments.includes(department.id)}
                  onChange={(e) => handleDepartmentChange(department.id, e.target.checked)}
                  aria-label={`Filtrar por departamento ${department.name}`}
                />
                <span className="checkbox-label">{department.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rango de Fechas */}
        <div className="filter-section">
          <label className="filter-label">📅 Rango de Fechas</label>
          <div className="date-range-inputs">
            <div className="date-input-group">
              <label className="date-label">Desde:</label>
              <input
                type="date"
                value={filters.dateRange.start?.toISOString().split('T')[0] || ''}
                onChange={(e) => handleDateRangeChange('start', e.target.value || null)}
                className="filter-input"
                aria-label="Fecha de inicio"
              />
            </div>
            <div className="date-input-group">
              <label className="date-label">Hasta:</label>
              <input
                type="date"
                value={filters.dateRange.end?.toISOString().split('T')[0] || ''}
                onChange={(e) => handleDateRangeChange('end', e.target.value || null)}
                className="filter-input"
                aria-label="Fecha de fin"
              />
            </div>
          </div>
        </div>

        {/* Estados */}
        <div className="filter-section">
          <label className="filter-label">📊 Estados</label>
          <div className="filter-checkboxes">
            {PROJECT_STATUSES.map(status => (
              <label key={status.id} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.status.includes(status.id)}
                  onChange={(e) => handleStatusChange(status.id, e.target.checked)}
                  aria-label={`Filtrar por estado ${status.name}`}
                />
                <span className="checkbox-label">
                  <span 
                    className="status-color-indicator"
                    style={{ backgroundColor: status.color }}
                  ></span>
                  {status.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Prioridades */}
        <div className="filter-section">
          <label className="filter-label">🎯 Prioridades</label>
          <div className="filter-checkboxes">
            {PROJECT_PRIORITIES.map(priority => (
              <label key={priority.id} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.priority.includes(priority.id)}
                  onChange={(e) => handlePriorityChange(priority.id, e.target.checked)}
                  aria-label={`Filtrar por prioridad ${priority.name}`}
                />
                <span className="checkbox-label">
                  <span 
                    className="priority-color-indicator"
                    style={{ backgroundColor: priority.color }}
                  ></span>
                  {priority.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Rango de Horas */}
        <div className="filter-section">
          <label className="filter-label">⏱️ Rango de Horas</label>
          <div className="hours-range-inputs">
            <div className="hours-input-group">
              <label className="hours-label">Mín:</label>
              <input
                type="number"
                min="0"
                max="10000"
                value={filters.hoursRange.min}
                onChange={(e) => handleHoursRangeChange('min', parseInt(e.target.value) || 0)}
                className="filter-input hours-input"
                aria-label="Horas mínimas"
              />
            </div>
            <div className="hours-input-group">
              <label className="hours-label">Máx:</label>
              <input
                type="number"
                min="0"
                max="10000"
                value={filters.hoursRange.max}
                onChange={(e) => handleHoursRangeChange('max', parseInt(e.target.value) || 10000)}
                className="filter-input hours-input"
                aria-label="Horas máximas"
              />
            </div>
          </div>
        </div>

        {/* Acciones de Filtros */}
        <div className="filter-actions">
          <button 
            className="btn btn-outline btn-sm"
            onClick={onReset}
            aria-label="Limpiar todos los filtros"
          >
            🗑️ Limpiar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilters;
