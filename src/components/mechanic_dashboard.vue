<template>
  <header class="jumbotron">
    <h3>{{ content }}</h3>
  </header>
</template>

<script>

export default {
  name: "User",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    this.fetchUserBoard();
  },
  methods: {
    async fetchUserBoard() {
      try {
        const response = await UserService.getUserBoard();
        this.content = response.data;
      } catch (error) {
        this.handleError(error);
      }
    },
    handleError(error) {
      // Set the content based on the error response or error message
      this.content =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    },
  },
};
</script>
  