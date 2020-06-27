<template>
  <v-container>
    <p class="text-center mt-5 text-h6">Cursos registrados</p>
    <v-card flat v-for="course in courses" :key="course.id">
      <v-card-text>
        <v-row align="center" class="text-center">
          <v-col cols="12" md="2">
            {{course.data.name}}
          </v-col>
          <v-col cols="12" md="3">
            <v-img class="ma-auto" max-width="300px" :src="course.data.img"></v-img>
          </v-col>
          <v-col cols="12" md="5" class="text-left">
            {{course.data.description}}
          </v-col>
          <v-col cols="12" md="2">
            <!-- Edit product -->
            <v-btn class="mx-2" icon small @click="editCourse(course.id)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <!-- Delete product -->
            <v-btn class="mx-2" icon small @click="deleteConfirmation(course.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
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