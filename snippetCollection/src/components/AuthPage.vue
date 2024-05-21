<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="login-email">Email:</label>
        <input type="email" id="login-email" v-model="loginEmail" required>
      </div>
      <div>
        <label for="login-password">Password:</label>
        <input type="password" id="login-password" v-model="loginPassword" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <div v-if="loginError">{{ loginError }}</div>

    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="register-name">Name:</label>
        <input type="text" id="register-name" v-model="registerName" required>
      </div>
      <div>
        <label for="register-email">Email:</label>
        <input type="email" id="register-email" v-model="registerEmail" required>
      </div>
      <div>
        <label for="register-password">Password:</label>
        <input type="password" id="register-password" v-model="registerPassword" required>
      </div>
      <button type="submit">Register</button>
    </form>
    <div v-if="registerError">{{ registerError }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginEmail: '',
      loginPassword: '',
      registerName: '',
      registerEmail: '',
      registerPassword: '',
      loginError: null,
      registerError: null
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('https://snippetcollection-ed3be9a9dce5.herokuapp.com/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.loginEmail,
            password: this.loginPassword
          })
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        // Traitement du token JWT reçu, par exemple, stockage dans le local storage
      } catch (error) {
        this.loginError = error.message;
      }
    },
    async register() {
      try {
        const response = await fetch('https://snippetcollection-ed3be9a9dce5.herokuapp.com/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.registerName,
            email: this.registerEmail,
            password: this.registerPassword
          })
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        // Affichage d'un message de succès ou redirection vers une autre page
      } catch (error) {
        this.registerError = error.message;
      }
    }
  }
};
</script>
