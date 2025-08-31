import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherDetails',

  props: {
    locationData: {
      type: Object,
      required: true,
      validator: (object) =>
        object.hasOwnProperty('pressure') ||
        object.hasOwnProperty('humidity') ||
        object.hasOwnProperty('clouds') ||
        object.hasOwnProperty('wind_speed')
    }
  },

  setup() {
    const convertMpaToMmHg = (mpa) => (mpa * 0.75).toFixed(0);

    return {
      convertMpaToMmHg
    }
  },

  template: `
    <div class="weather-details">
      <div class="weather-details__item"
        v-if="locationData.pressure"
      >
        <div class="weather-details__item-label">Давление, мм рт. ст.</div>
        <div class="weather-details__item-value">{{ convertMpaToMmHg(locationData.pressure) }}</div>
      </div>

      <div class="weather-details__item"
        v-if="locationData.humidity"
      >
        <div class="weather-details__item-label">Влажность, %</div>
        <div class="weather-details__item-value">{{ locationData.humidity }}</div>
      </div>

      <div class="weather-details__item"
        v-if="locationData.clouds"
      >
        <div class="weather-details__item-label">Облачность, %</div>
        <div class="weather-details__item-value">{{ locationData.clouds }}</div>
      </div>

      <div class="weather-details__item"
        v-if="locationData.wind_speed"
      >
        <div class="weather-details__item-label">Ветер, м/с</div>
        <div class="weather-details__item-value">{{ locationData.wind_speed }}</div>
      </div>
    </div>
  `,
})
