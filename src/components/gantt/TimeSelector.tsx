import React, { useState } from 'react';
import { ViewMode, Quarter, TimeRange } from '../../data/types';

interface TimeSelectorProps {
  currentYear: number;
  viewMode: ViewMode;
  selectedQuarter?: Quarter;
  customRange?: TimeRange;
  onViewModeChange: (mode: ViewMode) => void;
  onYearChange: (year: number) => void;
  onQuarterChange: (quarter: Quarter) => void;
  onCustomRangeChange: (range: TimeRange) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  currentYear,
  viewMode,
  selectedQuarter,
  customRange,
  onViewModeChange,
  onYearChange,
  onQuarterChange,
  onCustomRangeChange
}) => {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const quarters: { value: Quarter; label: string; months: string }[] = [
    { value: 1, label: 'Q1', months: 'Ene - Mar' },
    { value: 2, label: 'Q2', months: 'Abr - Jun' },
    { value: 3, label: 'Q3', months: 'Jul - Sep' },
    { value: 4, label: 'Q4', months: 'Oct - Dic' }
  ];

  // Generar años disponibles (desde 2020 hasta 2030)
  const availableYears = Array.from({ length: 11 }, (_, i) => 2020 + i);

  // Verificar si el rango personalizado cruza años
  const isCrossYearRange = customRange && 
    customRange.startYear !== customRange.endYear;

  // Obtener el texto descriptivo del rango
  const getRangeDescription = () => {
    if (!customRange) return '';
    
    const startMonth = months[customRange.startMonth];
    const endMonth = months[customRange.endMonth];
    
    if (customRange.startYear === customRange.endYear) {
      return `${startMonth} - ${endMonth} ${customRange.startYear}`;
    } else {
      return `${startMonth} ${customRange.startYear} - ${endMonth} ${customRange.endYear}`;
    }
  };

  // Calcular la duración en meses
  const getRangeDuration = () => {
    if (!customRange) return 0;
    
    const startDate = new Date(customRange.startYear, customRange.startMonth);
    const endDate = new Date(customRange.endYear, customRange.endMonth);
    
    const monthsDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                      (endDate.getMonth() - startDate.getMonth()) + 1;
    
    return monthsDiff;
  };

  return (
    <div className="time-selector">
      <div className="time-controls">
        {/* Selector de año - Deshabilitado en modo personalizado */}
        <div className={`year-selector ${viewMode === 'custom' ? 'disabled' : ''}`}>
          <label htmlFor="year-select">Año:</label>
          <select
            id="year-select"
            value={currentYear}
            onChange={(e) => {
              console.log('TimeSelector: Year changed to:', e.target.value);
              onYearChange(parseInt(e.target.value));
            }}
            disabled={viewMode === 'custom'}
            title={viewMode === 'custom' ? 'El año se selecciona individualmente en el rango personalizado' : ''}
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Selector de modo de vista */}
        <div className="view-mode-selector">
          <label>Vista:</label>
          <div className="view-mode-buttons">
            <button
              className={`view-mode-btn ${viewMode === 'year' ? 'active' : ''}`}
              onClick={() => onViewModeChange('year')}
            >
              Anual
            </button>
            <button
              className={`view-mode-btn ${viewMode === 'quarter' ? 'active' : ''}`}
              onClick={() => onViewModeChange('quarter')}
            >
              Trimestral
            </button>
            <button
              className={`view-mode-btn ${viewMode === 'custom' ? 'active' : ''}`}
              onClick={() => onViewModeChange('custom')}
            >
              Personalizada
            </button>
          </div>
        </div>

        {/* Selector de trimestre - Deshabilitado en modo personalizado */}
        {viewMode === 'quarter' && (
          <div className="quarter-selector">
            <label>Trimestre:</label>
            <div className="quarter-buttons">
              {quarters.map(quarter => (
                <button
                  key={quarter.value}
                  className={`quarter-btn ${selectedQuarter === quarter.value ? 'active' : ''}`}
                  onClick={() => onQuarterChange(quarter.value)}
                  title={quarter.months}
                >
                  {quarter.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selector de rango personalizado */}
        {viewMode === 'custom' && (
          <div className="custom-range-selector">
            <div className="custom-range-header">
              <label>Rango personalizado:</label>
              <div className="range-info">
                <span className={`range-badge ${isCrossYearRange ? 'cross-year' : 'same-year'}`}>
                  {isCrossYearRange ? '🌍 Rango entre años' : '📅 Rango en un año'}
                </span>
                <span className="range-duration">
                  {getRangeDuration()} mes{getRangeDuration() !== 1 ? 'es' : ''}
                </span>
                {isCrossYearRange && (
                  <span className="cross-year-info">
                    ({customRange.startYear} → {customRange.endYear})
                  </span>
                )}
              </div>
            </div>
            
            <div className="custom-range-inputs">
              <div className="range-input-group">
                <label>Desde:</label>
                <div className="month-year-inputs">
                  <select
                    value={customRange?.startMonth || 0}
                    onChange={(e) => onCustomRangeChange({
                      ...customRange!,
                      startMonth: parseInt(e.target.value)
                    })}
                  >
                    {months.map((month, index) => (
                      <option key={index} value={index}>{month}</option>
                    ))}
                  </select>
                  <select
                    value={customRange?.startYear || currentYear}
                    onChange={(e) => onCustomRangeChange({
                      ...customRange!,
                      startYear: parseInt(e.target.value)
                    })}
                  >
                    {availableYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="range-separator">
                <span>hasta</span>
              </div>

              <div className="range-input-group">
                <label>Hasta:</label>
                <div className="month-year-inputs">
                  <select
                    value={customRange?.endMonth || 11}
                    onChange={(e) => onCustomRangeChange({
                      ...customRange!,
                      endMonth: parseInt(e.target.value)
                    })}
                  >
                    {months.map((month, index) => (
                      <option key={index} value={index}>{month}</option>
                    ))}
                  </select>
                  <select
                    value={customRange?.endYear || currentYear}
                    onChange={(e) => onCustomRangeChange({
                      ...customRange!,
                      endYear: parseInt(e.target.value)
                    })}
                  >
                    {availableYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Descripción del rango seleccionado */}
            <div className="range-description">
              <span className="range-text">{getRangeDescription()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeSelector;
