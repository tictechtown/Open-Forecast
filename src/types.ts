export type WeatherPoint = {
  "@context": string[];
  geometry: Point;
  id: string;
  properties: {
    "@id": string;
    "@type": string;
    county: string;
    cwa: string;
    fireWeatherZone: string;
    forecast: string;
    forecastGridData: string;
    forecastHourly: string;
    forecastOffice: string;
    forecastZone: string;
    gridId: string;
    gridX: number;
    gridY: number;
    observationStations: string;
    radarStation: string;
    relativeLocation: WeatherLocation;
    type: "Feature";
  };
};

type WeatherLocation = {
  geometry: Point;
  properties: {
    bearing: Measure;
    city: string;
    distance: Measure;
    state: string;
  };
};

type Point = {
  type: "Point";
  coordinates: LatLong;
};

type Measure = {
  unitCode: string;
  value: number | null;
};

export type WeatherFire = {
  id: string;
  type: "Feature";
  geometry: MultiPolygon;
  properties: {
    "@id": string;
    "@type": string;
    id: string;
    type: "fire";
    name: string;
    effectiveDate: string;
    expirationDate: string;
    state: string;
    forecastOffice: string;
    gridIdentifier: string;
    awipsLocationIdentifier: string;
    cwa: string[];
    forecaseOffices: string[];
    timeZone: string[];
    observationStations: string[];
    radarStation: string | null;
  };
};

type MultiPolygon = {
  type: "MultiPolygon";
  coordinates: LatLong[][][];
};

type Polygon = {
  type: "Polygon";
  coordinates: LatLong[][];
};

type LatLong = [number, number];

export type WeatherForecast = {
  "@context": string[];
  type: "Feature";
  geometry: Polygon | Point | MultiPolygon;
  properties: {
    units: "us";
    forecastGenerator: string;
    generatedAt: string;
    updateTime: string;
    validTimes: string;
    elevation: Measure; // m
    periods: ForecastPeriod[];
  };
};

export type ForecastPeriod = {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: "F" | "C";
  temperatureTrend: "";
  probabilityOfPrecipitation: Measure; // percent
  dewpoint: Measure; // degC
  relativeHumidity: Measure; // percent
  windspeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
};

export type WeatherGridpoint = {
  "@context": string[];
  id: string;
  type: "Feature";
  geometry: Polygon | Point | MultiPolygon;
  properties: {
    "@id": string;
    "@type": string;
    updateTime: string;
    validTimes: string;
    elevation: Measure;
    forecastOffice: string;
    gridId: string;
    gridX: number;
    gridY: number;
    temperature: MeasureValueList;
    dewpoint: MeasureValueList;
    maxTemperature: MeasureValueList;
    minTemperature: MeasureValueList;
    relativeHumidity: MeasureValueList;
    apparentTemperature: MeasureValueList;
    wetBulbGlobeTemperature: MeasureValueList;
    heatIndex: MeasureValueList;
    windChill: MeasureValueList;
    skyCover: MeasureValueList;
    windDirection: MeasureValueList;
    windSpeed: MeasureValueList;
    windGust: MeasureValueList;
    weather: {
      values: WeatherValue[];
    };
    hazards: {
      values: HazardValue[];
    };
    probabilityOfPrecipitation: MeasureValueList;
    quantitativePrecipitation: MeasureValueList;
    iceAccumulation: MeasureValueList;
    snowfallAmount: MeasureValueList;
    snowLevel: MeasureValueList;
    ceilingHeight: MeasureValueList;
    visibility: MeasureValueList;
    transportWindSpeed: MeasureValueList;
    transportWindDirection: MeasureValueList;
    mixingHeight: MeasureValueList;
    hainesIndex: MeasureValueList;
    lightningActivityLevel: MeasureValueList;
  };
};

type MeasureValueList = {
  uom: string;
  values: MeasureValue[];
};

export type MeasureValue = {
  validTime: string; // iso5601/PT1H (or different)
  value: number | null;
};

type WeatherValue = {
  validTime: string;
  value: {
    coverage: string | null;
    weather: string | null;
    intensity: string | null;
    visibility: Measure;
    attributes: string[];
  }[];
};

type HazardValue = {
  validTime: string;
  value: {
    phenomenom: string;
    significance: string;
    event_number: number | null;
  }[];
};

export enum WeatherCondition {
  Snow,
  Rain,
  LightRain,
  Thunder,
  Overcast,
  Cloudy,
  PartialSunny,
  AlmostSunny,
  Sunny,
  Clear,
}

export type CityData = {
  id: number;
  name: string;
  stateCode: string;
  lat: number;
  long: number;
};
