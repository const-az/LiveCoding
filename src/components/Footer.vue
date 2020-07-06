<template>
  <v-footer absolute light padless class="mt-5 text-center text-caption transparent">
    <v-card-text :class="colorCheck ? '' : 'white--text'">
        <span>{{ new Date().getFullYear() }} — <strong :class="colorCheck ? 'blue-grey--text text--darken-1' : ''">LiveCoding</strong></span>
    </v-card-text>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    colorCheck: true
  }),
  watch: {
    '$route'(){
      if(this.$route.path == '/login'){
        this.colorCheck = false
      } else{
        this.colorCheck = true
      }
    }
  }
}
</script>