<template>
  <v-img height="100vh" class="white--text text-center align-center" position="center bottom"
    src="https://images.pexels.com/photos/6966/abstract-music-rock-bw.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
    <p class="text-h5 text-lg-h4 text-center">Aprende sin salir de tu casa</p>
    <v-btn outlined small rounded color="white" @click="goToCourses">Revisa nuestros cursos</v-btn>
  </v-img>
</template>

<script>
export default {
  methods: {
    goToCourses(){
      const element = document.getElementById('courses');
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
</script>