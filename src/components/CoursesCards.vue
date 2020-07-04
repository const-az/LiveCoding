<template>
  <v-row class="mt-8">
    <!-- COURSES LIST FOR HOME PAGE -->
    <!-- Creates cards for every course -->
    <v-col cols="12" sm="6" md="4" v-for="item in courses" :key="item.id">
      <!-- Card -->
      <v-card outlined>
        <!-- Course image -->
        <v-img class="white--text align-end" height="250px" :src="item.data.img"></v-img>
        <!-- Course description -->
        <v-card-text class="pb-0">
          <!-- Course name -->
          <p class="pa-0 text-h5 text--primary font-weight-bold">{{item.data.name}}</p>
          <p class="text--primary text-caption">{{item.data.description}}</p>
        </v-card-text>
        <!-- Action buttons -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- Add to cart -->
          <v-btn depressed small dark color="amber darken-2 ma-2" :to="{ name: 'SingleCourse', params: {name: item.link}}">Ir al curso</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState(['courses']),
  methods: {
    ...mapActions(['goToCourse']),
    goToDetails(id){
      this.$router.push('/course')
      this.goToCourse(id)
    }
  },
  created(){
    this.$store.dispatch('getCourses')
  }
}
</script>