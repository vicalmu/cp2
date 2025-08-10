import { Department, Person, Project, MonthlyCapacity } from './types';

// Constantes
const MAX_HOURS_PER_YEAR = 1800;

// Datos de personas por departamento
export const mockPeople: Record<string, Person[]> = {
  frontend: [
    { id: 'fe1', name: 'Ana García', role: 'Frontend Developer Senior', maxHoursPerYear: MAX_HOURS_PER_YEAR },
    { id: 'fe2', name: 'Carlos López', role: 'Frontend Developer Mid', maxHoursPerYear: MAX_HOURS_PER_YEAR },
    { id: 'fe3', name: 'María Rodríguez', role: 'Frontend Developer Junior', maxHoursPerYear: MAX_HOURS_PER_YEAR }
  ],
  backend: [
    { id: 'be1', name: 'David Martín', role: 'Backend Developer Senior', maxHoursPerYear: MAX_HOURS_PER_YEAR },
    { id: 'be2', name: 'Laura Sánchez', role: 'Backend Developer Mid', maxHoursPerYear: MAX_HOURS_PER_YEAR },
    { id: 'be3', name: 'Roberto Jiménez', role: 'Backend Developer Mid', maxHoursPerYear: MAX_HOURS_PER_YEAR },
    { id: 'be4', name: 'Carmen Ruiz', role: 'Backend Developer Junior', maxHoursPerYear: MAX_HOURS_PER_YEAR }
  ],
  devops: [
    { id: 'do1', name: 'Miguel Torres', role: 'DevOps Engineer Senior', maxHoursPerYear: MAX_HOURS_PER_YEAR },
    { id: 'do2', name: 'Elena Moreno', role: 'DevOps Engineer Mid', maxHoursPerYear: MAX_HOURS_PER_YEAR }
  ],
  qa: [
    { id: 'qa1', name: 'Javier Fernández', role: 'QA Engineer Senior', maxHoursPerYear: MAX_HOURS_PER_YEAR },
    { id: 'qa2', name: 'Sofia Castro', role: 'QA Engineer Mid', maxHoursPerYear: MAX_HOURS_PER_YEAR },
    { id: 'qa3', name: 'Diego Morales', role: 'QA Engineer Junior', maxHoursPerYear: MAX_HOURS_PER_YEAR }
  ],
  design: [
    { id: 'de1', name: 'Isabel Vega', role: 'UI/UX Designer Senior', maxHoursPerYear: MAX_HOURS_PER_YEAR },
    { id: 'de2', name: 'Pablo Herrera', role: 'UI/UX Designer Mid', maxHoursPerYear: MAX_HOURS_PER_YEAR }
  ],
  product: [
    { id: 'pr1', name: 'Natalia Ortiz', role: 'Product Manager Senior', maxHoursPerYear: MAX_HOURS_PER_YEAR },
    { id: 'pr2', name: 'Hugo Silva', role: 'Product Manager Mid', maxHoursPerYear: MAX_HOURS_PER_YEAR }
  ],
  data: [
    { id: 'da1', name: 'Lucía Mendoza', role: 'Data Engineer Senior', maxHoursPerYear: MAX_HOURS_PER_YEAR },
    { id: 'da2', name: 'Andrés Rojas', role: 'Data Engineer Mid', maxHoursPerYear: MAX_HOURS_PER_YEAR },
    { id: 'da3', name: 'Valentina Paredes', role: 'Data Engineer Junior', maxHoursPerYear: MAX_HOURS_PER_YEAR }
  ]
};

