<template>
  <v-container>
    <courses-cards></courses-cards>
  </v-container>
</template>

<script>
import CoursesCards from '../components/CoursesCards'

export default {
  name: 'Home',
  components: {
    CoursesCards
  }
}
</script>
