# Capacity Planner 2

## Estado Actual del Proyecto

### ✅ Completado
- **Estructura base del proyecto** con React + TypeScript
- **Vista Home** con selector de modos de trabajo
- **Vista Gantt** completamente funcional con:
  - Tabla de capacidad por departamentos y proyectos
  - Filtros avanzados con MultiSelect dropdown
  - Selector de tiempo (año, trimestre, vista personalizada)
  - Diseño responsive y moderno
  - Animaciones y efectos visuales
- **Sistema de estilos modular** respetando la regla de 500 líneas por archivo

### 🔧 Estructura de Archivos CSS del Gantt
El CSS del Gantt ha sido dividido en módulos organizados por funcionalidad:

- `gantt-base.css` (159 líneas) - Estilos base y layout
- `gantt-header.css` (141 líneas) - Header y navegación
- `gantt-table.css` (322 líneas) - Tabla principal y filas
- `gantt-controls.css` (490 líneas) - Controles y filtros
- `gantt-responsive.css` (178 líneas) - Estilos responsive
- `gantt-main.css` (7 líneas) - Archivo principal que importa todos los módulos
- `gantt.css` (2 líneas) - Solo importa el archivo principal

### 📁 Estructura del Proyecto
```
src/
├── components/
│   ├── gantt/
│   │   ├── GanttView.tsx (177 líneas)
│   │   ├── GanttTable.tsx (191 líneas)
│   │   ├── DepartmentRow.tsx (109 líneas)
│   │   ├── ProjectRow.tsx (86 líneas)
│   │   ├── TimeSelector.tsx (231 líneas)
│   │   ├── MultiSelectDropdown.tsx (132 líneas)
│   │   └── FilterPanel.tsx (68 líneas)
│   └── home/
│       ├── HomeView.tsx
│       ├── ModeCard.tsx
│       └── ModeSelector.tsx
├── styles/
│   ├── gantt-*.css (archivos modulares)
│   ├── home.css
│   ├── global.css
│   └── variables.css
└── data/
    ├── mockData.ts
    └── types.ts
```

### 🎯 Próximos Pasos
1. **Implementar vista de Proyectos** - Gestión y organización de proyectos
2. **Implementar Simulador Inteligente** - Simulación de impacto de nuevos proyectos
3. **Mejorar la funcionalidad del Gantt** - Agregar más opciones de filtrado y visualización
4. **Optimizar el rendimiento** - Implementar virtualización para tablas grandes
5. **Agregar persistencia de datos** - Base de datos local o backend

### 🚀 Cómo Ejecutar
```bash
npm install
npm start
```

La aplicación se ejecuta en `http://localhost:3000`

### 📱 Características Técnicas
- **React 18** con TypeScript
- **CSS Modules** con variables CSS personalizadas
- **Diseño responsive** para móviles y tablets
- **Animaciones CSS** con transiciones suaves
- **Arquitectura modular** respetando límites de líneas de código
- **Nomenclatura consistente** en todos los archivos

### 🎨 Sistema de Diseño
- **Paleta de colores** con gradientes modernos
- **Tipografía** escalable y legible
- **Espaciado** consistente usando variables CSS
- **Sombras y efectos** para profundidad visual
- **Transiciones** suaves para mejor UX

---
*Última actualización: División del CSS del Gantt en módulos organizados*
