import React from 'react';
import { Project, PROJECT_STATUSES } from '../../data/types';
import '../../styles/projects.css';

interface ProjectStatsProps {
  projects: Project[];
  filteredProjects: Project[];
}

const ProjectStats: React.FC<ProjectStatsProps> = ({ projects, filteredProjects }) => {
  const getProjectStatus = (project: Project) => {
    const now = new Date();
    if (project.startDate > now) return 'planned';
    if (project.endDate < now) return 'completed';
    return 'active';
  };

  const getTotalHours = (projectList: Project[]) => {
    return projectList.reduce((total, project) => total + project.totalHours, 0);
  };

  const getAverageDuration = (projectList: Project[]) => {
    if (projectList.length === 0) return 0;
    const totalMonths = projectList.reduce((total, project) => {
      const months = (project.endDate.getFullYear() - project.startDate.getFullYear()) * 12 + 
                    (project.endDate.getMonth() - project.startDate.getMonth());
      return total + months + 1;
    }, 0);
    return Math.round(totalMonths / projectList.length);
  };

  const getStatusCounts = (projectList: Project[]) => {
    const counts = { active: 0, completed: 0, planned: 0, onHold: 0 };
    projectList.forEach(project => {
      const status = getProjectStatus(project);
      if (status === 'active') counts.active++;
      else if (status === 'completed') counts.completed++;
      else if (status === 'planned') counts.planned++;
      else counts.onHold++;
    });
    return counts;
  };

  const getDepartmentStats = (projectList: Project[]) => {
    const deptStats: Record<string, { hours: number; projects: number }> = {};
    
    projectList.forEach(project => {
      project.departments.forEach(dept => {
        if (!deptStats[dept.departmentId]) {
          deptStats[dept.departmentId] = { hours: 0, projects: 0 };
        }
        deptStats[dept.departmentId].hours += dept.hours;
        deptStats[dept.departmentId].projects += 1;
      });
    });

    return Object.entries(deptStats)
      .map(([deptId, stats]) => ({ deptId, ...stats }))
      .sort((a, b) => b.hours - a.hours)
      .slice(0, 3); // Top 3 departamentos
  };

  const totalProjects = projects.length;
  const filteredProjectsCount = filteredProjects.length;
  const totalHours = getTotalHours(projects);
  const filteredHours = getTotalHours(filteredProjects);
  const averageDuration = getAverageDuration(projects);
  const statusCounts = getStatusCounts(projects);
  const topDepartments = getDepartmentStats(projects);

  const isFiltered = totalProjects !== filteredProjectsCount;

  return (
    <div className="project-stats">
      <div className="stats-grid">
        {/* Proyectos Totales */}
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <div className="stat-value">
              {filteredProjectsCount}
              {isFiltered && <span className="stat-total">/ {totalProjects}</span>}
            </div>
            <div className="stat-label">Proyectos</div>
          </div>
        </div>

        {/* Horas Totales */}
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <div className="stat-value">
              {filteredHours.toLocaleString()}
              {isFiltered && <span className="stat-total">/ {totalHours.toLocaleString()}</span>}
            </div>
            <div className="stat-label">Horas Totales</div>
          </div>
        </div>

        {/* Duración Promedio */}
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-value">{averageDuration}</div>
            <div className="stat-label">Meses Promedio</div>
          </div>
        </div>

        {/* Proyectos Activos */}
        <div className="stat-card">
          <div className="stat-icon">▶️</div>
          <div className="stat-content">
            <div className="stat-value">{statusCounts.active}</div>
            <div className="stat-label">Activos</div>
          </div>
        </div>

        {/* Proyectos Completados */}
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">{statusCounts.completed}</div>
            <div className="stat-label">Completados</div>
          </div>
        </div>

        {/* Proyectos Planificados */}
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-value">{statusCounts.planned}</div>
            <div className="stat-label">Planificados</div>
          </div>
        </div>
      </div>

      {/* Top Departamentos */}
      {topDepartments.length > 0 && (
        <div className="stats-section">
          <h4>🏢 Departamentos Más Ocupados</h4>
          <div className="department-stats">
            {topDepartments.map((dept, index) => (
              <div key={dept.deptId} className="department-stat">
                <div className="dept-rank">#{index + 1}</div>
                <div className="dept-info">
                  <div className="dept-name">{dept.deptId}</div>
                  <div className="dept-details">
                    {dept.projects} proyecto{dept.projects !== 1 ? 's' : ''} • {dept.hours.toLocaleString()} horas
                  </div>
                </div>
                <div className="dept-hours">{dept.hours.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Indicador de Filtros */}
      {isFiltered && (
        <div className="filter-indicator">
          <span className="filter-icon">🔍</span>
          <span className="filter-text">
            Mostrando {filteredProjectsCount} de {totalProjects} proyectos
          </span>
        </div>
      )}
    </div>
  );
};

export default ProjectStats;
