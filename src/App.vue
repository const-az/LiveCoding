<template>
  <v-app>
    <app-bar/>
    <router-view></router-view>
    <Footer></Footer>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar'
import Footer from './components/Footer'

export default {
  name: 'App',

  components: {
    AppBar,
    Footer
  },

  data: () => ({
    //
  }),
};
</script>
