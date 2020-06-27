<template>
  <v-main>
    <hero-section></hero-section>
    <v-container>
      <courses-cards></courses-cards>
    </v-container>
  </v-main>
</template>

<script>
import CoursesCards from '../components/CoursesCards'
import HeroSection from '../components/HeroSection'

export default {
  name: 'Home',
  components: {
    CoursesCards,
    HeroSection
  }
}
</script>
