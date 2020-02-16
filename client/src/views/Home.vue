<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <LocaleChanger />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld/HelloWorld.vue'
import LocaleChanger from '@/components/LocaleChanger/LocaleChanger.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    LocaleChanger
  }
}
</script>