// Departamentos con capacidad calculada
export const mockDepartments: Department[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    people: mockPeople.frontend,
    maxCapacityPerYear: mockPeople.frontend.length * MAX_HOURS_PER_YEAR,
    maxCapacityPerMonth: (mockPeople.frontend.length * MAX_HOURS_PER_YEAR) / 12
  },
  {
    id: 'backend',
    name: 'Backend',
    people: mockPeople.backend,
    maxCapacityPerYear: mockPeople.backend.length * MAX_HOURS_PER_YEAR,
    maxCapacityPerMonth: (mockPeople.backend.length * MAX_HOURS_PER_YEAR) / 12
  },
  {
    id: 'devops',
    name: 'DevOps',
    people: mockPeople.devops,
    maxCapacityPerYear: mockPeople.devops.length * MAX_HOURS_PER_YEAR,
    maxCapacityPerMonth: (mockPeople.devops.length * MAX_HOURS_PER_YEAR) / 12
  },
  {
    id: 'qa',
    name: 'QA',
    people: mockPeople.qa,
    maxCapacityPerYear: mockPeople.qa.length * MAX_HOURS_PER_YEAR,
    maxCapacityPerMonth: (mockPeople.qa.length * MAX_HOURS_PER_YEAR) / 12
  },
  {
    id: 'design',
    name: 'Diseño',
    people: mockPeople.design,
    maxCapacityPerYear: mockPeople.design.length * MAX_HOURS_PER_YEAR,
    maxCapacityPerMonth: (mockPeople.design.length * MAX_HOURS_PER_YEAR) / 12
  },
  {
    id: 'product',
    name: 'Producto',
    people: mockPeople.product,
    maxCapacityPerYear: mockPeople.product.length * MAX_HOURS_PER_YEAR,
    maxCapacityPerMonth: (mockPeople.product.length * MAX_HOURS_PER_YEAR) / 12
  },
  {
    id: 'data',
    name: 'Data',
    people: mockPeople.data,
    maxCapacityPerYear: mockPeople.data.length * MAX_HOURS_PER_YEAR,
    maxCapacityPerMonth: (mockPeople.data.length * MAX_HOURS_PER_YEAR) / 12
  }
];

