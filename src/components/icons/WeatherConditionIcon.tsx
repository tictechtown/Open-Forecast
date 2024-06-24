import { WeatherCondition } from "../../types";
import ClearNight from "./ClearNight";
import Cloudy from "./Cloudy";
import MostlyCloudy from "./MostlyCloudy";
import MostlySunny from "./MostlySunny";
import PartlyCloudy from "./PartlyCloudy";
import Rain from "./Rain";
import Sunny from "./Sunny";
import Thunder from "./Thunder";

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
