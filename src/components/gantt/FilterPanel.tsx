import React, { useState } from 'react';
import { Department } from '../../data/types';

interface FilterPanelProps {
  departments: Department[];
  selectedDepartments: string[];
  onDepartmentToggle: (departmentId: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  departments,
  selectedDepartments,
  onDepartmentToggle,
  onSelectAll,
  onDeselectAll
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const allSelected = selectedDepartments.length === departments.length;
  const someSelected = selectedDepartments.length > 0 && selectedDepartments.length < departments.length;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="filter-panel compact">
      <div className="filter-summary-row">
        <div className="filter-info">
          <span className="filter-label">Departamentos:</span>
          <span className="filter-count">
            {selectedDepartments.length} de {departments.length} seleccionados
          </span>
        </div>
        
        <div className="filter-actions">
          <button
            className={`filter-btn compact ${allSelected ? 'active' : ''}`}
            onClick={onSelectAll}
            title="Seleccionar todos los departamentos"
          >
            Todos
          </button>
          <button
            className={`filter-btn compact ${!someSelected && !allSelected ? 'active' : ''}`}
            onClick={onDeselectAll}
            title="Deseleccionar todos los departamentos"
          >
            Ninguno
          </button>
          <button
            className="expand-toggle-btn"
            onClick={handleToggle}
            title={isExpanded ? 'Contraer filtros' : 'Expandir filtros'}
          >
            {isExpanded ? '▼' : '▶'}
          </button>
        </div>
      </div>

      {/* Filtros expandibles solo cuando se necesiten */}
      {isExpanded && (
        <div className="department-filters-expanded">
          <div className="department-filters">
            {departments.map(department => (
              <label key={department.id} className="department-filter-item">
                <input
                  type="checkbox"
                  checked={selectedDepartments.includes(department.id)}
                  onChange={() => onDepartmentToggle(department.id)}
                />
                <span className="department-name">{department.name}</span>
                <span className="department-count">
                  ({department.people.length} personas)
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
