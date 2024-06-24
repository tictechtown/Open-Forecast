import { WeatherCondition } from "../../types";
import ClearNight from "./components/ClearNight";
import Cloudy from "./components/Cloudy";
import MostlyCloudy from "./components/MostlyCloudy";
import MostlySunny from "./components/MostlySunny";
import PartlyCloudy from "./components/PartlyCloudy";
import Rain from "./components/Rain";
import Sunny from "./components/Sunny";
import Thunder from "./components/Thunder";

type Props = {
  condition: WeatherCondition;
};

function WeatherConditionIcon({ condition }: Props) {
  switch (condition) {
    case WeatherCondition.AlmostSunny:
      return <MostlySunny />;
    case WeatherCondition.Clear:
      return <ClearNight />;
    case WeatherCondition.Cloudy:
      return <Cloudy />;
    case WeatherCondition.LightRain:
      return <Rain />;
    case WeatherCondition.Rain:
      return <Rain />;
    case WeatherCondition.Overcast:
      return <MostlyCloudy />;
    case WeatherCondition.PartialSunny:
      return <PartlyCloudy />;
    case WeatherCondition.Snow:
      return <Cloudy />; // TODO
    case WeatherCondition.Sunny:
      return <Sunny />;
    case WeatherCondition.Thunder:
      return <Thunder />;
  }
}

export default WeatherConditionIcon;
