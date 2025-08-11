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
  const [isCustomExpanded, setIsCustomExpanded] = useState(false);
  
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

  const availableYears = Array.from({ length: 11 }, (_, i) => 2020 + i);

  const isCrossYearRange = customRange && 
    customRange.startYear !== customRange.endYear;

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

  const getRangeDuration = () => {
    if (!customRange) return 0;
    
    const startDate = new Date(customRange.startYear, customRange.startMonth);
    const endDate = new Date(customRange.endYear, customRange.endMonth);
    
    const monthsDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                      (endDate.getMonth() - startDate.getMonth()) + 1;
    
    return monthsDiff;
  };

  const handleCustomToggle = () => {
    setIsCustomExpanded(!isCustomExpanded);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    // Si se selecciona modo personalizado, expandir automáticamente
    if (mode === 'custom') {
      setIsCustomExpanded(true);
    } else {
      setIsCustomExpanded(false);
    }
    onViewModeChange(mode);
  };

  return (
    <div className="time-selector compact">
      <div className="time-controls-row">
        {/* Selector de año */}
        <div className={`year-selector ${viewMode === 'custom' ? 'disabled' : ''}`}>
          <label htmlFor="year-select">Año:</label>
          <select
            id="year-select"
            value={currentYear}
            onChange={(e) => onYearChange(parseInt(e.target.value))}
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
              onClick={() => handleViewModeChange('year')}
            >
              Anual
            </button>
            <button
              className={`view-mode-btn ${viewMode === 'quarter' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('quarter')}
            >
              Trimestral
            </button>
            <button
              className={`view-mode-btn ${viewMode === 'custom' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('custom')}
            >
              Personalizada
            </button>
          </div>
        </div>

        {/* Selector de trimestre */}
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

        {/* Resumen del rango personalizado (siempre visible) */}
        {viewMode === 'custom' && customRange && (
          <div className="custom-range-summary">
            <span className="range-badge">
              {getRangeDescription()} ({getRangeDuration()} mes{getRangeDuration() !== 1 ? 'es' : ''})
            </span>
            <button 
              className="expand-toggle-btn"
              onClick={handleCustomToggle}
              title={isCustomExpanded ? 'Contraer filtros' : 'Expandir filtros'}
            >
              {isCustomExpanded ? '▼' : '▶'}
            </button>
          </div>
        )}
      </div>

      {/* Filtros expandibles solo cuando se necesiten */}
      {viewMode === 'custom' && isCustomExpanded && (
        <div className="custom-range-expanded">
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
        </div>
      )}
    </div>
  );
};

export default TimeSelector;
