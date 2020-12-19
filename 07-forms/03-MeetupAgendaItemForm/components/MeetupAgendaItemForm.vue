<template>
  <div class="form-section form-section_inner">
    <button @click="$emit('remove')" type="button" class="remove-button">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <select
        class="form-control"
        title="Тип"
        v-model="localAgendaItem.type"
        @change="changeAgendaItem"
      >
        <option
          v-for="agendaType in agendaItemTypes"
          :key="agendaType.id"
          :value="agendaType.value"
        >
          {{ agendaType.text }}
        </option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input
            class="form-control"
            type="time"
            placeholder="00:00"
            v-model="localAgendaItem.startsAt"
            @change="changeAgendaItem"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input
            class="form-control"
            type="time"
            placeholder="00:00"
            v-model="localAgendaItem.endsAt"
            @change="changeAgendaItem"
          />
        </div>
      </div>
    </div>

    <div class="form-group">
      <label v-if="localAgendaItem.type === 'other'" class="form-label">Заголовок</label>
      <label v-else-if="localAgendaItem.type === 'talk'" class="form-label">Тема</label>
      <label v-else class="form-label">Нестандартный текст (необязательно)</label>
      <input class="form-control" v-model="localAgendaItem.title" @change="changeAgendaItem" />
    </div>

    <div v-if="localAgendaItem.type === 'talk'" class="form-group">
      <label class="form-label">Докладчик</label>
      <input class="form-control" v-model="localAgendaItem.speaker" @change="changeAgendaItem" />
    </div>

    <div v-if="!!(localAgendaItem.type === 'talk' || localAgendaItem.type === 'other')" class="form-group">
      <label class="form-label">Описание</label>
      <textarea
        class="form-control"
        v-model="localAgendaItem.description"
        @change="changeAgendaItem"
      ></textarea>
    </div>

    <div v-if="localAgendaItem.type === 'talk'" class="form-group">
      <label class="form-label">Язык</label>
      <select
        class="form-control"
        v-model="localAgendaItem.language"
        @change="changeAgendaItem"
      >
        <option
          v-for="languagesType in languages"
          :key="languagesType.id"
          :value="languagesType.value"
        >
          {{ languagesType.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

const getTalkLanguages = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

let idxCounter = 0;
let idxGen = () => idxCounter++;

export default {
  name: 'MeetupAgendaItemForm',

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      localAgendaItem: { ...this.agendaItem },
      talkLanguages: getTalkLanguages(),
      agendaItemTypesRaw: getAgendaItemTypes(),
    };
  },

  methods: {
    changeAgendaItem() {
      this.$emit('update:agendaItem', { ...this.localAgendaItem });
    },
  },

  computed: {
    agendaItemTypes() {
      return this.agendaItemTypesRaw.map((item) => ({
        ...item,
        id: idxGen(),
      }));
    },
    languages() {
      return this.talkLanguages.map((item) => ({
        ...item,
        id: idxGen(),
      }));
    },
    startAt() {
      return this.localAgendaItem.startsAt;
    },
  },
  watch: {
    startAt(newValue, oldValue) {
      let oldStartAtMinutes = oldValue.split(':').reduce((acc, value) => +acc * 60 + +value);
      let newStartAtMinutes = newValue.split(':').reduce((acc, value) => +acc * 60 + +value);
      let oldEndsMinutes = this.localAgendaItem.endsAt.split(':').reduce((acc, value) => +acc * 60 + +value);
      let newEndsAtMinutes = (oldEndsMinutes + (newStartAtMinutes - oldStartAtMinutes) + 24 * 60) % (24 * 60);

      let hours = (newEndsAtMinutes / 60).toFixed(0);
      let minutes = newEndsAtMinutes % 60;

      if (hours < 10) {
        hours = '0' + hours;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      this.localAgendaItem.endsAt = `${hours}:${minutes}`;
    },
  },
};
</script>

<style></style>
