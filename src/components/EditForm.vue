<template>
  <v-container>
    <v-card flat max-width="70vw" class="mx-auto">
      <p class="text-center text-h5 mt-6">{{ currentCourse.id==null ? 'Agregar curso' : 'Editar curso'}}</p>
      <v-card-text class="text--primary pa-5">
        <v-row>
          <!-- Course name -->
          <v-col cols="12">
            <v-text-field label="Nombre" color="blue-grey darken-3"
              :value="currentCourse.data.name" @input="updateName"
            ></v-text-field>
          </v-col>
          <!-- Course image -->
          <v-col cols="12">
            <v-text-field label="Imagen" color="blue-grey darken-3"
              :value="currentCourse.data.img" @input="updateImage"
            ></v-text-field>
          </v-col>
          <!-- Course description -->
          <v-col cols="12">
            <v-textarea label="Descripción" color="blue-grey darken-3"
              auto-grow rows="1" row-height="15" counter
              :value="currentCourse.data.description" @input="updateDescription"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined rounded dark color="blue-grey darken-1" @click="resetForm" v-if="!currentCourse.id">Borrar</v-btn>
        <v-btn depressed dark rounded color="blue-grey darken-1" @click="postCourse">{{ !!currentCourse.id ? 'Actualizar' : 'Crear'}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  computed: mapState(['currentCourse']),
  methods: mapActions(['updateName', 'updateImage', 'updateDescription', 'postCourse', 'resetForm'])
}
</script>