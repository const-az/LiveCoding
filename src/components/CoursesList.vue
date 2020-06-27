<template>
  <v-container>
    <p class="text-center mt-5 text-h6">Cursos registrados</p>
    <!-- Creates a card for every course -->
    <v-card flat v-for="course in courses" :key="course.id">
      <v-card-text>
        <v-row align="center" class="text-center">
          <!-- Course name -->
          <v-col cols="12" md="2">
            {{course.data.name}}
          </v-col>
          <!-- Course picture -->
          <v-col cols="12" md="3">
            <v-img class="ma-auto" max-width="300px" :src="course.data.img"></v-img>
          </v-col>
          <!-- Course description -->
          <v-col cols="12" md="5" class="text-left">
            {{course.data.description}}
          </v-col>
          <!-- Course actions -->
          <v-col cols="12" md="2">
            <!-- Edit course -->
            <v-btn class="mx-2" color="amber darken-2" text small @click="editCourse(course.id)">
              <span class="d-md-none mr-1">Editar</span>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <!-- Delete course -->
            <v-btn class="mx-2" color="amber darken-2" text small @click="deleteConfirmation(course.id)">
              <span class="d-md-none mr-1">Borrar</span>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  // Gets actions and state from store
  methods: mapActions(['editCourse','deleteConfirmation']),
  computed: mapState(['courses', 'currentCourse',]),
  // Get all courses registered
  created(){
    this.$store.dispatch('getCourses')
  }
}
</script>