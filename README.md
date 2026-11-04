# MultiSliderPro Component

A fully customizable, accessible React multi-range slider component with keyboard support and mobile compatibility.

[Full Documentation](https://evaficy.com/multisliderpro-complete-documentation-guide/)

> Built by **[EVAFICY](https://evaficy.com/?utm_source=oss&utm_medium=readme&utm_campaign=react-multi-slider-pro)**, a web development company from Iasi, Romania, with 10+ years building React, TypeScript and Node.js applications. Need custom React components or a full web application? [Contact EVAFICY](https://evaficy.com/contact-evaficy/?utm_source=oss&utm_medium=readme&utm_campaign=react-multi-slider-pro).

## Features

- ✅ **Multiple Handles**: Support for 2 or more handles
- ✅ **Keyboard Navigation**: Full keyboard support with arrow keys, home/end, page up/down
- ✅ **Mobile Friendly**: Touch events and responsive design
- ✅ **Accessibility**: ARIA labels, screen reader support, and keyboard navigation
- ✅ **Fully Customizable**: Colors, sizes, formatting, and behavior via props
- ✅ **Marks Support**: Visual indicators with custom labels
- ✅ **Handle Constraints**: Prevent crossing and set minimum distance between handles
- ✅ **Event Callbacks**: `onChange` and `onChangeCommitted` events
- ✅ **TypeScript**: Type declarations included

## Installation

```bash
npm i react-multi-slider-pro
# or
yarn add react-multi-slider-pro
```

## Basic Usage

```jsx
import React, { useState } from 'react';
import { MultiSliderPro } from 'react-multi-slider-pro';
import 'react-multi-slider-pro/dist/index.css';

function App() {
  const [values, setValues] = useState([20, 80]);

  return (
    <div>
      <MultiSliderPro
        values={values}
        onChange={setValues}
        min={0}
        max={100}
        showLabels
        showValueLabels
      />
      <p>Selected range: {values[0]} - {values[1]}</p>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `values` | `number[]` | `[20, 80]` | Array of handle values |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step size for value changes |
| `disabled` | `boolean` | `false` | Disable the slider |
| `onChange` | `(values: number[]) => void` | - | Called when values change |
| `onChangeCommitted` | `(values: number[]) => void` | - | Called when user finishes changing values: drag released, track click, or key press |
| `showLabels` | `boolean` | `false` | Show min/max labels and value chips |
| `showValueLabels` | `boolean` | `false` | Show value labels above handles |
| `formatLabel` | `(value: number) => string` | - | Custom value formatting function |
| `trackColor` | `string` | `'bg-gray-300'` | Tailwind class for track color |
| `rangeColor` | `string` | `'bg-blue-500'` | Tailwind class for range color |
| `handleColor` | `string` | `'bg-blue-500'` | Tailwind class for handle color |
| `labelColor` | `string` | `'text-white'` | Tailwind class for label text color |
| `trackHeight` | `string` | `'h-1'` | Tailwind class for track height |
| `handleSize` | `string` | `'w-5 h-5'` | Tailwind class for handle size |
| `containerHeight` | `string` | `'h-10'` | Tailwind class for container height |
| `marks` | `Mark[]` | `[]` | Array of marks to display |
| `allowCross` | `boolean` | `false` | Allow handles to cross each other |
| `pushable` | `number` | `0` | Minimum distance between handles |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `object` | `{}` | Inline styles |
| `aria-label` | `string` | `'Multi-range slider'` | Accessibility label |
| `aria-labelledby` | `string` | - | ID of element that labels the slider |

### Mark Object

```typescript
interface Mark {
  value: number;
  label?: string;
}
```

## Examples

### Basic Two-Handle Range Slider

```jsx
const [priceRange, setPriceRange] = useState([25, 75]);

<MultiSliderPro
  values={priceRange}
  onChange={setPriceRange}
  min={0}
  max={100}
  showLabels
  showValueLabels
  formatLabel={(value) => `$${value}`}
  aria-label="Price range selector"
/>
```

### Three-Handle Slider with Custom Styling

```jsx
const [values, setValues] = useState([20, 50, 80]);

<MultiSliderPro
  values={values}
  onChange={setValues}
  rangeColor="bg-red-500"
  handleColor="bg-red-500"
  trackHeight="h-2"
  handleSize="w-6 h-6"
  showValueLabels
/>
```

### Slider with Marks

```jsx
const marks = [
  { value: 0, label: 'Min' },
  { value: 25, label: '25%' },
  { value: 50, label: 'Mid' },
  { value: 75, label: '75%' },
  { value: 100, label: 'Max' }
];

<MultiSliderPro
  values={[30, 70]}
  marks={marks}
  showLabels
  step={5}
/>
```

### Controlled vs Uncontrolled

```jsx
// Controlled (recommended)
const [values, setValues] = useState([20, 80]);
<MultiSliderPro values={values} onChange={setValues} />

// With commit handler for API calls
<MultiSliderPro
  values={values}
  onChange={setValues} // Real-time updates
  onChangeCommitted={(finalValues) => {
    // Call API when user finishes dragging
    updateFilters(finalValues);
  }}
/>
```

## Keyboard Controls

| Key | Action |
|-----|--------|
| `←` `↓` | Move handle left/down by step |
| `→` `↑` | Move handle right/up by step |
| `Shift + ←↓→↑` | Move handle by large step (10% of range) |
| `Home` | Move handle to minimum value |
| `End` | Move handle to maximum value |
| `Page Down` | Move handle down by large step |
| `Page Up` | Move handle up by large step |
| `Tab` | Navigate between handles |

## Accessibility

The component follows WAI-ARIA guidelines:

- Each handle has `role="slider"`
- Proper `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` attributes
- Keyboard navigation support
- Screen reader announcements
- Focus management

```jsx
<MultiSliderPro
  aria-label="Temperature range"
  aria-labelledby="temp-label"
  values={[18, 24]}
/>
```

## Styling Customization

The styles ship as a separate CSS file. Import it once, for example in your app entry or root component:

```jsx
import 'react-multi-slider-pro/dist/index.css';
```

The stylesheet is built with Tailwind CSS and includes Tailwind's base styles (a CSS reset). It contains the classes used by the component and its defaults. If you pass other Tailwind classes to the color and size props (for example `rangeColor="bg-teal-600"`), your project's own Tailwind CSS setup needs to generate them.

The component uses Tailwind CSS classes for styling. You can customize:

### Colors
```jsx
<MultiSliderPro
  trackColor="bg-gray-200"
  rangeColor="bg-purple-500"
  handleColor="bg-purple-600"
/>
```

### Sizes
```jsx
<MultiSliderPro
  trackHeight="h-3"
  handleSize="w-8 h-8"
  containerHeight="h-12"
/>
```

### Custom CSS
```jsx
<MultiSliderPro
  className="my-custom-slider"
  style={{ marginTop: '20px' }}
/>
```

## Handle Behavior

### Prevent Crossing
```jsx
<MultiSliderPro
  allowCross={false} // Handles cannot pass each other
  pushable={5}       // Minimum 5-unit gap between handles
/>
```

### Allow Crossing
```jsx
<MultiSliderPro
  allowCross={true} // Handles can cross each other
/>
```

## Browser Support

- Chrome/Chromium 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

- React 16.8+ (hooks support)
- Tailwind CSS in your project only if you use custom color/size classes (see Styling Customization)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use in your projects!

## Support This Project

If you find this component helpful, please consider supporting its development:

### 💖 Sponsor the Project
Your sponsorship helps maintain and improve this component. Support the developer:
- [GitHub Sponsors](https://github.com/sponsors/programmer4web) - One-time or monthly support

### 🌟 Other Ways to Help
- ⭐ Star this repository on GitHub
- 🐛 Report bugs and issues
- 💡 Suggest new features and improvements
- 📢 Share this component with others
- 💻 Contribute code improvements

**Your support makes a difference!** Every contribution helps keep this project alive and continuously improved.

## Changelog

- **1.1.1** - README: EVAFICY credit and contact links.
### v1.1.0
- Handles no longer snap back while dragging when `values` is passed as an inline array (e.g. `values={[20, 80]}`), and the slider no longer re-renders endlessly when `values` is omitted
- `onChangeCommitted` receives the new values after a track click (it received the previous ones), and is now also called after keyboard changes
- Track, handles and labels are centered correctly on pages that also load Tailwind CSS v4 styles
- Screen readers see each handle as a slider inside a labelled group (the track itself was announced as an extra slider)
- Importing the package during server-side rendering no longer crashes ("document is not defined")
- TypeScript declarations included
- Build tooling updated

### v1.0.0
- Initial release
- Multiple handle support
- Keyboard navigation
- Mobile touch support
- Full accessibility
- Customizable styling
- Marks support

---

Made by [EVAFICY](https://evaficy.com/?utm_source=oss&utm_medium=readme&utm_campaign=react-multi-slider-pro): custom React & Node.js development, full-stack applications and AI-powered QA with Evaficy Smart Test. [Get in touch](https://evaficy.com/contact-evaficy/?utm_source=oss&utm_medium=readme&utm_campaign=react-multi-slider-pro).
