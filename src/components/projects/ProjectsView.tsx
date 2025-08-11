import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../context/ProjectsContext';
import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';
import ProjectFilters from './ProjectFilters';
import ProjectStats from './ProjectStats';
import { Project, ProjectFilters as ProjectFiltersType } from '../../data/types';
import '../../styles/projects.css';

const ProjectsView: React.FC = () => {
  const navigate = useNavigate();
  const { projects, loading, resetToMock, clearAll } = useProjects();
  
  // Debug: mostrar información de proyectos
  console.log('🔍 ProjectsView - projects:', projects);
  console.log('🔍 ProjectsView - loading:', loading);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [filters, setFilters] = useState<ProjectFiltersType>({
    search: '',
    departments: [],
    dateRange: { start: null, end: null },
    status: [],
    priority: [],
    hoursRange: { min: 0, max: 10000 }
  });

  const handleCreateProject = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleViewInGantt = () => {
    navigate('/gantt');
  };

  const handleFiltersChange = (newFilters: ProjectFiltersType) => {
    setFilters(newFilters);
  };

  const filteredProjects = projects.filter(project => {
    // Filtro de búsqueda
    if (filters.search && !project.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !project.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Filtro de departamentos
    if (filters.departments.length > 0 && 
        !project.departments.some(dept => filters.departments.includes(dept.departmentId))) {
      return false;
    }

    // Filtro de rango de fechas
    if (filters.dateRange.start && project.startDate < filters.dateRange.start) {
      return false;
    }
    if (filters.dateRange.end && project.endDate > filters.dateRange.end) {
      return false;
    }

    // Filtro de rango de horas
    if (project.totalHours < filters.hoursRange.min || project.totalHours > filters.hoursRange.max) {
      return false;
    }

    return true;
  });

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
      {/* Header */}
      <div className="projects-header">
        <div className="projects-header-content">
          <div className="projects-title-section">
            <h1 className="projects-title">Gestión de Proyectos</h1>
            <p className="projects-subtitle">
              Gestiona y organiza todos los proyectos de tu empresa con herramientas avanzadas de planificación
            </p>
          </div>
          
          <div className="projects-actions">
            <button 
              className="btn btn-secondary"
              onClick={handleViewInGantt}
              aria-label="Ver proyectos en vista Gantt"
            >
              📊 Ver en Gantt
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleCreateProject}
              aria-label="Crear nuevo proyecto"
            >
              ➕ Nuevo Proyecto
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <ProjectStats projects={projects} filteredProjects={filteredProjects} />

      {/* Contenido Principal */}
      <div className="projects-main">
        <div className="projects-sidebar">
          <ProjectFilters 
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onReset={() => setFilters({
              search: '',
              departments: [],
              dateRange: { start: null, end: null },
              status: [],
              priority: [],
              hoursRange: { min: 0, max: 10000 }
            })}
          />
          
          <div className="projects-admin-actions">
            <h3>Acciones Administrativas</h3>
            <button 
              className="btn btn-outline"
              onClick={resetToMock}
              aria-label="Resetear a datos mock originales"
            >
              🔄 Resetear a Mock
            </button>
            <button 
              className="btn btn-outline btn-danger"
              onClick={clearAll}
              aria-label="Eliminar todos los proyectos"
            >
              🗑️ Limpiar Todo
            </button>
            <button 
              className="btn btn-outline"
              onClick={() => {
                console.log('🔍 Test button clicked');
                console.log('🔍 Current projects:', projects);
                console.log('🔍 Projects length:', projects.length);
              }}
              aria-label="Botón de prueba"
            >
              🧪 Test Debug
            </button>
          </div>
        </div>

        <div className="projects-content">
          <ProjectList 
            projects={filteredProjects}
            onEditProject={handleEditProject}
          />
        </div>
      </div>

      {/* Modal de Formulario */}
      {showForm && (
        <ProjectForm 
          project={editingProject}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default ProjectsView;
