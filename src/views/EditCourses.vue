<template>
  <v-main class="mt-15">
    <edit-form></edit-form>
    <v-divider class="my-5"></v-divider>
    <courses-list></courses-list>
    <v-overlay :value="loading" opacity="0.3">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <confirmation-modal></confirmation-modal>
  </v-main>
</template>

<script>
import { mapState } from 'vuex'

import EditForm from '../components/EditForm'
import ConfirmationModal from '../components/ConfirmationModal'
import CoursesList from '../components/CoursesList'

export default {
  components: {
    EditForm,
    ConfirmationModal,
    CoursesList
  },
  computed: mapState(['loading']),
}
</script>