import {computed, defineComponent } from 'vue'
import WeatherAlert from './WeatherAlert'
import WeatherDetails from './WeatherDetails.js'
import { WeatherConditionIcons } from "./weather.service.js";

export default defineComponent({
  name: 'WeatherConditions',

  components: {
    WeatherAlert,
    WeatherDetails
  },

  props: {
    condition: {
      type: Object,
      required: true
    },

    temperature: {
      type: Number,
      required: true
    }
  },

  setup(props) {
    const convertKelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(1);

    const celsiusTemperature = computed(() => (convertKelvinToCelsius(props.temperature)));
    const conditionIcon = computed(() => WeatherConditionIcons[props.condition.id]);

    return {
      conditionIcon,
      celsiusTemperature
    }
  },

  template: `
      <div class="weather-conditions">
        <div class="weather-conditions__icon" :title="condition.description">{{ conditionIcon }}️</div>
        <div class="weather-conditions__temp">{{ celsiusTemperature }} °C</div>
      </div>
  `,
})
