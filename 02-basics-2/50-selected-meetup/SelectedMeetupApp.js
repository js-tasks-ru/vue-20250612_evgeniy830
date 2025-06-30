import { defineComponent, ref, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const maxId = 5
    const selectedId = ref(1)
    const meetupData = ref(null)

    watch(
      selectedId,
      async newValue => {
        meetupData.value = await getMeetup(newValue)
      },
      { immediate: true },
    )

    return {
      maxId,
      selectedId,
      meetupData,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button
          class="button button--secondary"
          type="button"
          :disabled="selectedId <= 1"
          @click="selectedId--"
        >Предыдущий
        </button>

        <div class="radio-group" role="radiogroup">
          <div
            class="radio-group__button"
            v-for="id in maxId"
            :key="id"
          >
            <input
              :id="\`meetup-id-\${id}\`"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              @change="selectedId = id"
              :checked="selectedId === id"
            />
            <label
              class="radio-group__label"
              :for="\`meetup-id-\${id}\`"
            >
              {{ id }}
            </label>
          </div>
        </div>

        <button
          class="button button--secondary"
          type="button"
          :disabled="selectedId >= maxId"
          @click="selectedId++"
        >
          Следующий
        </button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1
            class="meetup-cover__title"
            v-if="meetupData"
          >
            {{ meetupData.title }}
          </h1>
        </div>
      </div>

    </div>
  `,
})
