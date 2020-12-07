<template>
  <div class="page page_onboarding">
    <div class="container">
      <h1 class="page__title text-center">Регистрация</h1>
      <form @submit.prevent="submitEvent" class="form">
        <div class="form-group">
          <label class="form-label">Email</label>
          <div class="input-group">
            <input v-model="email" type="email" class="form-control" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Имя</label>
          <div class="input-group">
            <input v-model="fullName" type="text" class="form-control" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Пароль</label>
          <div class="input-group">
            <input v-model="password" type="password" class="form-control" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Повтор пароля</label>
          <div class="input-group">
            <input v-model="repeatedPassword" type="password" class="form-control" />
          </div>
        </div>
        <div class="form-group">
          <label class="checkbox"><input v-model="checked" type="checkbox" /> Я согласен с условиями
            <span></span></label>
        </div>
        <div class="form__buttons">
          <button type="submit" class="button button_primary">Зарегистрироваться</button>
        </div>
        <div class="form__append">Уже есть аккаунт? <a href="login.html" class="link">Войдите</a></div>
      </form>
    </div>
  </div>
</template>

<script>
import { register } from '../data';

export default {
  name: 'RegisterPage',

  data() {
    return {
      email: '',
      fullName: '',
      password: '',
      repeatedPassword: '',
      checked: false,
    };
  },

  methods: {
    async submitEvent() {
      if (this.email === '') {
        return alert('Требуется ввести Email');
      } else if (this.fullName === '') {
        alert('Требуется ввести полное имя');
      } else if (this.password === '') {
        alert('Требуется ввести пароль');
      } else if (this.password !== this.repeatedPassword) {
        alert('Пароли не совпадают');
      } else if (this.checked === false) {
        alert('Требуется согласиться с условиями');
      } else {
        let result = await register(this.email, this.fullName, this.password);
        alert(result.id ? result.id : result.message);
      }
    },
  },
};
</script>

<style scoped></style>
