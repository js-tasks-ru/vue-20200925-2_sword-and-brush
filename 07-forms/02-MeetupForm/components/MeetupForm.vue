<template>
  <form @submit.prevent="submitRecentData" class="form meetup-form">
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <div class="form-group">
          <label class="form-label">Название</label>
          <input class="form-control" v-model="localMeetup.title" />
        </div>
        <div class="form-group">
          <label class="form-label">Дата</label>
          <input class="form-control" type="date" v-model="localMeetup.date" />
        </div>
        <div class="form-group">
          <label class="form-label">Место</label>
          <input class="form-control" v-model="localMeetup.place" />
        </div>
        <div class="form-group">
          <label class="form-label">Описание</label>
          <textarea class="form-control" rows="3" v-model="localMeetup.description"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Изображение</label>
          <image-uploader :value="localMeetup.imageId" @change="localMeetup.imageId = $event" />
        </div>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>
      <meetup-agenda-item-form
        class="mb-3"
        v-for="(agendaItem, idx) in localMeetup.agenda"
        :key="agendaItem.id"
        :agenda-item.sync="localMeetup.agenda[idx]"
        @remove="removeAgendaItem(idx)" />

      <div class="form-section_append">
        <button @click="addAgendaItem" type="button" data-test="addAgendaItem">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <button
          @click="$emit('cancel')"
          class="button button_secondary button_block"
          type="button"
          data-test="cancel">
          Отмена
        </button>
        <button class="button button_primary button_block" type="submit"
                data-test="submit">
          {{ submitText }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import ImageUploader from './ImageUploader';

function buildAgendaItem() {
  return {
    id: Math.random(),
    startsAt: '00:00',
    endsAt: '00:00',
    type: 'other',
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}

function deepClone(a) {
  return JSON.parse(JSON.stringify(a));
}

export default {
  name: 'MeetupForm',

  components: {
    ImageUploader,
    MeetupAgendaItemForm,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
    submitText: String,
  },

  model: {
    prop: 'value',
    event: 'change',
  },

  data() {
    return {
      localMeetup: deepClone(this.meetup),
    };
  },

  methods: {
    submitRecentData() {
      this.$emit('submit', deepClone(this.localMeetup));
    },
    addAgendaItem() {
      let newItem = buildAgendaItem();

      if (this.localMeetup.agenda.length) {
        let agendaList = this.localMeetup.agenda;
        let endsAt = agendaList[agendaList.length - 1].endsAt;
        this.localMeetup.agenda.push({ ...newItem, startsAt: endsAt });
      } else {
        this.localMeetup.agenda.push(newItem);
      }
    },
    removeAgendaItem(idx) {
      this.localMeetup.agenda.splice(idx, 1);
    },
  },
};
</script>

<style scoped>
.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside_stick > .button {
  margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside_stick {
    position: sticky;
    top: 32px;
  }
}
</style>
