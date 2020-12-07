<template>
  <div class="form_layout">
    <h1>{{ title }}</h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FormLayout',
  props: {
    title: String,
  },
};
</script>

<style scoped>
.form_layout {
  text-align: center;
  background-color: var(--grey);
}

.form_layout h1 {
  padding: 10px;
}
</style>
