export interface Person {
  id: string;
  name: string;
  role: string;
  maxHoursPerYear: number;
}

export interface Department {
  id: string;
  name: string;
  people: Person[];
  maxCapacityPerYear: number;
  maxCapacityPerMonth: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  totalHours: number;
  departments: {
    departmentId: string;
    hours: number;
    monthlyDistribution: number[]; // Distribución mensual de horas
  }[];
}

// Nuevos tipos para la vista de proyectos
export interface ProjectStatus {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface ProjectPriority {
  id: string;
  name: string;
  color: string;
  level: number;
}

export interface ProjectFilters {
  search: string;
  departments: string[];
  dateRange: { start: Date | null; end: Date | null };
  status: string[];
  priority: string[];
  hoursRange: { min: number; max: number };
}

export interface ProjectFormData {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  departments: {
    departmentId: string;
    hours: number;
    monthlyDistribution: number[];
  }[];
}

export interface MonthlyCapacity {
  departmentId: string;
  month: number; // 0-11 (enero-diciembre)
  year: number;
  usedHours: number;
  maxHours: number;
  percentage: number;
}

export interface TimeRange {
  startMonth: number;
  endMonth: number;
  startYear: number;
  endYear: number;
}

export type ViewMode = 'year' | 'quarter' | 'custom';
export type Quarter = 1 | 2 | 3 | 4;

// Constantes para estados y prioridades
export const PROJECT_STATUSES: ProjectStatus[] = [
  { id: 'active', name: 'Activo', color: '#10b981', icon: '▶️' },
  { id: 'completed', name: 'Completado', color: '#3b82f6', icon: '✅' },
  { id: 'planned', name: 'Planificado', color: '#f59e0b', icon: '📅' },
  { id: 'on-hold', name: 'En Pausa', color: '#ef4444', icon: '⏸️' }
];

export const PROJECT_PRIORITIES: ProjectPriority[] = [
  { id: 'low', name: 'Baja', color: '#6b7280', level: 1 },
  { id: 'medium', name: 'Media', color: '#f59e0b', level: 2 },
  { id: 'high', name: 'Alta', color: '#ef4444', level: 3 },
  { id: 'critical', name: 'Crítica', color: '#7c2d12', level: 4 }
];
