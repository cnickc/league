<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <LocaleChanger />
    <Login />
    <HelloWorld msg="Welcome to Your Vue.js App" />

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld/HelloWorld.vue'
import LocaleChanger from '@/components/LocaleChanger/LocaleChanger.vue'
import Login from '@/components/Login/Login.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    LocaleChanger,
    Login
  }
}
</script>
