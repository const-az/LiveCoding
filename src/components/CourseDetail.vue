<template>
  <v-main>
  <p class="mt-5 text-h3 text-center">{{currentCourse.data.name}}</p>
  <v-row class="mt-8">
    <!-- COURSE EXAMPLES-->
    <!-- Creates cards for every example -->
    <v-col cols="12" sm="6" md="4" v-for="example in currentCourse.examples" :key="example.id">
      <!-- Card -->
      <v-card outlined>
        <!-- Course description -->
        <v-card-text class="pb-0">
          <!-- Course name -->
          <p class="pa-0 text-h5 font-weight-bold">{{example.data.title}}</p>
          <p class="text--primary text-caption">{{example.data.description}}</p>
        </v-card-text>
        <!-- Action buttons -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- Add to cart -->
          <v-btn text depressed small class="ma-2" :href="example.data.mp3">
            Escuchar <v-icon>mdi-music-note-eighth</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  </v-main>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: mapState(['currentCourse']),
}
</script>