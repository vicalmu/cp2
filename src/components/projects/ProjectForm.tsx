import React, { useState, useEffect } from 'react';
import { useProjects } from '../../context/ProjectsContext';
import { Project, ProjectFormData } from '../../data/types';
import { mockDepartments } from '../../data/mockData';
import '../../styles/projects.css';

interface ProjectFormProps {
  project?: Project | null;
  onClose: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onClose }) => {
  const { addProject, updateProject } = useProjects();
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 días
    departments: []
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!project;

  // Inicializar formulario con datos del proyecto si estamos editando
  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description,
        startDate: new Date(project.startDate),
        endDate: new Date(project.endDate),
        departments: project.departments.map(dept => ({
          departmentId: dept.departmentId,
          hours: dept.hours,
          monthlyDistribution: [...dept.monthlyDistribution]
        }))
      });
    }
  }, [project]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del proyecto es requerido';
    } else if (formData.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }

    // Validar descripción
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    } else if (formData.description.length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres';
    }

    // Validar fechas
    if (formData.startDate >= formData.endDate) {
      newErrors.endDate = 'La fecha de fin debe ser posterior a la fecha de inicio';
    }

    // Validar departamentos
    if (formData.departments.length === 0) {
      newErrors.departments = 'Debe asignar al menos un departamento';
    }

    // Validar que cada departamento tenga horas válidas
    formData.departments.forEach((dept, index) => {
      if (dept.hours <= 0) {
        newErrors[`dept_${index}_hours`] = 'Las horas deben ser mayores a 0';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ProjectFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleDepartmentChange = (index: number, field: keyof typeof formData.departments[0], value: any) => {
    const updatedDepartments = [...formData.departments];
    updatedDepartments[index] = {
      ...updatedDepartments[index],
      [field]: value
    };

    // Si cambian las horas, recalcular distribución mensual
    if (field === 'hours') {
      const totalHours = value;
      const months = getProjectDuration(formData.startDate, formData.endDate);
      const hoursPerMonth = Math.round(totalHours / months);
      const remainder = totalHours % months;
      
      const distribution = Array(12).fill(0);
      for (let i = 0; i < months; i++) {
        distribution[i] = hoursPerMonth + (i < remainder ? 1 : 0);
      }
      
      updatedDepartments[index].monthlyDistribution = distribution;
    }

    setFormData(prev => ({
      ...prev,
      departments: updatedDepartments
    }));
  };

  const addDepartment = () => {
    const months = getProjectDuration(formData.startDate, formData.endDate);
    const newDepartment = {
      departmentId: '',
      hours: 0,
      monthlyDistribution: Array(12).fill(0)
    };

    setFormData(prev => ({
      ...prev,
      departments: [...prev.departments, newDepartment]
    }));
  };

  const removeDepartment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      departments: prev.departments.filter((_, i) => i !== index)
    }));
  };

  const getProjectDuration = (startDate: Date, endDate: Date): number => {
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                  (endDate.getMonth() - startDate.getMonth());
    return months + 1;
  };

  const calculateTotalHours = (): number => {
    return formData.departments.reduce((total, dept) => total + dept.hours, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const projectData: Project = {
        id: project?.id || `proj-${Date.now()}`,
        name: formData.name.trim(),
        description: formData.description.trim(),
        startDate: formData.startDate,
        endDate: formData.endDate,
        totalHours: calculateTotalHours(),
        departments: formData.departments.map(dept => ({
          departmentId: dept.departmentId,
          hours: dept.hours,
          monthlyDistribution: dept.monthlyDistribution
        }))
      };

      if (isEditing) {
        updateProject(project.id, projectData);
      } else {
        addProject(projectData);
      }

      onClose();
    } catch (error) {
      console.error('Error guardando proyecto:', error);
      setErrors({ submit: 'Error al guardar el proyecto' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('¿Estás seguro de que quieres cancelar? Los cambios no se guardarán.')) {
      onClose();
    }
  };

  return (
    <div className="project-form-overlay">
      <div className="project-form-modal">
        <div className="form-header">
          <h2>{isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h2>
          <button 
            className="close-btn"
            onClick={handleCancel}
            aria-label="Cerrar formulario"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="project-form">
          {/* Información Básica */}
          <div className="form-section">
            <h3>📋 Información Básica</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Nombre del Proyecto *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Ej: Migración a Cloud"
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <span id="name-error" className="error-message">{errors.name}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Descripción *
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={`form-textarea ${errors.description ? 'error' : ''}`}
                  placeholder="Describe el proyecto y sus objetivos..."
                  rows={3}
                  aria-describedby={errors.description ? 'description-error' : undefined}
                />
                {errors.description && (
                  <span id="description-error" className="error-message">{errors.description}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate" className="form-label">
                  Fecha de Inicio *
                </label>
                <input
                  id="startDate"
                  type="date"
                  value={formData.startDate.toISOString().split('T')[0]}
                  onChange={(e) => handleInputChange('startDate', new Date(e.target.value))}
                  className="form-input"
                  aria-label="Fecha de inicio del proyecto"
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate" className="form-label">
                  Fecha de Fin *
                </label>
                <input
                  id="endDate"
                  type="date"
                  value={formData.endDate.toISOString().split('T')[0]}
                  onChange={(e) => handleInputChange('endDate', new Date(e.target.value))}
                  className={`form-input ${errors.endDate ? 'error' : ''}`}
                  aria-describedby={errors.endDate ? 'endDate-error' : undefined}
                />
                {errors.endDate && (
                  <span id="endDate-error" className="error-message">{errors.endDate}</span>
                )}
              </div>
            </div>

            <div className="form-info">
              <span>📅 Duración: {getProjectDuration(formData.startDate, formData.endDate)} meses</span>
            </div>
          </div>

          {/* Departamentos y Horas */}
          <div className="form-section">
            <div className="section-header">
              <h3>🏢 Departamentos y Horas</h3>
              <button 
                type="button"
                className="btn btn-outline btn-sm"
                onClick={addDepartment}
                aria-label="Agregar departamento"
              >
                ➕ Agregar Departamento
              </button>
            </div>

            {errors.departments && (
              <span className="error-message section-error">{errors.departments}</span>
            )}

            {formData.departments.map((dept, index) => (
              <div key={index} className="department-row">
                <div className="department-inputs">
                  <div className="form-group">
                    <label className="form-label">Departamento</label>
                    <select
                      value={dept.departmentId}
                      onChange={(e) => handleDepartmentChange(index, 'departmentId', e.target.value)}
                      className="form-select"
                      aria-label={`Seleccionar departamento ${index + 1}`}
                    >
                      <option value="">Seleccionar departamento...</option>
                      {mockDepartments.map(department => (
                        <option key={department.id} value={department.id}>
                          {department.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Horas Totales</label>
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      value={dept.hours}
                      onChange={(e) => handleDepartmentChange(index, 'hours', parseInt(e.target.value) || 0)}
                      className={`form-input hours-input ${errors[`dept_${index}_hours`] ? 'error' : ''}`}
                      aria-describedby={errors[`dept_${index}_hours`] ? `dept-${index}-hours-error` : undefined}
                    />
                    {errors[`dept_${index}_hours`] && (
                      <span id={`dept-${index}-hours-error`} className="error-message">
                        {errors[`dept_${index}_hours`]}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="remove-dept-btn"
                    onClick={() => removeDepartment(index)}
                    aria-label={`Eliminar departamento ${index + 1}`}
                  >
                    🗑️
                  </button>
                </div>

                {/* Distribución Mensual */}
                {dept.departmentId && dept.hours > 0 && (
                  <div className="monthly-distribution">
                    <label className="form-label">Distribución Mensual</label>
                    <div className="distribution-grid">
                      {dept.monthlyDistribution.map((hours, monthIndex) => (
                        <div key={monthIndex} className="month-input">
                          <label className="month-label">
                            {new Date(2024, monthIndex).toLocaleDateString('es-ES', { month: 'short' })}
                          </label>
                          <input
                            type="number"
                            min="0"
                            max={dept.hours}
                            value={hours}
                            onChange={(e) => {
                              const newDistribution = [...dept.monthlyDistribution];
                              newDistribution[monthIndex] = parseInt(e.target.value) || 0;
                              handleDepartmentChange(index, 'monthlyDistribution', newDistribution);
                            }}
                            className="form-input month-hours"
                            aria-label={`Horas para ${new Date(2024, monthIndex).toLocaleDateString('es-ES', { month: 'long' })}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Resumen */}
          <div className="form-summary">
            <div className="summary-item">
              <span className="summary-label">Total de Horas:</span>
              <span className="summary-value">{calculateTotalHours().toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Departamentos:</span>
              <span className="summary-value">{formData.departments.length}</span>
            </div>
          </div>

          {/* Errores Generales */}
          {errors.submit && (
            <div className="error-message general-error">{errors.submit}</div>
          )}

          {/* Acciones del Formulario */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : (isEditing ? 'Actualizar Proyecto' : 'Crear Proyecto')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
