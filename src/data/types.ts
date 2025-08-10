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
