# Open Forecast

A weather app built with [Vite](https://vitejs.dev/), [React](https://react.dev/) and [Typescript](https://www.typescriptlang.org/).

Toy project to learn/re-learn CSS properties

## Features

- Display Location Weather using Weather.gov API
  - Manage Data Fetching using [React-Query](https://tanstack.com/query/v3)
- GeoLocation using custom Trie implementation
  - supports search with typo
  - **TODO** supports weighted results, using population
  - search is completely local, no 3rd-party service used
- Location Management using [Zustand](https://github.com/pmndrs/zustand), with persistence on LocalStorage
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
│   │   ├── common
│   │   │   ├── Loader.module.css
│   │   │   └── Loader.tsx
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
│   │   │   ├── Layout.tsx
│   │   │   └── components
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
- Simplify rain forecast
- Update hourly forecast to dim night time
- Support Celsius/Farenheit settings
