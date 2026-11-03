import React, { useState, useRef, useCallback, useEffect } from 'react';

// Defined once: a default array literal in the parameter list would be a new
// array on every render and re-trigger the values sync effect endlessly
const DEFAULT_VALUES = [20, 80];

// Centering is done with inline transforms instead of Tailwind translate
// classes: Tailwind v3 and v4 define those classes differently (transform vs
// translate), so on pages loading both the elements were offset twice
const CENTER_Y = { top: '50%', transform: 'translateY(-50%)' };
const CENTER_X = { left: '50%', transform: 'translateX(-50%)' };

const MultiSliderPro = ({
  values = DEFAULT_VALUES,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onChange,
  onChangeCommitted,
  showLabels = false,
  showValueLabels = false,
  formatLabel,
  trackColor = 'bg-gray-300',
  rangeColor = 'bg-blue-500',
  handleColor = 'bg-blue-500',
  labelColor = 'text-white',
  trackHeight = 'h-1',
  handleSize = 'w-5 h-5',
  containerHeight = 'h-10',
  marks = [],
  allowCross = false,
  pushable = 0,
  className = '',
  style = {},
  'aria-label': ariaLabel = 'Multi-range slider',
  'aria-labelledby': ariaLabelledBy,
}) => {
  const [localValues, setLocalValues] = useState(values);
  const [activeHandle, setActiveHandle] = useState(-1);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const handlesRef = useRef([]);

  // Sync with external values when their content changes (not on every new
  // array instance, e.g. an inline values={[20, 80]} in a re-rendering parent)
  const valuesKey = values.join(',');
  useEffect(() => {
    setLocalValues(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesKey]);

  const formatValue = useCallback((value) => {
    if (formatLabel) return formatLabel(value);
    return value.toString();
  }, [formatLabel]);

  const getValueFromPosition = useCallback((clientX) => {
    if (!sliderRef.current) return min;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawValue = min + percentage * (max - min);
    return Math.round(rawValue / step) * step;
  }, [min, max, step]);

  const getPositionFromValue = useCallback((value) => {
    return ((value - min) / (max - min)) * 100;
  }, [min, max]);

  const updateValue = useCallback((handleIndex, newValue) => {
    const clampedValue = Math.max(min, Math.min(max, newValue));
    let newValues = [...localValues];
    
    if (!allowCross) {
      // Prevent handles from crossing
      if (handleIndex > 0 && clampedValue < newValues[handleIndex - 1] + pushable) {
        newValues[handleIndex] = newValues[handleIndex - 1] + pushable;
      } else if (handleIndex < newValues.length - 1 && clampedValue > newValues[handleIndex + 1] - pushable) {
        newValues[handleIndex] = newValues[handleIndex + 1] - pushable;
      } else {
        newValues[handleIndex] = clampedValue;
      }
    } else {
      newValues[handleIndex] = clampedValue;
    }

    setLocalValues(newValues);
    onChange?.(newValues);
    return newValues;
  }, [localValues, allowCross, pushable, min, max, onChange]);

  const handleMouseDown = useCallback((e, handleIndex) => {
    if (disabled) return;
    
    e.preventDefault();
    setActiveHandle(handleIndex);
    setIsDragging(true);
    handlesRef.current[handleIndex]?.focus();
  }, [disabled]);

  const handleTouchStart = useCallback((e, handleIndex) => {
    if (disabled) return;
    
    e.preventDefault();
    setActiveHandle(handleIndex);
    setIsDragging(true);
    handlesRef.current[handleIndex]?.focus();
  }, [disabled]);

  const handleMove = useCallback((clientX) => {
    if (activeHandle === -1 || disabled) return;
    
    const newValue = getValueFromPosition(clientX);
    updateValue(activeHandle, newValue);
  }, [activeHandle, disabled, getValueFromPosition, updateValue]);

  const handleMouseMove = useCallback((e) => {
    handleMove(e.clientX);
  }, [handleMove]);

  const handleTouchMove = useCallback((e) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  }, [handleMove]);

  const handleEnd = useCallback(() => {
    if (activeHandle !== -1) {
      onChangeCommitted?.(localValues);
      setActiveHandle(-1);
      setIsDragging(false);
    }
  }, [activeHandle, localValues, onChangeCommitted]);

  const handleTrackClick = useCallback((e) => {
    if (disabled || isDragging) return;
    
    const newValue = getValueFromPosition(e.clientX);
    
    // Find closest handle
    let closestHandle = 0;
    let minDistance = Math.abs(localValues[0] - newValue);
    
    for (let i = 1; i < localValues.length; i++) {
      const distance = Math.abs(localValues[i] - newValue);
      if (distance < minDistance) {
        minDistance = distance;
        closestHandle = i;
      }
    }
    
    const newValues = updateValue(closestHandle, newValue);
    onChangeCommitted?.(newValues);
  }, [disabled, isDragging, getValueFromPosition, localValues, updateValue, onChangeCommitted]);

  const handleKeyDown = useCallback((e, handleIndex) => {
    if (disabled) return;
    
    const current = localValues[handleIndex];
    const largeStep = (max - min) / 10;
    let newValue;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(min, current - (e.shiftKey ? largeStep : step));
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(max, current + (e.shiftKey ? largeStep : step));
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      case 'PageDown':
        newValue = Math.max(min, current - largeStep);
        break;
      case 'PageUp':
        newValue = Math.min(max, current + largeStep);
        break;
      default:
        return;
    }

    e.preventDefault();
    // A key press is a complete change, so it is also committed
    const newValues = updateValue(handleIndex, newValue);
    onChangeCommitted?.(newValues);
  }, [disabled, localValues, min, max, step, updateValue, onChangeCommitted]);

  // Global event listeners
  useEffect(() => {
    if (activeHandle === -1) return;

    const handleMouseMoveGlobal = (e) => handleMouseMove(e);
    const handleTouchMoveGlobal = (e) => handleTouchMove(e);
    const handleMouseUpGlobal = () => handleEnd();
    const handleTouchEndGlobal = () => handleEnd();

    document.addEventListener('mousemove', handleMouseMoveGlobal);
    document.addEventListener('mouseup', handleMouseUpGlobal);
    document.addEventListener('touchmove', handleTouchMoveGlobal, { passive: false });
    document.addEventListener('touchend', handleTouchEndGlobal);

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveGlobal);
      document.removeEventListener('mouseup', handleMouseUpGlobal);
      document.removeEventListener('touchmove', handleTouchMoveGlobal);
      document.removeEventListener('touchend', handleTouchEndGlobal);
    };
  }, [activeHandle, handleMouseMove, handleTouchMove, handleEnd]);

  const sortedValues = [...localValues].sort((a, b) => a - b);
  const rangeLeft = getPositionFromValue(Math.min(...sortedValues));
  const rangeWidth = getPositionFromValue(Math.max(...sortedValues)) - rangeLeft;

  return (
    <div className={`w-full ${className}`} style={style}>
      {showLabels && (
        <div className="flex justify-between mb-2 text-sm text-gray-600">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>
      )}
      
      <div
        ref={sliderRef}
        className={`relative w-full ${containerHeight} flex items-center ${
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
        } select-none`}
        style={{ touchAction: 'none' }}
        onClick={handleTrackClick}
        // A group of sliders: each handle is its own role="slider"
        role="group"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
      >
        {/* Track */}
        <div className={`absolute w-full ${trackHeight} ${trackColor} rounded-full`} style={CENTER_Y} />

        {/* Range */}
        <div
          className={`absolute ${trackHeight} ${rangeColor} rounded-full`}
          style={{
            ...CENTER_Y,
            left: `${rangeLeft}%`,
            width: `${rangeWidth}%`,
          }}
        />

        {/* Marks */}
        {marks.map((mark) => (
          <div
            key={mark.value}
            className="absolute"
            style={{ top: '50%', left: `${getPositionFromValue(mark.value)}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-0.5 h-3 bg-gray-400" style={{ transform: 'translateY(-50%)' }} />
            {mark.label && (
              <div className="absolute top-full mt-1 text-xs text-gray-600 whitespace-nowrap" style={CENTER_X}>
                {mark.label}
              </div>
            )}
          </div>
        ))}

        {/* Handles */}
        {localValues.map((value, index) => (
          <div
            key={index}
            ref={(el) => (handlesRef.current[index] = el)}
            className={`absolute ${handleSize} ${handleColor} rounded-full border-2 border-white shadow-lg ${
              disabled 
                ? 'cursor-not-allowed' 
                : 'cursor-grab hover:shadow-xl focus:ring-4 focus:ring-blue-200 active:cursor-grabbing'
            } ${activeHandle === index ? 'ring-4 ring-blue-200' : ''} transition-all duration-200`}
            tabIndex={disabled ? -1 : 0}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-label={`${ariaLabel} handle ${index + 1}`}
            style={{ top: '50%', left: `${getPositionFromValue(value)}%`, transform: 'translate(-50%, -50%)' }}
            onMouseDown={(e) => handleMouseDown(e, index)}
            onTouchStart={(e) => handleTouchStart(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            {/* Value Label */}
            {showValueLabels && (activeHandle === index || !isDragging) && (
              <div className="absolute bottom-full mb-2" style={CENTER_X}>
                <div className={`px-2 py-1 bg-gray-800 ${labelColor} rounded text-xs whitespace-nowrap`}>
                  {formatValue(value)}
                  <div className="absolute top-full border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-800" style={CENTER_X} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showLabels && (
        <div className="flex gap-2 mt-2 flex-wrap">
          {localValues.map((value, index) => (
            <div
              key={index}
              className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-sm"
            >
              Handle {index + 1}: {formatValue(value)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSliderPro;