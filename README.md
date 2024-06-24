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
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   ├── main.tsx
│   ├── service
│   │   ├── prefix-tree.ts
│   │   └── weather.ts
│   ├── store
│   │   └── useCityStore.tsx
│   ├── types.ts
│   ├── ui
│   │   ├── common
│   │   ├── forecast
│   │   │   ├── LocationForecast.css
│   │   │   ├── LocationForecast.tsx
│   │   │   └── components/
│   │   ├── icons
│   │   │   ├── WeatherConditionIcon.tsx
│   │   │   └── components/
│   │   ├── layout
│   │   │   ├── Layout.css
│   │   │   └── Layout.tsx
│   │   └── search
│   │       ├── SearchBox.module.css
│   │       ├── SearchBox.tsx
│   │       ├── SearchModal.tsx
│   │       └── components/
│   ├── utils
│   │   └── utils.ts
│   └── vite-env.d.ts
```

## Roadmap

- Add current location (geolocation API)
- Add weighted search
- Remove city from list
- UI System Token
- Simplify rain forecast
- Update hourly forecast to dim night time
- Dark Mode support
- Handle API errors
- Support Celsius/Farenheit settings
