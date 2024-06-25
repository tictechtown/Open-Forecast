import React from "react";
import { Chart } from "react-charts";
import { WeatherGridpoint } from "../../../types";
import { TimeFormatter } from "../../../utils/formatters";
import { convertMeasureValues } from "../../../utils/utils";

type Props = {
  probabilityPrecipitationValues: WeatherGridpoint["properties"]["probabilityOfPrecipitation"];
};

function RainForecast({ probabilityPrecipitationValues }: Props) {
  const probPeriods = convertMeasureValues(
    probabilityPrecipitationValues.values,
  );

  const currentTime = Date.now();

  const probNext24h = probPeriods
    .filter((p) => p.time.getTime() > currentTime - 3600 * 1000)
    .slice(0, 24);

  const data = [
    {
      label: "Prob",
      data: probNext24h,
    },
  ];
  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum: { time: Date }) => datum.time,
      hardMin: probNext24h[0].time,
      hardMax: probNext24h[probNext24h.length - 1].time,
      scaleType: "localTime",
      formatters: {
        scale: (data: Date) => TimeFormatter.format(data),
      },
    }),
    [probNext24h],
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum: { value: number | null }) => datum.value,
        stacked: true,
        formatters: {
          scale: (data: number) => `${data}%`,
        },
        hardMax: 100,
        min: 0,
        hardMin: 0,
      },
    ],
    [],
  );

  const isInDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <div className="rain-card">
      <h4>Percentage Rain Forecast</h4>
      <article style={{ minHeight: "200px" }}>
        <Chart
          options={{
            tooltip: false,
            useIntersectionObserver: false,
            data,
            // @ts-ignore
            primaryAxis,
            secondaryAxes,
            padding: 20,
            dark: isInDarkMode,
          }}
        />
      </article>
    </div>
  );
}

export default RainForecast;
