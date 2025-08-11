import React, { useState, useRef, useEffect } from 'react';
import { Department } from '../../data/types';

interface MultiSelectDropdownProps {
  departments: Department[];
  selectedDepartments: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  departments,
  selectedDepartments,
  onSelectionChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectAll = () => {
    onSelectionChange(departments.map(dept => dept.id));
  };

  const handleDeselectAll = () => {
    onSelectionChange([]);
  };

  const handleDepartmentToggle = (departmentId: string) => {
    const newSelection = selectedDepartments.includes(departmentId)
      ? selectedDepartments.filter(id => id !== departmentId)
      : [...selectedDepartments, departmentId];
    onSelectionChange(newSelection);
  };

  const selectedCount = selectedDepartments.length;
  const totalCount = departments.length;

  // Texto del botón principal
  const getButtonText = () => {
    if (selectedCount === 0) return 'Seleccionar departamentos';
    if (selectedCount === totalCount) return `Todos (${totalCount})`;
    if (selectedCount === 1) {
      const dept = departments.find(d => d.id === selectedDepartments[0]);
      return dept ? dept.name : '1 departamento';
    }
    return `${selectedCount} de ${totalCount}`;
  };

  return (
    <div className="multi-select-dropdown compact" ref={dropdownRef}>
      <button
        className="dropdown-trigger compact"
        onClick={handleToggle}
        type="button"
        title="Filtrar departamentos"
      >
        <span className="dropdown-text">{getButtonText()}</span>
        <svg 
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="dropdown-menu compact">
          <div className="dropdown-header">
            <h4>Departamentos</h4>
            <div className="dropdown-actions">
              <button
                className="action-btn compact select-all"
                onClick={handleSelectAll}
                type="button"
              >
                Todos
              </button>
              <button
                className="action-btn compact deselect-all"
                onClick={handleDeselectAll}
                type="button"
              >
                Limpiar
              </button>
            </div>
          </div>

          <div className="dropdown-items">
            {departments.map((department) => (
              <label key={department.id} className="dropdown-item">
                <input
                  type="checkbox"
                  checked={selectedDepartments.includes(department.id)}
                  onChange={() => handleDepartmentToggle(department.id)}
                />
                <span className="item-text">{department.name}</span>
                <span className="item-count">({department.people.length})</span>
              </label>
            ))}
          </div>

          <div className="dropdown-footer">
            <span className="selection-summary">
              {selectedCount} de {totalCount} departamentos
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
