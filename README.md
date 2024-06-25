# Open Forecast

A weather app built with Vite, React and Typescript.
Toy project to learn/re-learn CSS properties

## Features

- Display Location Weather using Weather.gov API
  - Manage Data Fetching using React-Query
- GeoLocation using custom Trie implementation
  - supports search with typo
  - **TODO** supports weighted results, using population
  - all locally, no 3rd-party service used
- Location Management using Zustand, with persistence on LocalStorage
- Adaptive Layout (mobile vs desktop)
- Animated Weather Icons, using CSS animations

## Architecture

```
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── public
│   ├── favicon.svg
│   └── us_cities.csv
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── WeatherApp.tsx
│   ├── assets
│   ├── hooks
│   │   └── useLocation.tsx
│   ├── main.tsx
│   ├── services
│   │   ├── prefix-tree.ts
│   │   └── weather.ts
│   ├── stores
│   │   └── useCityStore.tsx
│   ├── types.ts
│   ├── ui
│   │   ├── forecast
│   │   │   ├── LocationForecast.css
│   │   │   ├── LocationForecast.tsx
│   │   │   ├── WeatherLocationForecast.tsx
│   │   │   └── components
│   │   ├── icons
│   │   │   ├── WeatherConditionIcon.tsx
│   │   │   └── components
│   │   ├── layout
│   │   │   ├── Layout.css
│   │   │   └── Layout.tsx
│   │   └── search
│   │       ├── SearchBox.module.css
│   │       ├── SearchBox.tsx
│   │       ├── SearchModal.tsx
│   │       └── components
│   ├── utils
│   │   ├── converters.ts
│   │   └── formatters.ts
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Roadmap

- Add weighted search
- Remove city from list
- UI System Token
- Simplify rain forecast
- Update hourly forecast to dim night time
- Handle API errors
- Support Celsius/Farenheit settings
