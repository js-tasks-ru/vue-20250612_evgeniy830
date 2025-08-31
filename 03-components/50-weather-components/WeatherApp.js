import { defineComponent, ref } from 'vue'
import { getWeatherData } from './weather.service.ts'
import './WeatherApp.css'
import WeatherCard from './WeatherCard.js'

export default defineComponent({
  name: 'WeatherApp',

  components: {
    WeatherCard
  },

  setup() {
    const locationsData = ref(getWeatherData());

    return {
      locationsData,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <WeatherCard
          v-for="location in locationsData"
          :locationData="location"
        />
      </ul>
    </div>
  `,
})
