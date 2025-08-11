import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Project } from '../data/types';
import { ProjectStorage } from '../utils/projectStorage';

interface ProjectsContextType {
  projects: Project[];
  loading: boolean;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  refreshProjects: () => void;
  resetToMock: () => void;
  clearAll: () => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

interface ProjectsProviderProps {
  children: ReactNode;
}

export const ProjectsProvider: React.FC<ProjectsProviderProps> = ({ children }) => {
  console.log('🔍 ProjectsProvider - Inicializando contexto');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar proyectos al iniciar
  useEffect(() => {
    const loadProjects = () => {
      try {
        const savedProjects = ProjectStorage.load();
        setProjects(savedProjects);
        console.log(`📊 ${savedProjects.length} proyectos cargados en contexto`);
      } catch (error) {
        console.error('❌ Error cargando proyectos en contexto:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Guardar automáticamente en cada cambio
  const saveAndUpdate = useCallback((newProjects: Project[]) => {
    setProjects(newProjects);
    ProjectStorage.save(newProjects);
  }, []);

  // Agregar nuevo proyecto
  const addProject = useCallback((project: Project) => {
    const newProjects = [...projects, project];
    saveAndUpdate(newProjects);
    console.log(`✅ Proyecto "${project.name}" agregado`);
  }, [projects, saveAndUpdate]);

  // Actualizar proyecto existente
  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    const updatedProjects = projects.map(project => 
      project.id === id ? { ...project, ...updates } : project
    );
    saveAndUpdate(updatedProjects);
    console.log(`✏️ Proyecto "${id}" actualizado`);
  }, [projects, saveAndUpdate]);

  // Eliminar proyecto
  const deleteProject = useCallback((id: string) => {
    const projectToDelete = projects.find(p => p.id === id);
    const updatedProjects = projects.filter(project => project.id !== id);
    saveAndUpdate(updatedProjects);
    console.log(`🗑️ Proyecto "${projectToDelete?.name || id}" eliminado`);
  }, [projects, saveAndUpdate]);

  // Refrescar proyectos desde storage
  const refreshProjects = useCallback(() => {
    const savedProjects = ProjectStorage.load();
    setProjects(savedProjects);
    console.log(`🔄 Proyectos refrescados: ${savedProjects.length} proyectos`);
  }, []);

  // Resetear a datos mock
  const resetToMock = useCallback(() => {
    ProjectStorage.resetToMock();
    const mockProjects = ProjectStorage.load();
    setProjects(mockProjects);
    console.log('🔄 Datos reseteados a mock original');
  }, []);

  // Limpiar todos los proyectos
  const clearAll = useCallback(() => {
    ProjectStorage.clear();
    setProjects([]);
    console.log('🗑️ Todos los proyectos eliminados');
  }, []);

  const contextValue: ProjectsContextType = {
    projects,
    loading,
    addProject,
    updateProject,
    deleteProject,
    refreshProjects,
    resetToMock,
    clearAll
  };

  return (
    <ProjectsContext.Provider value={contextValue}>
      {children}
    </ProjectsContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useProjects = (): ProjectsContextType => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjects debe ser usado dentro de ProjectsProvider');
  }
  return context;
};
