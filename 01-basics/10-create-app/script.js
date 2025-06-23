import { defineComponent, createApp } from 'vue'

const App = defineComponent({
  name: 'App',

  setup() {
    return {
      currentDate: new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' }),
    }
  },

  template: `
  <div>
    Сегодня {{ currentDate }}
  </div>
  `
})

const app = createApp(App);
app.mount('#app');
