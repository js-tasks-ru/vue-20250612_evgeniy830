import { defineComponent } from 'vue'
import { UiAlert, UiContainer } from '@shgk/vue-course-ui'
import MeetupAgenda from './MeetupAgenda.js'
import MeetupDescription from './MeetupDescription.js'
import MeetupCover from './MeetupCover.js'
import MeetupInfo from './MeetupInfo.js'
import './MeetupView.css'

export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupDescription,
    MeetupAgenda,
    MeetupCover,
    MeetupInfo
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>

      <MeetupCover
        :title="meetup.title"
        :image="meetup.image"
      />

      <UiContainer>
        <div class="meetup">
          <div class="meetup__content">

            <h2>Описание</h2>
            <MeetupDescription
              :description="meetup.description"
            />

            <h2>Программа</h2>
            <MeetupAgenda
              v-if="meetup.agenda.length"
              :agenda="meetup.agenda"
            />
            <UiAlert
              v-else
              text="Программа пока пуста..."
            />

          </div>
          <div class="meetup__aside">

            <MeetupInfo
              :organizer="meetup.organizer"
              :place="meetup.place"
              :date="meetup.date"
            />

            <div class="meetup__aside-buttons"></div>
          </div>
        </div>
      </UiContainer>
    </div>
  `,
})