// Función para generar proyectos para un año específico
export const generateProjectsForYear = (year: number): Project[] => {
  console.log(`🔍 DEBUG: generateProjectsForYear called with year: ${year}`);
  
  // Proyectos diferentes para cada año para que sea fácil distinguirlos
  const yearSpecificProjects = {
    2024: [
      {
        id: 'proj1-2024',
        name: 'Legacy System Migration',
        description: 'Migración de sistema legacy a nueva arquitectura',
        startDate: new Date(year, 0, 1), // Enero
        endDate: new Date(year, 7, 31), // Agosto
        totalHours: 7200,
        departments: [
          {
            departmentId: 'backend',
            hours: 3600,
            monthlyDistribution: [500, 500, 500, 500, 500, 500, 500, 500]
          },
          {
            departmentId: 'devops',
            hours: 2400,
            monthlyDistribution: [300, 300, 300, 300, 300, 300, 300, 300]
          },
          {
            departmentId: 'qa',
            hours: 1200,
            monthlyDistribution: [150, 150, 150, 150, 150, 150, 150, 150]
          }
        ]
      },
      {
        id: 'proj2-2024',
        name: 'Mobile App v1.0',
        description: 'Primera versión de aplicación móvil',
        startDate: new Date(year, 3, 1), // Abril
        endDate: new Date(year, 11, 31), // Diciembre
        totalHours: 5400,
        departments: [
          {
            departmentId: 'frontend',
            hours: 2400,
            monthlyDistribution: [0, 0, 0, 300, 300, 300, 300, 300, 300, 300, 300, 300]
          },
          {
            departmentId: 'design',
            hours: 1800,
            monthlyDistribution: [0, 0, 0, 225, 225, 225, 225, 225, 225, 225, 225, 225]
          },
          {
            departmentId: 'product',
            hours: 1200,
            monthlyDistribution: [0, 0, 0, 150, 150, 150, 150, 150, 150, 150, 150, 150]
          }
        ]
      }
    ],
    2025: [
      {
        id: 'proj1-2025',
        name: 'E-commerce Platform',
        description: 'Plataforma de comercio electrónico completa',
        startDate: new Date(year, 0, 1), // Enero
        endDate: new Date(year, 5, 30), // Junio
        totalHours: 5400,
        departments: [
          {
            departmentId: 'frontend',
            hours: 1800,
            monthlyDistribution: [300, 300, 300, 300, 300, 300]
          },
          {
            departmentId: 'backend',
            hours: 2400,
            monthlyDistribution: [400, 400, 400, 400, 400, 400]
          },
          {
            departmentId: 'design',
            hours: 1200,
            monthlyDistribution: [200, 200, 200, 200, 200, 200]
          }
        ]
      },
      {
        id: 'proj2-2025',
        name: 'Mobile App Redesign',
        description: 'Rediseño completo de aplicación móvil',
        startDate: new Date(year, 2, 1), // Marzo
        endDate: new Date(year, 7, 31), // Agosto
        totalHours: 3600,
        departments: [
          {
            departmentId: 'frontend',
            hours: 1800,
            monthlyDistribution: [0, 0, 300, 300, 300, 300, 300, 300]
          },
          {
            departmentId: 'design',
            hours: 1800,
            monthlyDistribution: [0, 0, 300, 300, 300, 300, 300, 300]
          }
        ]
      },
      {
        id: 'proj3-2025',
        name: 'Data Analytics Dashboard',
        description: 'Dashboard de análisis de datos empresariales',
        startDate: new Date(year, 5, 1), // Junio
        endDate: new Date(year, 11, 31), // Diciembre
        totalHours: 4200,
        departments: [
          {
            departmentId: 'backend',
            hours: 1800,
            monthlyDistribution: [0, 0, 0, 0, 0, 300, 300, 300, 300, 300, 300, 300]
          },
          {
            departmentId: 'data',
            hours: 1200,
            monthlyDistribution: [0, 0, 0, 0, 0, 400, 400, 400, 400, 400, 400, 400]
          }
        ]
      },
      {
        id: 'proj4-2025',
        name: 'DevOps Infrastructure',
        description: 'Modernización de infraestructura DevOps',
        startDate: new Date(year, 0, 1), // Enero
        endDate: new Date(year, 11, 31), // Diciembre
        totalHours: 3600,
        departments: [
          {
            departmentId: 'devops',
            hours: 3600,
            monthlyDistribution: [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300]
          }
        ]
      }
    ],
    2026: [
      {
        id: 'proj1-2026',
        name: 'AI-Powered Chatbot',
        description: 'Chatbot inteligente con IA para atención al cliente',
        startDate: new Date(year, 0, 1), // Enero
        endDate: new Date(year, 3, 30), // Abril
        totalHours: 4800,
        departments: [
          {
            departmentId: 'backend',
            hours: 2400,
            monthlyDistribution: [600, 600, 600, 600]
          },
          {
            departmentId: 'data',
            hours: 1800,
            monthlyDistribution: [450, 450, 450, 450]
          },
          {
            departmentId: 'product',
            hours: 600,
            monthlyDistribution: [150, 150, 150, 150]
          }
        ]
      },
      {
        id: 'proj2-2026',
        name: 'Cloud Migration',
        description: 'Migración completa a infraestructura cloud',
        startDate: new Date(year, 2, 1), // Marzo
        endDate: new Date(year, 8, 31), // Septiembre
        totalHours: 6000,
        departments: [
          {
            departmentId: 'devops',
            hours: 3600,
            monthlyDistribution: [0, 0, 600, 600, 600, 600, 600, 600, 600]
          },
          {
            departmentId: 'backend',
            hours: 1800,
            monthlyDistribution: [0, 0, 300, 300, 300, 300, 300, 300, 300]
          },
          {
            departmentId: 'qa',
            hours: 600,
            monthlyDistribution: [0, 0, 100, 100, 100, 100, 100, 100, 100]
          }
        ]
      },
      {
        id: 'proj3-2026',
        name: 'Advanced Analytics Platform',
        description: 'Plataforma avanzada de análisis predictivo',
        startDate: new Date(year, 6, 1), // Julio
        endDate: new Date(year, 11, 31), // Diciembre
        totalHours: 3600,
        departments: [
          {
            departmentId: 'data',
            hours: 2400,
            monthlyDistribution: [0, 0, 0, 0, 0, 0, 400, 400, 400, 400, 400, 400]
          },
          {
            departmentId: 'backend',
            hours: 1200,
            monthlyDistribution: [0, 0, 0, 0, 0, 0, 200, 200, 200, 200, 200, 200]
          }
        ]
      }
    ]
  };

  // Retornar proyectos específicos del año o proyectos por defecto si no hay configuración
  const result = yearSpecificProjects[year as keyof typeof yearSpecificProjects] || [
    {
      id: `proj-default-${year}`,
      name: `Proyecto ${year}`,
      description: `Proyecto por defecto para ${year}`,
      startDate: new Date(year, 0, 1),
      endDate: new Date(year, 11, 31),
      totalHours: 2400,
      departments: [
        {
          departmentId: 'frontend',
          hours: 1200,
          monthlyDistribution: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
        },
        {
          departmentId: 'backend',
          hours: 1200,
          monthlyDistribution: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
        }
      ]
    }
  ];
  
  console.log(`✅ DEBUG: generateProjectsForYear for ${year} returned ${result.length} projects`);
  console.log(`📋 Projects:`, result.map(p => ({ name: p.name, startDate: p.startDate, endDate: p.endDate })));
  
  return result;
};

