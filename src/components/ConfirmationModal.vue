<template>
  <v-dialog overlay-opacity="0.5" :value="messageModal" max-width="500px" persistent>
    <v-card outlined class="pa-4">
      <v-card-text>
        <v-card-title class="text-subtitle-1">{{ !edit ? `¿Seguro que deseas borrar este curso?` : 'Curso borrado exitosamente.'}}</v-card-title>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="amber darken-2" outlined small @click="closeMessage">{{ !edit ? 'No' : 'Cerrar'}}</v-btn>
        <v-btn color="amber darken-2" small depressed dark @click="deleteCourse" v-if="!edit">Sí</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  methods: mapActions(['deleteCourse', 'closeMessage']),
  computed: mapState(['currentCourse', 'edit', 'messageModal']),
}
</script>