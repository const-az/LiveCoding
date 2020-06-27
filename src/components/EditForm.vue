<template>
  <v-container>
    <v-card flat>
      <v-card-text class="text-center text-h5">{{ currentCourse.id==null ? 'Agregar curso' : 'Editar curso'}}</v-card-text>
      <v-card-text class="text--primary pa-5">
        <v-row>
          <!-- Course name -->
          <v-col cols="12">
            <v-text-field label="Nombre"
              :value="currentCourse.data.name" @input="updateName"
            ></v-text-field>
          </v-col>
          <!-- Course image -->
          <v-col cols="12">
            <v-text-field label="Imagen" color="yellow darken-2" 
              :value="currentCourse.data.img" @input="updateImage"
            ></v-text-field>
          </v-col>
          <!-- Course description -->
          <v-col cols="12">
            <v-textarea label="Descripción" color="pink lighten-2"
              auto-grow rows="1" row-height="15" counter
              :value="currentCourse.data.description" @input="updateDescription"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed @click="postCourse">{{ !!currentCourse.id ? 'Actualizar' : 'Crear'}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  computed: mapState(['currentCourse']),
  methods: mapActions(['updateName', 'updateImage', 'updateDescription', 'postCourse'])
}
</script>