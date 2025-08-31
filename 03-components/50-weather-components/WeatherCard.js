import { defineComponent } from 'vue'
import WeatherAlert from './WeatherAlert'
import WeatherConditions from './WeatherConditions.js'
import WeatherDetails from './WeatherDetails.js'

export default defineComponent({
  name: 'WeatherCard',

  components: {
    WeatherAlert,
    WeatherConditions,
    WeatherDetails
  },

  props: {
    locationData: {
      type: Object,
      required: true,
      validator: (obj) => obj.geographic_name && obj.current
    },
  },

  setup() {
    const isNighttime = (current) => current.dt < current.sunrise || current.dt >= current.sunset;

    return {
      isNighttime
    }
  },

  template: `
    <li class="weather-card"
        :class="{ 'weather-card--night' : isNighttime(locationData.current) }"
    >
      <WeatherAlert
        v-if="locationData.alert"
        :alert="locationData.alert"
      />
      <div>
        <h2 class="weather-card__name">
          {{ locationData.geographic_name }}
        </h2>
        <div class="weather-card__time">
          {{ locationData.current.dt }}
        </div>
      </div>
      <WeatherConditions
        :condition="locationData.current.weather"
        :temperature="locationData.current.temp"
      />
      <WeatherDetails
        :locationData="locationData.current"
      />
    </li>
  `,
})
