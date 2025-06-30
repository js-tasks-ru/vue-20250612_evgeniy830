import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const minValue = 0;
    const maxValue = 5;
    const currentValue = ref(minValue);

    const increment = () => currentValue.value < maxValue && currentValue.value++;
    const decrement = () => currentValue.value > minValue && currentValue.value--;

    return {
      minValue,
      maxValue,
      currentValue,

      increment,
      decrement,
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="currentValue === minValue"
        @click="decrement"
      >➖</button>

      <span class="count" data-testid="count">{{ currentValue }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="currentValue === maxValue"
        @click="increment"
      >➕</button>
    </div>
  `,
})
