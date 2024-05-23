<template>
    <div>
      <h2>Snippets de la collection {{ collectionId }}</h2>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.snippet }}</p>
          <!-- Affichez d'autres informations de snippet si nécessaire -->
        </li>
      </ul>
    </div>
  </template>
  
  <script>
export default {
  data() {
    return {
      collectionId: null,
      posts: []
    };
  },
  mounted() {
    this.collectionId = this.$route.params.collectionId;
    this.getCollectionPosts();
  },
  methods: {
    async getCollectionPosts() {
      try {
        const response = await fetch(`https://snippetcollection-ed3be9a9dce5.herokuapp.com/api/posts/${this.collectionId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        this.posts = data.posts;
      } catch (error) {
        console.error('Erreur lors de la récupération des snippets de la collection:', error);
      }
    }
  }
};
</script>