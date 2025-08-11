import { Project } from '../data/types';
import { mockProjects } from '../data/mockData';

const PROJECTS_STORAGE_KEY = 'capacity_planner_projects';
const VERSION = '1.0.0';

interface StoredData {
  projects: Project[];
  lastUpdated: string;
  version: string;
}

export class ProjectStorage {
  static save(projects: Project[]): void {
    try {
      const data: StoredData = {
        projects,
        lastUpdated: new Date().toISOString(),
        version: VERSION
      };
      
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(data));
      console.log(`✅ Proyectos guardados en LocalStorage: ${projects.length} proyectos`);
    } catch (error) {
      console.error('❌ Error guardando proyectos en LocalStorage:', error);
    }
  }

  static load(): Project[] {
    try {
      const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
      
      if (!stored) {
        console.log('📝 No hay proyectos guardados, usando datos mock');
        return mockProjects;
      }

      const parsed: StoredData = JSON.parse(stored);
      
      // Validar estructura de datos
      if (this.isValidStoredData(parsed)) {
        // Convertir fechas de string a Date
        const projectsWithDates = parsed.projects.map(project => ({
          ...project,
          startDate: new Date(project.startDate),
          endDate: new Date(project.endDate)
        }));
        
        console.log(`📥 Proyectos cargados desde LocalStorage: ${projectsWithDates.length} proyectos`);
        return projectsWithDates;
      } else {
        console.warn('⚠️ Datos corruptos en LocalStorage, usando datos mock');
        return mockProjects;
      }
      
    } catch (error) {
      console.error('❌ Error cargando proyectos desde LocalStorage:', error);
      return mockProjects;
    }
  }

  static clear(): void {
    try {
      localStorage.removeItem(PROJECTS_STORAGE_KEY);
      console.log('🗑️ LocalStorage limpiado');
    } catch (error) {
      console.error('❌ Error limpiando LocalStorage:', error);
    }
  }

  static resetToMock(): void {
    this.save(mockProjects);
    console.log('🔄 Datos reseteados a mock original');
  }

  private static isValidStoredData(data: any): data is StoredData {
    return (
      data &&
      typeof data === 'object' &&
      Array.isArray(data.projects) &&
      typeof data.lastUpdated === 'string' &&
      typeof data.version === 'string' &&
      data.projects.every((project: any) => this.isValidProject(project))
    );
  }

  private static isValidProject(project: any): boolean {
    return (
      project &&
      typeof project.id === 'string' &&
      typeof project.name === 'string' &&
      typeof project.description === 'string' &&
      (project.startDate || typeof project.startDate === 'string') &&
      (project.endDate || typeof project.endDate === 'string') &&
      typeof project.totalHours === 'number' &&
      Array.isArray(project.departments)
    );
  }
}
