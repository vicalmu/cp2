import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectsContext';
import { Project } from '../../data/types';
import { mockDepartments } from '../../data/mockData';
import { PROJECT_STATUSES, PROJECT_PRIORITIES } from '../../data/types';
import '../../styles/projects.css';

interface ProjectListProps {
  projects: Project[];
  onEditProject: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onEditProject }) => {
  const { deleteProject } = useProjects();
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [sortBy, setSortBy] = useState<'name' | 'startDate' | 'totalHours'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Debug: verificar que las props lleguen correctamente
  console.log('🔍 ProjectList - props recibidas:', { projects, onEditProject });
  console.log('🔍 ProjectList - deleteProject function:', deleteProject);

  const handleDeleteProject = (projectId: string, projectName: string) => {
    console.log('🔍 ProjectList - handleDeleteProject llamado:', { projectId, projectName });
    if (window.confirm(`¿Estás seguro de que quieres eliminar el proyecto "${projectName}"?`)) {
      console.log('🔍 ProjectList - Confirmado eliminar proyecto:', projectId);
      deleteProject(projectId);
    }
  };

  const handleSort = (field: 'name' | 'startDate' | 'totalHours') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedProjects = [...projects].sort((a, b) => {
    let aValue: any, bValue: any;

    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'startDate':
        aValue = a.startDate.getTime();
        bValue = b.startDate.getTime();
        break;
      case 'totalHours':
        aValue = a.totalHours;
        bValue = b.totalHours;
        break;
      default:
        return 0;
    }

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const getDepartmentNames = (departmentIds: string[]) => {
    return departmentIds.map(id => 
      mockDepartments.find(dept => dept.id === id)?.name || id
    ).join(', ');
  };

  const getProjectDuration = (startDate: Date, endDate: Date) => {
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                  (endDate.getMonth() - startDate.getMonth());
    return months + 1;
  };

  const getProjectStatus = (project: Project): typeof PROJECT_STATUSES[0] => {
    const now = new Date();
    if (project.startDate > now) return PROJECT_STATUSES[2]; // Planificado
    if (project.endDate < now) return PROJECT_STATUSES[1]; // Completado
    return PROJECT_STATUSES[0]; // Activo
  };

  if (projects.length === 0) {
    return (
      <div className="projects-empty">
        <div className="empty-icon">📋</div>
        <h3>No hay proyectos</h3>
        <p>Comienza creando tu primer proyecto para organizar tu capacidad</p>
      </div>
    );
  }

  return (
    <div className="project-list-container">
      {/* Controles de Vista */}
      <div className="project-list-controls">
        <div className="view-mode-toggle">
          <button 
            className={`view-mode-btn ${viewMode === 'cards' ? 'active' : ''}`}
            onClick={() => setViewMode('cards')}
            aria-label="Vista de tarjetas"
          >
            🎴 Tarjetas
          </button>
          <button 
            className={`view-mode-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
            aria-label="Vista de tabla"
          >
            📊 Tabla
          </button>
        </div>

        <div className="sort-controls">
          <span>Ordenar por:</span>
          <select 
            value={sortBy}
            onChange={(e) => handleSort(e.target.value as any)}
            aria-label="Campo de ordenación"
          >
            <option value="name">Nombre</option>
            <option value="startDate">Fecha de inicio</option>
            <option value="totalHours">Horas totales</option>
          </select>
          <button 
            className="sort-order-btn"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            aria-label={`Orden ${sortOrder === 'asc' ? 'descendente' : 'ascendente'}`}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Contador de Proyectos */}
      <div className="project-count">
        <span>{projects.length} proyecto{projects.length !== 1 ? 's' : ''}</span>
        {projects.length !== sortedProjects.length && (
          <span className="filtered-count">
            (mostrando {sortedProjects.length} filtrado{sortedProjects.length !== 1 ? 's' : ''})
          </span>
        )}
      </div>

      {/* Lista de Proyectos */}
      {viewMode === 'cards' ? (
        <div className="project-cards-grid">
          {sortedProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-card-header">
                <div className="project-status">
                  <span 
                    className="status-indicator"
                    style={{ backgroundColor: getProjectStatus(project).color }}
                  >
                    {getProjectStatus(project).icon}
                  </span>
                  <span className="status-text">{getProjectStatus(project).name}</span>
                </div>
                <div className="project-actions">
                  <button 
                    className="action-btn edit-btn"
                    onClick={() => {
                      console.log('🔍 ProjectList - Botón editar clickeado:', project);
                      onEditProject(project);
                    }}
                    aria-label={`Editar proyecto ${project.name}`}
                  >
                    ✏️
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => handleDeleteProject(project.id, project.name)}
                    aria-label={`Eliminar proyecto ${project.name}`}
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div className="project-card-content">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-meta">
                  <div className="meta-item">
                    <span className="meta-label">📅 Duración:</span>
                    <span className="meta-value">{getProjectDuration(project.startDate, project.endDate)} meses</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">⏱️ Horas:</span>
                    <span className="meta-value">{project.totalHours.toLocaleString()}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">🏢 Departamentos:</span>
                    <span className="meta-value">
                      {getDepartmentNames(project.departments.map(d => d.departmentId))}
                    </span>
                  </div>
                </div>

                <div className="project-timeline">
                  <div className="timeline-item">
                    <span className="timeline-label">Inicio:</span>
                    <span className="timeline-date">
                      {project.startDate.toLocaleDateString('es-ES', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="timeline-item">
                    <span className="timeline-label">Fin:</span>
                    <span className="timeline-date">
                      {project.endDate.toLocaleDateString('es-ES', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="project-table-container">
          <table className="project-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('name')} className="sortable-header">
                  Nombre {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th>Descripción</th>
                <th onClick={() => handleSort('startDate')} className="sortable-header">
                  Inicio {sortBy === 'startDate' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th>Fin</th>
                <th onClick={() => handleSort('totalHours')} className="sortable-header">
                  Horas {sortBy === 'totalHours' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th>Departamentos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sortedProjects.map(project => (
                <tr key={project.id}>
                  <td className="project-name-cell">{project.name}</td>
                  <td className="project-description-cell">{project.description}</td>
                  <td>{project.startDate.toLocaleDateString('es-ES')}</td>
                  <td>{project.endDate.toLocaleDateString('es-ES')}</td>
                  <td>{project.totalHours.toLocaleString()}</td>
                  <td>{getDepartmentNames(project.departments.map(d => d.departmentId))}</td>
                  <td className="project-actions-cell">
                    <button 
                      className="action-btn edit-btn"
                      onClick={() => onEditProject(project)}
                      aria-label={`Editar proyecto ${project.name}`}
                    >
                      ✏️
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteProject(project.id, project.name)}
                      aria-label={`Eliminar proyecto ${project.name}`}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
