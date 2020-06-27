<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
      flat
    >
      <router-link to="/home" class="text-decoration-none white--text">
        <v-toolbar-title>LiveCoding</v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <div class="d-none d-md-block">
        <div v-if="!isLoggedIn">
          <v-btn small text to="/login">
            Iniciar sesión
          </v-btn>
        </div>
        <div v-else>
          <v-btn small text to="/editarcursos">
            Agregar cursos
          </v-btn>
          <v-btn small text @click="logout">
            Cerrar sesión
          </v-btn>
        </div>
      </div>

      <!-- Dropdown menu -->
      <v-menu rounded> 
        <!-- Button activator  -->
        <template v-slot:activator="{ attrs, on }">
          <v-btn class="d-md-none white--text" icon v-bind="attrs" v-on="on" depressed>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <!-- Dropdown list items -->
        <v-list flat elevation="0">
          <!-- Only if isnt logged in -->
          <div v-if="!isLoggedIn">
            <!-- Log in -->
            <v-list-item link to="/login">
              <v-list-item-title>
                Iniciar sesión
              </v-list-item-title>
            </v-list-item>
          </div>
          <!-- Only if is logged in -->
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
  methods: {
    logout(){
      Firebase.auth().signOut().then( () => {
        this.$store.dispatch('updateUser', undefined)
        this.$router.push('/home')
      })
    }
  },
  computed: {
    ...mapState(['currentUser']),
    isLoggedIn(){
      return this.$store.getters.isLoggedIn
    },
    getCurrentUser(){
      return Firebase.auth().currentUser ? Firebase.auth().currentUser : ''
    }
  }
}
</script>