import { computed, defineComponent } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
      required: true,
    },

    min: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: Infinity,
    },
  },

  setup(props, { emit }) {
    const isDecrementAvailable = computed(() => props.count > props.min)
    const isIncrementAvailable = computed(() => props.count < props.max)

    const decrement = () => {
      if (isDecrementAvailable.value) {
        emit('update:count', props.count - 1)
      }
    }

    const increment = () => {
      if (isIncrementAvailable.value) {
        emit('update:count', props.count + 1)
      }
    }

    return {
      decrement,
      increment,
      isDecrementAvailable,
      isIncrementAvailable,
    }
  },

  template: `
    <div class="counter">
      <UiButton :disabled="!isDecrementAvailable" aria-label="Decrement" @click.stop="decrement">➖</UiButton>
      <span class="count" data-testid="count">{{ count }}</span>
      <UiButton :disabled="!isIncrementAvailable" aria-label="Increment" @click.stop="increment">➕</UiButton>
    </div>
  `,
})
