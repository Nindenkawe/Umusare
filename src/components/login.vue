<template>
  <div class="login" v-if="!isLoggedIn">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input type="username" v-model="username" placeholder="Username" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  computed: {
    isLoggedIn() {
      return !!this.$store.state.accessToken; // Check if accessToken is truthy
    }
  },
  methods: {
    ...mapActions(['userLogin']),
    async login() {
      try {
        await this.$store.dispatch('userLogin', {
          username: this.username,
          password: this.password
        });

        // Redirect the user to the desired page
        const desiredPage = this.$route.query.redirect || '/';
        this.$router.push(desiredPage);
      } catch (error) {
        console.error(error);
        // Handle authentication error
      }
    }
  }
};
</script>

<style scoped>
/* Styles remain the same */
.login {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.login h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.login input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

.login button {
  width: 100%;
  padding: 10px;
  background-color: #2196F3;
  color: #FFF;
  border: none;
  cursor: pointer;
}
</style>
