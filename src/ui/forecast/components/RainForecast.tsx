import React from "react";
import { Chart } from "react-charts";
import { WeatherGridpoint } from "../../../types";
import { TimeFormatter } from "../../../utils/formatters";
import { convertMeasureValues } from "../../../utils/utils";

type Props = {
  precipitationValues: WeatherGridpoint["properties"]["quantitativePrecipitation"];
  probabilityPrecipitationValues: WeatherGridpoint["properties"]["probabilityOfPrecipitation"];
};

function RainForecast({
  precipitationValues,
  probabilityPrecipitationValues,
}: Props) {
  // const rainPeriods = convertMeasureValues(precipitationValues.values);
  const probPeriods = convertMeasureValues(
    probabilityPrecipitationValues.values,
  );

  const currentTime = Date.now();

  // const rainNext24h = rainPeriods
  //   .filter((p) => p.time.getTime() > currentTime - 3600 * 1000)
  //   .slice(0, 24);
  const probNext24h = probPeriods
    .filter((p) => p.time.getTime() > currentTime - 3600 * 1000)
    .slice(0, 24);

  const data = [
    // {
    //   label: "Rain",
    //   data: rainNext24h,
    // },
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
        hardMax: 100,
        hardMin: 0,
      },
    ],
    [],
  );

  return (
    <div className="rain-card">
      <h4>Percentage Rain Forecast</h4>
      <article style={{ minHeight: "200px" }}>
        <Chart
          options={{
            tooltip: false,
            useIntersectionObserver: false,
            data,
            primaryAxis,
            secondaryAxes,
            padding: 20,
          }}
        />
      </article>
    </div>
  );
}

export default RainForecast;
