import React from 'react';

export interface Mark {
  value: number;
  label?: string;
}

export interface MultiSliderProProps {
  /** Handle values (default: [20, 80]) */
  values?: number[];
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  /** Called on every change while dragging, clicking or using the keyboard */
  onChange?: (values: number[]) => void;
  /** Called when a change is complete: drag released, track click or key press */
  onChangeCommitted?: (values: number[]) => void;
  /** Show min/max labels and value chips */
  showLabels?: boolean;
  /** Show value labels above handles */
  showValueLabels?: boolean;
  formatLabel?: (value: number) => string;
  /** Tailwind class for the track color (default: 'bg-gray-300') */
  trackColor?: string;
  /** Tailwind class for the range color (default: 'bg-blue-500') */
  rangeColor?: string;
  /** Tailwind class for the handle color (default: 'bg-blue-500') */
  handleColor?: string;
  /** Tailwind class for the value label text color (default: 'text-white') */
  labelColor?: string;
  /** Tailwind class for the track height (default: 'h-1') */
  trackHeight?: string;
  /** Tailwind classes for the handle size (default: 'w-5 h-5') */
  handleSize?: string;
  /** Tailwind class for the container height (default: 'h-10') */
  containerHeight?: string;
  marks?: Mark[];
  /** Allow handles to cross each other (default: false) */
  allowCross?: boolean;
  /** Minimum distance between handles (default: 0) */
  pushable?: number;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export declare const MultiSliderPro: React.FC<MultiSliderProProps>;

// Demo component
export declare const MultiSliderProDemo: React.FC;
