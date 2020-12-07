<template>
  <div class="container">
    <meetups-view v-bind.sync="params" />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

export default {
  name: 'PageWithQuery',
  components: { MeetupsView },

  data() {
    return {
      params: {
        view: (this.$route.query.view) ? this.$route.query.view : 'list',
        date: (this.$route.query.date) ? this.$route.query.date : 'all',
        participation: (this.$route.query.participation) ? this.$route.query.participation : 'all',
        search: (this.$route.query.search) ? this.$route.query.search : '',
      },
    };
  },

  methods: {
    formQuery() {
      let queryString = {};

      if (this.params.date !== 'all') {
        queryString.date = this.params.date;
      }
      if (this.params.participation !== 'all') {
        queryString.participation = this.params.participation;
      }
      if (this.params.search !== '') {
        queryString.search = this.params.search;
      }
      if (this.params.view !== 'list') {
        queryString.view = this.params.view;
      }
      return { query: queryString };
    },
  },

  watch: {
    getQueryParam() {
      this.params.view = this.getQueryParam.view;
      this.params.date = this.getQueryParam.date;
      this.params.participation = this.getQueryParam.participation;
      this.params.search = this.getQueryParam.search;
    },
    params: {
      handler() {
        this.$router.push(this.formQuery()).then((route) => {
          if (route.path === this.$route.path) {
            throw new Error('NavigationDuplicated');
          }
        }).catch(() => {
          console.log('%cNavigationDuplicated', 'background: red; color: black');
        });
      },
      deep: true,
    },
  },
  computed: {
    getQueryParam() {
      return this.$route.query;
    },
  },
};
</script>

<style scoped></style>
