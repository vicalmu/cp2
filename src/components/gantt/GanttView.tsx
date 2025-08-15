import React, { useState } from 'react';
import './GanttView.css';

const GanttView: React.FC = () => {
  // Estado para controlar expansión de departamentos
  const [expandedDepartments, setExpandedDepartments] = useState<number[]>([]);

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
            <label htmlFor="status">Estado:</label>
            <select id="status">
              <option value="">Todos</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
              <option value="pendiente">Pendiente</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="department">Departamento:</label>
            <select id="department">
              <option value="">Todos</option>
              <option value="ventas">Ventas</option>
              <option value="marketing">Marketing</option>
              <option value="desarrollo">Desarrollo</option>
              <option value="soporte">Soporte</option>
            </select>
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button 
                      onClick={toggleAllDepartments}
                      style={{
                        background: '#2E5B9E',
                        color: 'white',
                        border: 'none',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        fontSize: '18px',
                        fontWeight: 'bold'
                      }}
                    >
                      {expandedDepartments.length === 25 ? '−' : '+'}
                    </button>
                    <span>Departamento</span>
                  </div>
                </th>
                <th>Ene</th>
                <th>Feb</th>
                <th>Mar</th>
                <th>Abr</th>
                <th>May</th>
                <th>Jun</th>
                <th>Jul</th>
                <th>Ago</th>
                <th>Sep</th>
                <th>Oct</th>
                <th>Nov</th>
                <th>Dic</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button 
                      onClick={() => toggleDepartment(0)}
                      style={{
                        background: '#6c757d',
                        color: 'white',
                        border: 'none',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      {expandedDepartments.includes(0) ? '−' : '+'}
                    </button>
                    <span>PHP Development</span>
                  </div>
                </td>
                <td>75%</td>
                <td>82%</td>
                <td>68%</td>
                <td>91%</td>
                <td>77%</td>
                <td>85%</td>
                <td>73%</td>
                <td>89%</td>
                <td>81%</td>
                <td>76%</td>
                <td>84%</td>
                <td>79%</td>
              </tr>
              {expandedDepartments.includes(0) && (
                <>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ paddingLeft: '48px', fontStyle: 'italic' }}>E-commerce Renovación</td>
                    <td>25%</td>
                    <td>30%</td>
                    <td>35%</td>
                    <td>40%</td>
                    <td>45%</td>
                    <td>50%</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>0%</td>
                  </tr>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ paddingLeft: '48px', fontStyle: 'italic' }}>Portal Corporativo</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>20%</td>
                    <td>25%</td>
                    <td>30%</td>
                    <td>35%</td>
                    <td>40%</td>
                    <td>45%</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>0%</td>
                  </tr>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ paddingLeft: '48px', fontStyle: 'italic' }}>API REST v2</td>
                    <td>15%</td>
                    <td>18%</td>
                    <td>22%</td>
                    <td>25%</td>
                    <td>28%</td>
                    <td>30%</td>
                    <td>32%</td>
                    <td>35%</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>0%</td>
                  </tr>
                </>
              )}
              <tr>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button 
                      onClick={() => toggleDepartment(1)}
                      style={{
                        background: '#6c757d',
                        color: 'white',
                        border: 'none',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      {expandedDepartments.includes(1) ? '−' : '+'}
                    </button>
                    <span>.NET Development</span>
                  </div>
                </td>
                <td>68%</td>
                <td>75%</td>
                <td>82%</td>
                <td>79%</td>
                <td>86%</td>
                <td>73%</td>
                <td>91%</td>
                <td>77%</td>
                <td>84%</td>
                <td>89%</td>
                <td>71%</td>
                <td>83%</td>
              </tr>
              {expandedDepartments.includes(1) && (
                <>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ paddingLeft: '48px', fontStyle: 'italic' }}>API Microservicios</td>
                    <td>30%</td>
                    <td>35%</td>
                    <td>40%</td>
                    <td>45%</td>
                    <td>50%</td>
                    <td>55%</td>
                    <td>60%</td>
                    <td>65%</td>
                    <td>70%</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>0%</td>
                  </tr>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ paddingLeft: '48px', fontStyle: 'italic' }}>Sistema Facturación</td>
                    <td>0%</td>
                    <td>25%</td>
                    <td>30%</td>
                    <td>35%</td>
                    <td>40%</td>
                    <td>45%</td>
                    <td>50%</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>0%</td>
                  </tr>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ paddingLeft: '48px', fontStyle: 'italic' }}>Cloud Migration</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>20%</td>
                    <td>25%</td>
                    <td>30%</td>
                    <td>35%</td>
                    <td>40%</td>
                    <td>45%</td>
                    <td>50%</td>
                    <td>55%</td>
                    <td>60%</td>
                  </tr>
                </>
              )}
              <tr>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button 
                      onClick={() => toggleDepartment(2)}
                      style={{
                        background: '#6c757d',
                        color: 'white',
                        border: 'none',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      {expandedDepartments.includes(2) ? '−' : '+'}
                    </button>
                    <span>Frontend Development</span>
                  </div>
                </td>
                <td>81%</td>
                <td>76%</td>
                <td>89%</td>
                <td>73%</td>
                <td>85%</td>
                <td>78%</td>
                <td>82%</td>
                <td>91%</td>
                <td>75%</td>
                <td>87%</td>
                <td>80%</td>
                <td>86%</td>
              </tr>
              {expandedDepartments.includes(2) && (
                <>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ paddingLeft: '48px', fontStyle: 'italic' }}>Dashboard Principal</td>
                    <td>40%</td>
                    <td>45%</td>
                    <td>50%</td>
                    <td>55%</td>
                    <td>60%</td>
                    <td>65%</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>0%</td>
                  </tr>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ paddingLeft: '48px', fontStyle: 'italic' }}>Sistema de Usuarios</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>30%</td>
                    <td>35%</td>
                    <td>40%</td>
                    <td>45%</td>
                    <td>50%</td>
                    <td>55%</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>0%</td>
                  </tr>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ paddingLeft: '48px', fontStyle: 'italic' }}>Módulo de Reportes</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>25%</td>
                    <td>30%</td>
                    <td>35%</td>
                    <td>40%</td>
                    <td>45%</td>
                    <td>50%</td>
                    <td>0%</td>
                    <td>0%</td>
                  </tr>
                </>
              )}
              <tr>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button 
                      onClick={() => toggleDepartment(3)}
                      style={{
                        background: '#6c757d',
                        color: 'white',
                        border: 'none',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      {expandedDepartments.includes(3) ? '−' : '+'}
                    </button>
                    <span>QA Testing</span>
                  </div>
                </td>
                <td>72%</td>
                <td>88%</td>
                <td>75%</td>
                <td>83%</td>
                <td>79%</td>
                <td>86%</td>
                <td>74%</td>
                <td>81%</td>
                <td>90%</td>
                <td>76%</td>
                <td>85%</td>
                <td>78%</td>
              </tr>
              {expandedDepartments.includes(3) && (
                <>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ paddingLeft: '48px', fontStyle: 'italic' }}>Testing Automatizado</td>
                    <td>20%</td>
                    <td>22%</td>
                    <td>25%</td>
                    <td>28%</td>
                    <td>30%</td>
                    <td>32%</td>
                    <td>35%</td>
                    <td>38%</td>
                    <td>40%</td>
                    <td>42%</td>
                    <td>45%</td>
                    <td>48%</td>
                  </tr>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ paddingLeft: '48px', fontStyle: 'italic' }}>Testing Manual</td>
                    <td>0%</td>
                    <td>15%</td>
                    <td>18%</td>
                    <td>20%</td>
                    <td>22%</td>
                    <td>25%</td>
                    <td>28%</td>
                    <td>30%</td>
                    <td>32%</td>
                    <td>35%</td>
                    <td>38%</td>
                    <td>0%</td>
                  </tr>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ paddingLeft: '48px', fontStyle: 'italic' }}>Performance Testing</td>
                    <td>25%</td>
                    <td>28%</td>
                    <td>30%</td>
                    <td>32%</td>
                    <td>35%</td>
                    <td>38%</td>
                    <td>40%</td>
                    <td>42%</td>
                    <td>45%</td>
                    <td>48%</td>
                    <td>50%</td>
                    <td>52%</td>
                  </tr>
                </>
              )}
              <tr>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button 
                      onClick={() => toggleDepartment(4)}
                      style={{
                        background: '#6c757d',
                        color: 'white',
                        border: 'none',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      {expandedDepartments.includes(4) ? '−' : '+'}
                    </button>
                    <span>DevOps</span>
                  </div>
                </td>
                <td>85%</td>
                <td>71%</td>
                <td>88%</td>
                <td>76%</td>
                <td>82%</td>
                <td>79%</td>
                <td>87%</td>
                <td>74%</td>
                <td>83%</td>
                <td>80%</td>
                <td>89%</td>
                <td>75%</td>
              </tr>
              {expandedDepartments.includes(4) && (
                <>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ paddingLeft: '48px', fontStyle: 'italic' }}>Pipeline CI/CD</td>
                    <td>35%</td>
                    <td>38%</td>
                    <td>40%</td>
                    <td>42%</td>
                    <td>45%</td>
                    <td>48%</td>
                    <td>50%</td>
                    <td>52%</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>0%</td>
                  </tr>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ paddingLeft: '48px', fontStyle: 'italic' }}>Monitoreo y Alertas</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>25%</td>
                    <td>28%</td>
                    <td>30%</td>
                    <td>32%</td>
                    <td>35%</td>
                    <td>38%</td>
                    <td>40%</td>
                    <td>42%</td>
                    <td>0%</td>
                    <td>0%</td>
                  </tr>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ paddingLeft: '48px', fontStyle: 'italic' }}>Infraestructura como Código</td>
                    <td>30%</td>
                    <td>32%</td>
                    <td>35%</td>
                    <td>38%</td>
                    <td>40%</td>
                    <td>42%</td>
                    <td>45%</td>
                    <td>48%</td>
                    <td>50%</td>
                    <td>52%</td>
                    <td>55%</td>
                    <td>58%</td>
                  </tr>
                </>
              )}
              <tr>
                <td>Data Science</td>
                <td>79%</td>
                <td>84%</td>
                <td>77%</td>
                <td>90%</td>
                <td>73%</td>
                <td>86%</td>
                <td>81%</td>
                <td>78%</td>
                <td>85%</td>
                <td>72%</td>
                <td>88%</td>
                <td>83%</td>
              </tr>
              <tr>
                <td>Mobile Development</td>
                <td>86%</td>
                <td>78%</td>
                <td>83%</td>
                <td>75%</td>
                <td>89%</td>
                <td>81%</td>
                <td>76%</td>
                <td>84%</td>
                <td>77%</td>
                <td>90%</td>
                <td>82%</td>
                <td>79%</td>
              </tr>
              <tr>
                <td>UI/UX Design</td>
                <td>73%</td>
                <td>87%</td>
                <td>80%</td>
                <td>85%</td>
                <td>78%</td>
                <td>82%</td>
                <td>89%</td>
                <td>76%</td>
                <td>81%</td>
                <td>84%</td>
                <td>77%</td>
                <td>86%</td>
              </tr>
              <tr>
                <td>Product Management</td>
                <td>88%</td>
                <td>82%</td>
                <td>75%</td>
                <td>79%</td>
                <td>86%</td>
                <td>73%</td>
                <td>84%</td>
                <td>90%</td>
                <td>77%</td>
                <td>81%</td>
                <td>85%</td>
                <td>78%</td>
              </tr>
              <tr>
                <td>Security Team</td>
                <td>81%</td>
                <td>76%</td>
                <td>89%</td>
                <td>83%</td>
                <td>78%</td>
                <td>85%</td>
                <td>72%</td>
                <td>87%</td>
                <td>80%</td>
                <td>86%</td>
                <td>74%</td>
                <td>91%</td>
              </tr>
              <tr>
                <td>Cloud Infrastructure</td>
                <td>77%</td>
                <td>85%</td>
                <td>72%</td>
                <td>88%</td>
                <td>81%</td>
                <td>79%</td>
                <td>86%</td>
                <td>73%</td>
                <td>84%</td>
                <td>78%</td>
                <td>90%</td>
                <td>82%</td>
              </tr>
              <tr>
                <td>Business Analysis</td>
                <td>84%</td>
                <td>79%</td>
                <td>86%</td>
                <td>77%</td>
                <td>83%</td>
                <td>90%</td>
                <td>75%</td>
                <td>81%</td>
                <td>78%</td>
                <td>85%</td>
                <td>72%</td>
                <td>87%</td>
              </tr>
              <tr>
                <td>Technical Writing</td>
                <td>79%</td>
                <td>83%</td>
                <td>77%</td>
                <td>86%</td>
                <td>80%</td>
                <td>74%</td>
                <td>89%</td>
                <td>82%</td>
                <td>76%</td>
                <td>88%</td>
                <td>81%</td>
                <td>75%</td>
              </tr>
              <tr>
                <td>Support Team</td>
                <td>82%</td>
                <td>88%</td>
                <td>74%</td>
                <td>80%</td>
                <td>85%</td>
                <td>77%</td>
                <td>83%</td>
                <td>89%</td>
                <td>72%</td>
                <td>86%</td>
                <td>79%</td>
                <td>84%</td>
              </tr>
              <tr>
                <td>Research & Development</td>
                <td>75%</td>
                <td>81%</td>
                <td>87%</td>
                <td>73%</td>
                <td>88%</td>
                <td>82%</td>
                <td>76%</td>
                <td>85%</td>
                <td>90%</td>
                <td>77%</td>
                <td>83%</td>
                <td>79%</td>
              </tr>
              <tr>
                <td>Machine Learning</td>
                <td>83%</td>
                <td>77%</td>
                <td>91%</td>
                <td>85%</td>
                <td>79%</td>
                <td>86%</td>
                <td>82%</td>
                <td>88%</td>
                <td>74%</td>
                <td>81%</td>
                <td>87%</td>
                <td>80%</td>
              </tr>
              <tr>
                <td>Blockchain Development</td>
                <td>76%</td>
                <td>89%</td>
                <td>73%</td>
                <td>87%</td>
                <td>84%</td>
                <td>78%</td>
                <td>90%</td>
                <td>75%</td>
                <td>82%</td>
                <td>86%</td>
                <td>79%</td>
                <td>83%</td>
              </tr>
              <tr>
                <td>Game Development</td>
                <td>88%</td>
                <td>74%</td>
                <td>85%</td>
                <td>79%</td>
                <td>91%</td>
                <td>76%</td>
                <td>83%</td>
                <td>87%</td>
                <td>80%</td>
                <td>84%</td>
                <td>78%</td>
                <td>86%</td>
              </tr>
              <tr>
                <td>Network Engineering</td>
                <td>81%</td>
                <td>86%</td>
                <td>72%</td>
                <td>89%</td>
                <td>77%</td>
                <td>84%</td>
                <td>90%</td>
                <td>73%</td>
                <td>85%</td>
                <td>78%</td>
                <td>82%</td>
                <td>87%</td>
              </tr>
              <tr>
                <td>Database Administration</td>
                <td>85%</td>
                <td>78%</td>
                <td>83%</td>
                <td>76%</td>
                <td>88%</td>
                <td>81%</td>
                <td>74%</td>
                <td>86%</td>
                <td>89%</td>
                <td>82%</td>
                <td>77%</td>
                <td>84%</td>
              </tr>
              <tr>
                <td>System Administration</td>
                <td>79%</td>
                <td>84%</td>
                <td>87%</td>
                <td>81%</td>
                <td>75%</td>
                <td>90%</td>
                <td>83%</td>
                <td>78%</td>
                <td>86%</td>
                <td>73%</td>
                <td>89%</td>
                <td>82%</td>
              </tr>
              <tr>
                <td>API Development</td>
                <td>82%</td>
                <td>77%</td>
                <td>89%</td>
                <td>85%</td>
                <td>80%</td>
                <td>74%</td>
                <td>87%</td>
                <td>91%</td>
                <td>76%</td>
                <td>83%</td>
                <td>88%</td>
                <td>79%</td>
              </tr>
              <tr>
                <td>Microservices Team</td>
                <td>87%</td>
                <td>81%</td>
                <td>74%</td>
                <td>88%</td>
                <td>82%</td>
                <td>89%</td>
                <td>75%</td>
                <td>84%</td>
                <td>90%</td>
                <td>77%</td>
                <td>83%</td>
                <td>86%</td>
              </tr>
              <tr>
                <td>Performance Testing</td>
                <td>73%</td>
                <td>88%</td>
                <td>82%</td>
                <td>79%</td>
                <td>85%</td>
                <td>76%</td>
                <td>91%</td>
                <td>83%</td>
                <td>78%</td>
                <td>86%</td>
                <td>80%</td>
                <td>87%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default GanttView;