// Función para calcular la capacidad mensual de cada departamento para un año específico
export const calculateMonthlyCapacityForYear = (year: number): MonthlyCapacity[] => {
  console.log(`🔍 DEBUG: calculateMonthlyCapacityForYear called with year: ${year}`);
  
  const capacities: MonthlyCapacity[] = [];
  const projectsForYear = generateProjectsForYear(year);
  
  console.log(`📊 DEBUG: Found ${projectsForYear.length} projects for year ${year}`);
  
  mockDepartments.forEach(department => {
    for (let month = 0; month < 12; month++) {
      let usedHours = 0;
      
      // Sumar horas de proyectos activos en este mes
      projectsForYear.forEach(project => {
        const projectStartYear = project.startDate.getFullYear();
        const projectEndYear = project.endDate.getFullYear();
        const projectStartMonth = project.startDate.getMonth();
        const projectEndMonth = project.endDate.getMonth();
        
        // Verificar si el proyecto está activo en este mes y año específicos
        let isActive = false;
        let monthIndex = 0;
        
        if (year === projectStartYear && year === projectEndYear) {
          // Proyecto dentro del mismo año
          isActive = month >= projectStartMonth && month <= projectEndMonth;
          monthIndex = month - projectStartMonth;
        } else if (year === projectStartYear) {
          // Proyecto que empieza este año
          isActive = month >= projectStartMonth;
          monthIndex = month - projectStartMonth;
        } else if (year === projectEndYear) {
          // Proyecto que termina este año
          isActive = month <= projectEndMonth;
          monthIndex = (12 - projectStartMonth) + (year - projectStartYear - 1) * 12 + month;
        } else if (year > projectStartYear && year < projectEndYear) {
          // Proyecto que cruza por este año
          isActive = true;
          monthIndex = (12 - projectStartMonth) + (year - projectStartYear - 1) * 12 + month;
        }
        
        if (isActive) {
          const projectDept = project.departments.find(d => d.departmentId === department.id);
          if (projectDept && monthIndex >= 0 && monthIndex < projectDept.monthlyDistribution.length) {
            usedHours += projectDept.monthlyDistribution[monthIndex];
          }
        }
      });
      
      const percentage = Math.round((usedHours / department.maxCapacityPerMonth) * 100);
      
      capacities.push({
        departmentId: department.id,
        month,
        year,
        usedHours,
        maxHours: department.maxCapacityPerMonth,
        percentage
      });
    }
  });
  
  console.log(`✅ DEBUG: calculateMonthlyCapacityForYear for ${year} returned ${capacities.length} capacity entries`);
  console.log(`📊 Sample capacities:`, capacities.slice(0, 3));
  
  return capacities;
};

// Datos por defecto para el año actual (para compatibilidad)
const CURRENT_YEAR = new Date().getFullYear();
export const mockProjects = generateProjectsForYear(CURRENT_YEAR);
export const mockMonthlyCapacity = calculateMonthlyCapacityForYear(CURRENT_YEAR);
