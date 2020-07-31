<template>
  <v-main>
    <v-row class="mt-8 mb-15" id="courses">
      <v-col cols="12" sm="6" md="4" v-for="item in courses" :key="item.id">
        <v-card outlined class="rounded-xl">
          <v-img class="white--text align-end" height="250px" :src="item.data.img" gradient="to top, rgba(0,0,0,.5), rgba(255,255,255,0)">
            <p class="text-h5 text-center font-weight-bold">{{item.data.name}}</p>
          </v-img>
          <v-card-text class="pb-0">
            <p class="text--primary text-caption">{{item.data.description}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed small rounded dark color="blue-grey darken-1" :to="{ name: 'SingleCourse', params: {name: item.link}}">
              Ver más
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-overlay absolute :value="loading" opacity="0">
      <v-progress-circular indeterminate color="blue-grey darken-1" size="64"></v-progress-circular>
    </v-overlay>
  </v-main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['courses','loading']),
  created(){
    this.$store.dispatch('getCourses')
  }
}
</script>