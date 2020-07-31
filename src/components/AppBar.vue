<template>
  <div>
    <v-app-bar :class="colorCheck ? 'transparent' : 'blue-grey darken-4'" absolute dense dark flat>
      <router-link to="/" class="text-decoration-none white--text">
        <v-toolbar-title class="font-weight-medium">LiveCoding</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <div class="d-none d-md-block">
        <div v-if="!currentUser">
          <v-btn rounded small text to="/login">
            Iniciar sesión
          </v-btn>
        </div>
        <div v-else>
          <v-btn rounded small text to="/editarcursos">
            Agregar cursos
          </v-btn>
          <v-btn rounded small text @click="logout">
            Cerrar sesión
          </v-btn>
        </div>
      </div>
      <v-menu rounded> 
        <template v-slot:activator="{ attrs, on }">
          <v-btn class="d-md-none white--text" icon v-bind="attrs" v-on="on" depressed>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list flat elevation="0">
          <div v-if="!currentUser">
            <v-list-item link to="/login">
              <v-list-item-title>
                Iniciar sesión
              </v-list-item-title>
            </v-list-item>
          </div>
          <div v-else>
            <v-list-item link to="/editarcursos">
              <v-list-item-title>
                Añadir cursos
              </v-list-item-title>
            </v-list-item>
            <v-list-item link @click="logout">
                <v-list-item-title>
                  Cerrar sesión
                </v-list-item-title>
            </v-list-item>
          </div>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import Firebase from 'firebase'
import { mapState } from 'vuex'

export default {
  data: () => ({
    colorCheck: true
  }),
  methods: {
    logout(){
      Firebase.auth().signOut().then( () => {
        this.$store.dispatch('updateUser', false)
        this.$router.push('/home')
      })
    },
    barColor(){
      if(window.location.pathname != '/home' || window.location.pathname != '/'){
        return 'blue-grey darken-4'
      }else{
        return 'transparent'
      }
    }
  },
  computed: {
    ...mapState(['currentUser']),
    isLoggedIn(){
      return this.$store.getters.isLoggedIn
    },
  },
  watch: {
    '$route' (){
      if(this.$route.path == '/' || this.$route.path == '/home'){
        this.colorCheck = true
      } else{
        this.colorCheck = false
      }
    }
  }
}
</script>