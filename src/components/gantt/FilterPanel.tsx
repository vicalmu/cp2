import React from 'react';
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
  const allSelected = selectedDepartments.length === departments.length;
  const someSelected = selectedDepartments.length > 0 && selectedDepartments.length < departments.length;

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filtrar Departamentos</h3>
        <div className="filter-actions">
          <button
            className={`filter-btn ${allSelected ? 'active' : ''}`}
            onClick={onSelectAll}
          >
            Seleccionar Todos
          </button>
          <button
            className={`filter-btn ${!someSelected && !allSelected ? 'active' : ''}`}
            onClick={onDeselectAll}
          >
            Deseleccionar Todos
          </button>
        </div>
      </div>

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

      <div className="filter-summary">
        <span className="selected-count">
          {selectedDepartments.length} de {departments.length} departamentos seleccionados
        </span>
      </div>
    </div>
  );
};

export default FilterPanel;
