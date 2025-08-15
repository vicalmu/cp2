import React from 'react';
import './GanttView.css';

const GanttView: React.FC = () => {
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
                <th>Departamento</th>
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
                <td>PHP Development</td>
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
              <tr>
                <td>.NET Development</td>
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
              <tr>
                <td>Frontend Development</td>
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
              <tr>
                <td>QA Testing</td>
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
              <tr>
                <td>DevOps</td>
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
