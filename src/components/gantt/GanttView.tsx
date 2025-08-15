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
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Departamento</th>
                <th>Estado</th>
                <th>Fecha Ingreso</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>001</td>
                <td>Ana García</td>
                <td>ana.garcia@empresa.com</td>
                <td>Ventas</td>
                <td>Activo</td>
                <td>15/01/2024</td>
                <td><button className="filter-button">Ver</button></td>
              </tr>
              <tr>
                <td>002</td>
                <td>Carlos López</td>
                <td>carlos.lopez@empresa.com</td>
                <td>Desarrollo</td>
                <td>Activo</td>
                <td>10/02/2024</td>
                <td><button className="filter-button">Ver</button></td>
              </tr>
              <tr>
                <td>003</td>
                <td>María Rodríguez</td>
                <td>maria.rodriguez@empresa.com</td>
                <td>Marketing</td>
                <td>Pendiente</td>
                <td>22/02/2024</td>
                <td><button className="filter-button">Ver</button></td>
              </tr>
              <tr>
                <td>004</td>
                <td>Juan Martínez</td>
                <td>juan.martinez@empresa.com</td>
                <td>Soporte</td>
                <td>Activo</td>
                <td>05/03/2024</td>
                <td><button className="filter-button">Ver</button></td>
              </tr>
              <tr>
                <td>005</td>
                <td>Laura Sánchez</td>
                <td>laura.sanchez@empresa.com</td>
                <td>Ventas</td>
                <td>Inactivo</td>
                <td>12/03/2024</td>
                <td><button className="filter-button">Ver</button></td>
              </tr>
              <tr>
                <td>006</td>
                <td>Pedro Gómez</td>
                <td>pedro.gomez@empresa.com</td>
                <td>Desarrollo</td>
                <td>Activo</td>
                <td>18/03/2024</td>
                <td><button className="filter-button">Ver</button></td>
              </tr>
              <tr>
                <td>011</td>
                <td>Isabel Moreno</td>
                <td>isabel.moreno@empresa.com</td>
                <td>Marketing</td>
                <td>Activo</td>
                <td>22/04/2024</td>
                <td><button className="filter-button">Ver</button></td>
              </tr>
              <tr>
                <td>012</td>
                <td>Francisco Jiménez</td>
                <td>francisco.jimenez@empresa.com</td>
                <td>Soporte</td>
                <td>Inactivo</td>
                <td>29/04/2024</td>
                <td><button className="filter-button">Ver</button></td>
              </tr>
              <tr>
                <td>013</td>
                <td>Lucía Herrera</td>
                <td>lucia.herrera@empresa.com</td>
                <td>Ventas</td>
                <td>Pendiente</td>
                <td>06/05/2024</td>
                <td><button className="filter-button">Ver</button></td>
              </tr>
              <tr>
                <td>014</td>
                <td>Andrés Vega</td>
                <td>andres.vega@empresa.com</td>
                <td>Desarrollo</td>
                <td>Activo</td>
                <td>13/05/2024</td>
                <td><button className="filter-button">Ver</button></td>
              </tr>
              <tr>
                <td>015</td>
                <td>Patricia Castro</td>
                <td>patricia.castro@empresa.com</td>
                <td>Marketing</td>
                <td>Activo</td>
                <td>20/05/2024</td>
                <td><button className="filter-button">Ver</button></td>
              </tr>
              <tr>
                <td>016</td>
                <td>Javier Ramos</td>
                <td>javier.ramos@empresa.com</td>
                <td>Soporte</td>
                <td>Activo</td>
                <td>27/05/2024</td>
                <td><button className="filter-button">Ver</button></td>
              </tr>
              <tr>
                <td>017</td>
                <td>Beatriz Ortega</td>
                <td>beatriz.ortega@empresa.com</td>
                <td>Ventas</td>
                <td>Inactivo</td>
                <td>03/06/2024</td>
                <td><button className="filter-button">Ver</button></td>
              </tr>
              <tr>
                <td>018</td>
                <td>Raúl Mendoza</td>
                <td>raul.mendoza@empresa.com</td>
                <td>Desarrollo</td>
                <td>Activo</td>
                <td>10/06/2024</td>
                <td><button className="filter-button">Ver</button></td>
              </tr>
              <tr>
                <td>019</td>
                <td>Cristina Vargas</td>
                <td>cristina.vargas@empresa.com</td>
                <td>Marketing</td>
                <td>Pendiente</td>
                <td>17/06/2024</td>
                <td><button className="filter-button">Ver</button></td>
              </tr>
              <tr>
                <td>020</td>
                <td>Sergio Peña</td>
                <td>sergio.pena@empresa.com</td>
                <td>Soporte</td>
                <td>Activo</td>
                <td>24/06/2024</td>
                <td><button className="filter-button">Ver</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default GanttView;
