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
    <div v-if="loginSuccess">{{ loginSuccess }}</div>

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
    <div v-if="registerSuccess">{{ registerSuccess }}</div> <!-- Correction : utiliser registerSuccess -->
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
      registerError: null,
      registerSuccess: null,
      loginSuccess: null 
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
            // Stockez le token JWT dans le stockage local
            localStorage.setItem('token', data.token); // Stockage dans le stockage local


           // Récupérer la collection de l'utilisateur
        const collectionResponse = await fetch('https://snippetcollection-ed3be9a9dce5.herokuapp.com/api/my-collection', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const collectionData = await collectionResponse.json();
        if (!collectionResponse.ok) {
          throw new Error(collectionData.message);
        }
        // Rediriger vers MyCollection.vue avec l'ID de la collection
        this.$router.push({ name: 'MyCollection', params: { collectionId: collectionData.id_collection } });
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
        // Afficher le message de succès lorsque l'inscription réussit
        this.registerSuccess = "Registration successful!";
        // Réinitialiser le message d'erreur
        this.registerError = null;
      } catch (error) {
        this.registerError = error.message;
        // Réinitialiser le message de succès en cas d'échec de l'inscription
        this.registerSuccess = null;
      }
    }
  }
};
</script>
