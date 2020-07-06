<template>
  <div>
    <v-app-bar :class="colorCheck ? 'transparent' : 'blue-grey darken-4'" absolute dense dark flat>
      <!-- Brand name, redirects to home -->
      <router-link to="/" class="text-decoration-none white--text">
        <v-toolbar-title class="font-weight-medium">LiveCoding</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <!-- Menu on large devices -->
      <div class="d-none d-md-block">
        <!-- If it's not logged in -->
        <div v-if="!currentUser">
          <v-btn rounded small text to="/login">
            Iniciar sesión
          </v-btn>
        </div>
        <!-- If it's logged in -->
        <div v-else>
          <v-btn rounded small text to="/editarcursos">
            Agregar cursos
          </v-btn>
          <v-btn rounded small text @click="logout">
            Cerrar sesión
          </v-btn>
        </div>
      </div>
      <!-- Menu on small devices -->
      <v-menu rounded> 
        <!-- Button activator  -->
        <template v-slot:activator="{ attrs, on }">
          <v-btn class="d-md-none white--text" icon v-bind="attrs" v-on="on" depressed>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <!-- Dropdown list items -->
        <v-list flat elevation="0">
          <!-- Only if it's not logged in -->
          <div v-if="!currentUser">
            <!-- Log in -->
            <v-list-item link to="/login">
              <v-list-item-title>
                Iniciar sesión
              </v-list-item-title>
            </v-list-item>
          </div>
          <!-- Only if it's logged in -->
          <div v-else>
            <!-- Add products -->
            <v-list-item link to="/editarcursos">
              <v-list-item-title>
                Añadir cursos
              </v-list-item-title>
            </v-list-item>
            <!-- Logout -->
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
    // Logout from Firebase / resets current user to undefined
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
    // Gets user from state
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