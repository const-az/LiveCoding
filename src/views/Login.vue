<template>
  <v-main>
    <v-img height="100vh" class="pt-16" src="https://images.pexels.com/photos/690779/pexels-photo-690779.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
      <v-card flat width="400" class="text-center mx-auto mt-16 pa-5 rounded-xl">
        <v-card-text>
          <p class="text-h4 text-md-h2 mb-2 font-weight-medium blue-grey--text text--darken-1">¡Bienvenido!</p>
        </v-card-text>
        <v-card-text>
          <v-form>
            <v-text-field color="blue-grey darken-3" label="Usuario" prepend-icon="mdi-account" v-model="credentials.email"/>
            <v-text-field color="blue-grey darken-3" :type="showPassword ? 'text' : 'password'" label="Contraseña" prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword" v-model="credentials.password"/>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn depressed small dark class="mx-auto mt-5" color="blue-grey darken-1" @click="login">Iniciar sesión</v-btn>
        </v-card-actions>
      </v-card>
    </v-img>
    <!-- Alert on errors and success -->
    <v-snackbar elevation="0" top color="blue-grey darken-1" v-model="alert.state" timeout="3000">
      {{ alert.text }}
      <template v-slot:action="{ attrs }">
        <v-btn icon small color="white" v-bind="attrs" @click="alert.state = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-main>
</template>

<script>
import Firebase from 'firebase'

export default {
  name: 'App',
  data: () => ({
    credentials: {
      email: '',
      password: ''
    },
    showPassword: false,
    alert: {
      text: '',
      state: false,
      type: ''
    }
  }),
  methods: {
    login(){
      if(this.credentials.email != '' && this.credentials.password != ''){
        Firebase.auth().signInWithEmailAndPassword(this.credentials.email,this.credentials.password)
        .then(() => {
          let user = this.credentials.email
          this.$store.dispatch('updateUser', user)
          this.alert.state = true
          this.alert.text = `Bienvenido, ${user}`
          setTimeout(() => {
            this.$router.push('/editarcursos')
          }, 2000)
        })
        .catch(() => {
          this.alert.state = true
          this.alert.text = 'Usuario o contraseña incorrectos. Intente nuevamente.'
        })
      } else{
        this.alert.state = true
        this.alert.text = 'Todos los campos son obligatorios.'
      }
    }
  }
};
</script>