<template>
  <v-container class="mb-16">
    <p class="text-center mt-5 text-h6">Cursos registrados</p>
    <v-card flat v-for="course in courses" :key="course.id">
      <v-card-text>
        <v-row align="center" class="text-center grey--text text--darken-4">
          <v-col cols="12" md="2">
            <span class="text-body-1 font-weight-medium">{{course.data.name}}</span>
          </v-col>
          <v-col cols="12" md="3">
            <v-img class="ma-auto" max-width="300px" :src="course.data.img"></v-img>
          </v-col>
          <v-col cols="12" md="5" class="text-left">
            {{course.data.description}}
          </v-col>
          <v-col cols="12" md="2">
            <v-btn class="ma-2" color="blue-grey darken-1" text small @click="editCourse(course.id)">
              <span class="d-md-none mr-1">Editar</span>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn class="ma-2" color="blue-grey darken-1" text small @click="deleteConfirmation(course.id)">
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
  methods: mapActions(['editCourse','deleteConfirmation']),
  computed: mapState(['courses', 'currentCourse',]),
  created(){
    this.$store.dispatch('getCourses')
  }
}
</script>