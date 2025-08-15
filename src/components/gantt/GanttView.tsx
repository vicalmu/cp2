import React, { useState, useEffect } from 'react';
import './GanttView.css';
import '../../styles/gantt-base.css';

const GanttView: React.FC = () => {
  // Estado para controlar expansión de departamentos
  const [expandedDepartments, setExpandedDepartments] = useState<number[]>([]);
  
  // Estado para el mes de inicio seleccionado
  const [startMonth, setStartMonth] = useState<{ month: number; year: number }>({ month: 1, year: 2025 });

  // Estado para filtros
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  // Mes actual (agosto = 8)
  const currentMonth = 8;

  // Lista de departamentos disponibles
  const availableDepartments = [
    'PHP Development', '.NET Development', 'Frontend Development', 'QA Testing', 'DevOps',
    'Data Science', 'Mobile Development', 'UI/UX Design', 'Product Management', 'Security Team',
    'Cloud Infrastructure', 'Business Analysis', 'Technical Writing', 'Support Team', 'Research & Development',
    'Machine Learning', 'Blockchain Development', 'Game Development', 'Network Engineering', 'Database Administration',
    'System Administration', 'API Development', 'Microservices Team', 'Performance Testing'
  ];

  // Obtener año actual y establecer mes de inicio por defecto
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setStartMonth({ month: 1, year: currentYear });
  }, []);

  // Cerrar dropdowns al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Cerrar dropdown de departamentos
      const deptDropdown = document.getElementById('departmentDropdown');
      const deptContainer = document.getElementById('departmentFilterContainer');
      
      if (deptDropdown && deptContainer && !deptContainer.contains(event.target as Node)) {
        deptDropdown.style.display = 'none';
      }

      // Cerrar dropdown de meses
      const monthDropdown = document.getElementById('monthDropdown');
      const monthContainer = document.getElementById('monthFilterContainer');
      
      if (monthDropdown && monthContainer && !monthContainer.contains(event.target as Node)) {
        monthDropdown.style.display = 'none';
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Función para alternar expansión de departamento
  const toggleDepartment = (deptId: number) => {
    setExpandedDepartments(prev => 
      prev.includes(deptId) 
        ? prev.filter(id => id !== deptId)
        : [...prev, deptId]
    );
  };

  // Función para alternar expansión de todos los departamentos
  const toggleAllDepartments = () => {
    setExpandedDepartments(prev => 
      prev.length === 25 ? [] : Array.from({length: 25}, (_, i) => i)
    );
  };

  // Función para obtener estilos de celda según si es el mes actual
  const getMonthCellStyle = (month: number) => {
    if (month === currentMonth) {
      return {
        borderLeft: '2px solid #dee2e6',
        borderRight: '2px solid #dee2e6',
        fontWeight: '500',
        color: '#495057'
      };
    }
    return {};
  };

  // Función para generar los 12 meses desde el mes de inicio
  const generateMonths = () => {
    const months = [];
    let currentMonth = startMonth.month;
    let currentYear = startMonth.year;
    
    for (let i = 0; i < 12; i++) {
      months.push({
        month: currentMonth,
        year: currentYear,
        label: getMonthLabel(currentMonth)
      });
      
      currentMonth++;
      if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
      }
    }
    
    return months;
  };

  // Función para obtener etiqueta del mes
  const getMonthLabel = (month: number) => {
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return monthNames[month - 1];
  };

  // Función para renderizar barra de proyecto
    const renderProjectBar = (startMonth: number, endMonth: number, projectName: string) => {
    const totalMonths = 12;
    const startPosition = (startMonth - 1) / totalMonths * 100;
    const width = (endMonth - startMonth + 1) / totalMonths * 100;

    return (
      <div
        style={{
          position: 'absolute',
          left: `${startPosition}%`,
          width: `${width}%`,
          height: '30px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '11px',
          fontWeight: '600',
          boxShadow: '0 3px 12px rgba(102, 126, 234, 0.3)',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          zIndex: 10,
          top: '50%',
          transform: 'translateY(-50%)'
        }}
        title={`${projectName}: ${startMonth}/${2025} - ${endMonth}/${2025}`}
      >
        {/* Efecto de destello sutil */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          animation: 'shimmer 5s infinite',
          pointerEvents: 'none'
        }} />
        {projectName}
      </div>
    );
  };

  // Función para alternar selección de departamento
  const toggleDepartmentSelection = (deptName: string) => {
    setSelectedDepartments(prev => 
      prev.includes(deptName)
        ? prev.filter(name => name !== deptName)
        : [...prev, deptName]
    );
  };

  // Función para limpiar todos los filtros de departamento
  const clearDepartmentFilters = () => {
    setSelectedDepartments([]);
  };

  // Función para obtener departamentos filtrados
  const getFilteredDepartments = () => {
    if (selectedDepartments.length === 0) {
      return availableDepartments;
    }
    return availableDepartments.filter(dept => selectedDepartments.includes(dept));
  };

  const months = generateMonths();
  const filteredDepartments = getFilteredDepartments();

  return (
    <div className="gantt-container">
      {/* Header Principal */}
      <header className="main-header">
        <h1>Sistema de Gestión</h1>
        <p>Panel de administración con filtros y tabla</p>
      </header>

      {/* Barra de Filtros Sticky */}
      <div className="filters-bar">
        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="search">Buscar:</label>
            <input type="text" id="search" placeholder="Nombre, email..." />
          </div>
          

          
          <div className="filter-group">
            <label htmlFor="department">Departamento:</label>
            <div id="departmentFilterContainer" style={{ position: 'relative', width: '250px' }}>
              <div 
                style={{
                  border: '1px solid #e1e5e9',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  minHeight: '42px',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                onClick={() => {
                  const dropdown = document.getElementById('departmentDropdown');
                  if (dropdown) {
                    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {selectedDepartments.length === 0 ? (
                    <span style={{ color: '#999' }}>Seleccionar</span>
                  ) : (
                    <>
                      <span style={{ color: '#1976d2', fontWeight: '500' }}>
                        {selectedDepartments.length} departamento{selectedDepartments.length !== 1 ? 's' : ''} seleccionado{selectedDepartments.length !== 1 ? 's' : ''}
                      </span>
                    </>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {selectedDepartments.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearDepartmentFilters();
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#dc3545',
                        cursor: 'pointer',
                        fontSize: '12px',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}
                      title="Limpiar filtros"
                    >
                      Limpiar
                    </button>
                  )}
                  <span style={{ color: '#666', fontSize: '14px' }}>
                    {selectedDepartments.length === 0 ? '▼' : '▼'}
                  </span>
                </div>
              </div>
              
              <div 
                id="departmentDropdown"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  zIndex: 1000,
                  display: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  marginTop: '4px'
                }}
              >
                <div style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', background: '#f8f9fa' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '500', color: '#333' }}>Departamentos</span>
                    {selectedDepartments.length > 0 && (
                      <button
                        onClick={clearDepartmentFilters}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#dc3545',
                          cursor: 'pointer',
                          fontSize: '12px',
                          textDecoration: 'underline'
                        }}
                      >
                        Limpiar todo
                      </button>
                    )}
                  </div>
                </div>
                {availableDepartments.map(dept => (
                  <div
                    key={dept}
                    onClick={() => toggleDepartmentSelection(dept)}
                    style={{
                      padding: '10px 12px',
                      cursor: 'pointer',
                      background: selectedDepartments.includes(dept) ? '#e3f2fd' : 'white',
                      color: selectedDepartments.includes(dept) ? '#1976d2' : '#333',
                      borderBottom: '1px solid #f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!selectedDepartments.includes(dept)) {
                        e.currentTarget.style.background = '#f8f9fa';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!selectedDepartments.includes(dept)) {
                        e.currentTarget.style.background = 'white';
                      }
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedDepartments.includes(dept)}
                      readOnly
                      style={{ 
                        margin: 0,
                        width: '16px',
                        height: '16px',
                        accentColor: '#1976d2'
                      }}
                    />
                    <span style={{ fontSize: '14px' }}>{dept}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="filter-group">
            <label htmlFor="startMonth">Mes desde:</label>
            <div id="monthFilterContainer" style={{ position: 'relative', width: '200px' }}>
              <div 
                style={{
                  border: '1px solid #e1e5e9',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  minHeight: '42px',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                onClick={() => {
                  const dropdown = document.getElementById('monthDropdown');
                  if (dropdown) {
                    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#1976d2', fontWeight: '500' }}>
                    {getMonthLabel(startMonth.month)} {startMonth.year}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ color: '#666', fontSize: '14px' }}>
                    ▼
                  </span>
                </div>
              </div>
              
              <div 
                id="monthDropdown"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  zIndex: 1000,
                  display: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  marginTop: '4px'
                }}
              >
                <div style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', background: '#f8f9fa' }}>
                  <span style={{ fontWeight: '500', color: '#333' }}>Seleccionar mes de inicio</span>
                </div>
                {[
                  { month: 1, year: 2025, label: 'Enero 2025' },
                  { month: 2, year: 2025, label: 'Febrero 2025' },
                  { month: 3, year: 2025, label: 'Marzo 2025' },
                  { month: 4, year: 2025, label: 'Abril 2025' },
                  { month: 5, year: 2025, label: 'Mayo 2025' },
                  { month: 6, year: 2025, label: 'Junio 2025' },
                  { month: 7, year: 2025, label: 'Julio 2025' },
                  { month: 8, year: 2025, label: 'Agosto 2025' },
                  { month: 9, year: 2025, label: 'Septiembre 2025' },
                  { month: 10, year: 2025, label: 'Octubre 2025' },
                  { month: 11, year: 2025, label: 'Noviembre 2025' },
                  { month: 12, year: 2025, label: 'Diciembre 2025' },
                  { month: 1, year: 2026, label: 'Enero 2026' },
                  { month: 2, year: 2026, label: 'Febrero 2026' },
                  { month: 3, year: 2026, label: 'Marzo 2026' },
                  { month: 4, year: 2026, label: 'Abril 2026' },
                  { month: 5, year: 2026, label: 'Mayo 2026' },
                  { month: 6, year: 2026, label: 'Junio 2026' },
                  { month: 7, year: 2026, label: 'Julio 2026' },
                  { month: 8, year: 2026, label: 'Agosto 2026' },
                  { month: 9, year: 2026, label: 'Septiembre 2026' },
                  { month: 10, year: 2026, label: 'Octubre 2026' },
                  { month: 11, year: 2026, label: 'Noviembre 2026' },
                  { month: 12, year: 2026, label: 'Diciembre 2026' }
                ].map((monthData, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setStartMonth({ month: monthData.month, year: monthData.year });
                      const dropdown = document.getElementById('monthDropdown');
                      if (dropdown) {
                        dropdown.style.display = 'none';
                      }
                    }}
                    style={{
                      padding: '10px 12px',
                      cursor: 'pointer',
                      background: (startMonth.month === monthData.month && startMonth.year === monthData.year) ? '#e3f2fd' : 'white',
                      color: (startMonth.month === monthData.month && startMonth.year === monthData.year) ? '#1976d2' : '#333',
                      borderBottom: '1px solid #f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!(startMonth.month === monthData.month && startMonth.year === monthData.year)) {
                        e.currentTarget.style.background = '#f8f9fa';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!(startMonth.month === monthData.month && startMonth.year === monthData.year)) {
                        e.currentTarget.style.background = 'white';
                      }
                    }}
                  >
                    <input
                      type="radio"
                      checked={startMonth.month === monthData.month && startMonth.year === monthData.year}
                      readOnly
                      style={{ 
                        margin: 0,
                        width: '16px',
                        height: '16px',
                        accentColor: '#1976d2'
                      }}
                    />
                    <span style={{ fontSize: '14px' }}>{monthData.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <button className="filter-button">Filtrar</button>
        </div>
      </div>

      {/* Contenido Principal */}
      <main className="content">
        {/* Tabla con encabezado sticky */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>
                  <div className="gantt-button-container-small">
                    <button 
                      onClick={toggleAllDepartments}
                      className="gantt-bg-primary gantt-text-white gantt-cursor-pointer gantt-font-bold gantt-shadow-medium gantt-transition gantt-button"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        fontSize: '18px',
                        border: '1px solid rgba(255,255,255,0.2)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 3px 12px rgba(102, 126, 234, 0.3)';
                      }}
                    >
                      {expandedDepartments.length === 25 ? '−' : '+'}
                    </button>
                    <span>Departamento</span>
                  </div>
                </th>
                {months.map((monthData, index) => (
                  <th key={index} style={getMonthCellStyle(monthData.month)}>
                    <div className="gantt-flex gantt-flex-column gantt-flex-center" style={{ gap: '2px' }}>
                      <span>{monthData.label}</span>
                      {/* Mostrar año solo cuando cambie de año (mes 1) */}
                      {monthData.month === 1 && (
                        <span className="gantt-font-small gantt-text-small gantt-font-normal" style={{ lineHeight: '1' }}>
                          {monthData.year}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredDepartments.slice(0, 5).map((deptName, deptIndex) => (
                <React.Fragment key={deptIndex}>
                  <tr>
                    <td>
                      <div className="gantt-button-container">
                        <button 
                          onClick={() => toggleDepartment(deptIndex)}
                          className="gantt-bg-secondary gantt-text-white gantt-cursor-pointer gantt-font-bold gantt-shadow-dark gantt-transition gantt-button"
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            fontSize: '14px',
                            border: '1px solid rgba(255,255,255,0.2)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(108, 117, 125, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(108, 117, 125, 0.3)';
                          }}
                        >
                          {expandedDepartments.includes(deptIndex) ? '−' : '+'}
                        </button>
                        <span>{deptName}</span>
                      </div>
                    </td>
                    {months.map((monthData, index) => (
                      <td key={index} style={getMonthCellStyle(monthData.month)}>
                        {Math.floor(Math.random() * 30) + 70}%
                      </td>
                    ))}
                  </tr>
                  {expandedDepartments.includes(deptIndex) && (
                    <>
                      <tr className="gantt-bg-light">
                        <td className="gantt-pl-12 gantt-font-italic gantt-border-gray" style={{ borderRight: '1px solid #f0f0f0' }}>Proyecto A</td>
                        <td colSpan={12} style={{ position: 'relative', height: '40px', padding: '10px 0' }}>
                          {renderProjectBar(1, 6, 'Proyecto A')}
                          <div className="border-mar"></div>
                          <div className="border-abr"></div>
                          <div className="border-may"></div>
                          <div className="border-jun"></div>
                          <div className="border-jul"></div>
                          <div className="border-ago"></div>
                          <div className="border-sep"></div>
                          <div className="border-oct"></div>
                          <div className="border-nov"></div>
                        </td>
                      </tr>
                      <tr className="gantt-bg-light">
                        <td className="gantt-pl-12 gantt-font-italic gantt-border-gray" style={{ borderRight: '1px solid #f0f0f0' }}>Proyecto B</td>
                        <td colSpan={12} style={{ position: 'relative', height: '40px', padding: '10px 0' }}>
                          {renderProjectBar(3, 8, 'Proyecto B')}
                          <div className="border-mar"></div>
                          <div className="border-abr"></div>
                          <div className="border-may"></div>
                          <div className="border-jun"></div>
                          <div className="border-jul"></div>
                          <div className="border-ago"></div>
                          <div className="border-sep"></div>
                          <div className="border-oct"></div>
                          <div className="border-nov"></div>
                        </td>
                      </tr>
                      <tr className="gantt-bg-light">
                        <td className="gantt-pl-12 gantt-font-italic gantt-border-gray" style={{ borderRight: '1px solid #f0f0f0' }}>Proyecto C</td>
                        <td colSpan={12} style={{ position: 'relative', height: '40px', padding: '10px 0' }}>
                          {renderProjectBar(5, 10, 'Proyecto C')}
                          <div className="border-mar"></div>
                          <div className="border-abr"></div>
                          <div className="border-may"></div>
                          <div className="border-jun"></div>
                          <div className="border-jul"></div>
                          <div className="border-nov"></div>
                          <div className="border-sep"></div>
                          <div className="border-oct"></div>
                          <div className="border-nov"></div>
                        </td>
                      </tr>
                    </>
                  )}
                </React.Fragment>
              ))}
              
              {filteredDepartments.slice(5).map((deptName, deptIndex) => (
                <tr key={deptIndex + 5}>
                  <td>{deptName}</td>
                  {months.map((monthData, index) => (
                    <td key={index} style={getMonthCellStyle(monthData.month)}>
                      {Math.floor(Math.random() * 30) + 70}%
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default GanttView;
