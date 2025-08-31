import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    const timeString = ref('');
    let updateIntervalId;

    const updateTime = () => {
      timeString.value = new Date().toLocaleTimeString(navigator.language, { timeStyle: 'medium' });
    }

    onMounted(() => {
      updateTime();
      updateIntervalId = setInterval(updateTime, 1000);
    })

    onUnmounted(() => {
      clearInterval(updateIntervalId);
    })

    return {
      timeString,
    }
  },

  template: `
    <div class="clock">
        {{ timeString }}
    </div>
  `,
})
