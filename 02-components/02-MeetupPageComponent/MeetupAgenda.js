import { MeetupAgendaItem } from './MeetupAgendaItem.js';

export const MeetupAgenda = {
  name: 'MeetupAgenda',

  template: `
    <div class="meetup-agenda">
    <p v-if="!agenda.length" class="meetup-agenda__empty">Программа пока пуста, но когда-нибудь в ней обязательно что-нибудь появится!</p>
    <template v-else>
      <div v-for="agendaItem in agenda" class="meetup-agenda__item">
        <meetup-agenda-item :agendaItem="agendaItem"></meetup-agenda-item>
      </div>
    </template>
    </div>`,

  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },
};
