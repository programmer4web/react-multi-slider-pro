import React, { useState } from 'react';
import MultiSliderPro from './MultiSlider';

export default function MultiSliderDemo() {
  const [values1, setValues1] = useState([20, 80]);
  const [values2, setValues2] = useState([10, 30, 70]);
  const [values3, setValues3] = useState([25, 75]);

  const marks = [
    { value: 0, label: '0%' },
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Multi-Range Slider Component Demo
        </h1>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Basic Two-Handle Slider
        </h2>
        <MultiSliderPro
          values={values1}
          onChange={setValues1}
          showLabels
          showValueLabels
          aria-label="Price range"
        />
        <p className="text-sm text-gray-600">
          Values: {values1.join(', ')}
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Three-Handle Slider with Custom Styling
        </h2>
        <MultiSliderPro
          values={values2}
          onChange={setValues2}
          showLabels
          showValueLabels
          rangeColor="bg-red-500"
          handleColor="bg-red-500"
          trackHeight="h-2"
          handleSize="w-6 h-6"
          formatLabel={(value) => `${value}%`}
          aria-label="Performance metrics"
        />
        <p className="text-sm text-gray-600">
          Values: {values2.join(', ')}
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Slider with Marks and Custom Range
        </h2>
        <MultiSliderPro
          values={values3}
          min={0}
          max={100}
          step={5}
          onChange={setValues3}
          showLabels
          marks={marks}
          rangeColor="bg-green-500"
          handleColor="bg-green-500"
          formatLabel={(value) => `$${value}`}
          aria-label="Budget range"
        />
        <p className="text-sm text-gray-600">
          Values: {values3.join(', ')}
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Disabled Slider
        </h2>
        <MultiSliderPro
          values={[30, 70]}
          disabled
          showLabels
          showValueLabels
          aria-label="Disabled range"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Advanced Example: Price Range Filter
        </h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          <MultiSliderPro
            values={[250, 750]}
            min={0}
            max={1000}
            step={50}
            onChange={(values) => console.log('Price range changed:', values)}
            onChangeCommitted={(values) => console.log('Final price range:', values)}
            showLabels
            showValueLabels
            rangeColor="bg-purple-500"
            handleColor="bg-purple-500"
            trackHeight="h-2"
            handleSize="w-6 h-6"
            formatLabel={(value) => `$${value}`}
            marks={[
              { value: 0, label: '$0' },
              { value: 250, label: '$250' },
              { value: 500, label: '$500' },
              { value: 750, label: '$750' },
              { value: 1000, label: '$1000' },
            ]}
            aria-label="Product price range filter"
          />
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Keyboard Controls
        </h2>
        <div className="text-sm text-gray-600 space-y-1">
          <div>• <strong>Arrow keys:</strong> Move handle by step size</div>
          <div>• <strong>Shift + Arrow keys:</strong> Move handle by large step (10% of range)</div>
          <div>• <strong>Home/End:</strong> Move to min/max values</div>
          <div>• <strong>Page Up/Down:</strong> Move by large step</div>
          <div>• <strong>Tab:</strong> Navigate between handles</div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Component Features
        </h2>
        <div className="text-sm text-gray-600 space-y-2">
          <div>✅ <strong>Multiple handles:</strong> Support for 2+ handles</div>
          <div>✅ <strong>Keyboard navigation:</strong> Full keyboard support</div>
          <div>✅ <strong>Mobile friendly:</strong> Touch events and responsive design</div>
          <div>✅ <strong>Accessibility:</strong> ARIA labels and screen reader support</div>
          <div>✅ <strong>Customizable:</strong> Colors, sizes, formatting, and behavior</div>
          <div>✅ <strong>Marks support:</strong> Visual indicators with custom labels</div>
          <div>✅ <strong>Handle constraints:</strong> Prevent crossing and set minimum distance</div>
          <div>✅ <strong>Event callbacks:</strong> onChange and onChangeCommitted</div>
        </div>
      </div>
    </div>
  );
}