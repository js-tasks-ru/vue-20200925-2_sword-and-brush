<template>
  <div>
    <the-header />
    <main>
      <slot></slot>
    </main>
    <the-footer />
  </div>
</template>

<script>
import TheHeader from './TheHeader';
import TheFooter from './TheFooter';

export default {
  name: 'BaseLayout',
  components: { TheFooter, TheHeader },
};
</script>

<style scoped>
main {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: var(--grey);
}
</style>
