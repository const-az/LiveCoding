<template>
  <v-main>
    <v-container>
      <p class="mt-5 mb-0 text-h6 text-center">Detalles del curso</p>
      <p class="text-h3 text-center">{{currentCourse.data.name}}</p>
      <v-row class="mt-8">
        <!-- COURSE EXAMPLES-->
        <!-- Creates cards for every example -->
        <v-col cols="12" sm="6" md="4" v-for="example in currentCourse.examples" :key="example.id">
          <!-- Card -->
          <v-card outlined>
            <v-card-text class="pb-0">
              <!-- Course name -->
              <p class="pa-0 text-h5 font-weight-bold">{{example.data.title}}</p>
              <!-- Course description -->
              <p class="text--primary text-caption">{{example.data.description}}</p>
            </v-card-text>
            <!-- Action buttons -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- Listen to sample -->
              <audio controls>
                <source  :src="example.data.mp3" type="audio/mpeg">
              Your browser does not support the audio element.
              </audio>
              <v-btn text depressed small class="ma-2" color="amber darken-2" :href="example.data.mp3" target="_blank">
                Escuchar <v-icon>mdi-music-note-eighth</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <div class="mt-10 text-center">
        <v-btn color="amber darken-2" small dark depressed to="/">Volver al inicio</v-btn>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['courses']),
    currentCourse(){
      return this.courses.find(course => {
        return course.link == this.$route.params.name
      })
    }
  },
  created(){
    this.$store.dispatch('getCourses')
  }
}
</script>