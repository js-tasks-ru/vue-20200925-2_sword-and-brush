<template>
  <div class="page page_onboarding">
    <div class="container">
      <h1 class="page__title text-center">Вход</h1>
      <form @submit.prevent="submitEvent" class="form">
        <div class="form-group">
          <label class="form-label">Email</label>
          <div class="input-group">
            <input v-model="email" type="email" placeholder="demo@email" class="form-control" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Пароль</label>
          <div class="input-group">
            <input v-model="password" type="password" placeholder="password" class="form-control" />
          </div>
        </div>
        <div class="form__buttons">
          <button type="submit" class="button button_primary button_block">Войти
          </button>
        </div>
        <div class="form__append">Нет аккаунта?
          <router-link to="/register" class="link">Зарегистрируйтесь</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { login } from '../data';

export default {
  name: 'LoginPage',

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    async submitEvent() {
      if (this.email === '') {
        return alert('Требуется ввести Email');
      } else if (this.password === '') {
        return alert('Требуется ввести пароль');
      } else {
        let result = await login(this.email, this.password);
        alert(result.fullname ? result.fullname : result.message);
      }
    },
  },
};
</script>

<style scoped></style>
