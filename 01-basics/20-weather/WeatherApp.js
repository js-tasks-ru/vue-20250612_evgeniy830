import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const locationsData = getWeatherData();

    const convertKelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(1);
    const convertMpaToMmHg = (mpa) => (mpa * 0.75).toFixed(0);
    const isNighttime = (current) => current.dt < current.sunrise || current.dt >= current.sunset;

    return {
      WeatherConditionIcons,

      locationsData,

      convertKelvinToCelsius,
      convertMpaToMmHg,
      isNighttime
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li
          class="weather-card"
          v-for="locationData in locationsData"
          :class="{ 'weather-card--night' : isNighttime(locationData.current) }"
        >
          <div class="weather-alert" v-if="locationData.alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ locationData.alert.sender_name }}: {{ locationData.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ locationData.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ locationData.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon"
                 :title="locationData.current.weather.description">
              {{ WeatherConditionIcons[locationData.current.weather.id] }}
            </div>
            <div class="weather-conditions__temp">{{ convertKelvinToCelsius(locationData.current.temp) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ convertMpaToMmHg(locationData.current.pressure) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ locationData.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ locationData.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ locationData.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
