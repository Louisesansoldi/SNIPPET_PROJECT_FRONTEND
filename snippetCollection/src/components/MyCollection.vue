<template>
    <div>
      <h2>Snippets de la collection {{ collectionId }}</h2>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.siteLink }}</p>
          <p>{{ post.author }}</p>
          <img :src="post.imageUrl" alt="Post image" />
          <p>{{ post.language }}</p>
          <p>{{ post.keywords }}</p>
          <p>{{ post.snippet }}</p>
          <!-- Affichez d'autres informations de snippet si nécessaire -->
        </li>
      </ul>
    </div>
    <div>
    <button @click="openFormPopup">Ajouter un post</button>

    <!-- POP-UP -->
    <div v-if="isFormPopUpOpen" class="popup">
      <form @submit.prevent="submitPost">
        <!-- Champs du formulaire -->
        <ul>
            <li>
            <label for="title">Title:</label>
            <input type="text" id="title" v-model="formData.title" required />
          </li>
          <li>
            <label for="siteLink">Link to the site:</label>
            <input type="text" id="siteLink" v-model="formData.siteLink" required />
          </li>
          <li>
            <label for="author">Author:</label>
            <input type="text" id="author" v-model="formData.author" required />
          </li>
          <li>
            <input type="file" id="myFile" @change="handleFileChange" multiple required />
          </li>
          <li>
            <label for="lang">Language:</label>
            <select v-model="formData.language" required>
              <option value="">Select language:</option>
              <option value="CSS">CSS</option>
              <option value="JAVASCRIPT">JavaScript</option>
              <option value="HTML">HTML</option>
            </select>
          </li>
          <li>
            <label for="keywords">Key-words (separate with comma):</label>
            <input type="text" id="keywords" name="keyWords" v-model="formData.keywords" />

          </li>
          <li>
            <label for="snippet">Snippet:</label>
            <input type="text" id="snippet" v-model="formData.snippet" />
          </li>
        </ul>
        <!-- Bouton pour soumettre le formulaire -->
        <button type="submit">Ajouter</button>
      </form>
    </div>
  </div>
  </template>
  
  <script>
export default {
  data() {
    return {
        collectionId: null,
      posts: [],
      isFormPopUpOpen: false,
      formData: {
        title: '',
        siteLink: '',
        author: '',
        // file: null,
        language: '',
        keywords: ''
      }
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
        console.log("Data from API:", data);
        if (!response.ok) {
          throw new Error(data.message);
        }
        // Ajoutez les mots-clés à chaque post
        this.posts = data.posts.map(post => ({
  ...post,
  keywords: post.keywords ? post.keywords.split(',') : [] // Vérifie si les mots-clés sont présents et les divise en un tableau
}));


  } catch (error) {
    console.error('Erreur lors de la récupération des snippets de la collection:', error);
  }
},
    openFormPopup(){
        this.isFormPopUpOpen = true;
    },

    closeFormPopup(){
        thiss.isFormPopUpOpen = false;
    },
    handleFileChange(event) {
      // Mettez à jour la valeur du fichier dans les données du formulaire
      this.formData.file = event.target.files[0];
    },
    async submitPost() {
  // Séparez les mots-clés par des virgules et supprimez les espaces inutiles
  const keywordsString = this.formData.keywords.split(',').map(keyword => keyword.trim()).join(',');

  // Créez un nouvel objet FormData et ajoutez les données du formulaire
  const formData = new FormData();
  formData.append('title', this.formData.title);
  formData.append('siteLink', this.formData.siteLink);
  formData.append('author', this.formData.author);
  formData.append('language', this.formData.language);
  formData.append('snippet', this.formData.snippet);
  formData.append('file', this.formData.file);
  // Utilisez le nom correct pour les mots-clés
  formData.append('keyWords', keywordsString);

  try {
    const response = await fetch('https://snippetcollection-ed3be9a9dce5.herokuapp.com/api/posts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    // Réinitialisez le formulaire après l'ajout du post
    this.formData = {
      title: '',
      siteLink: '',
      author: '',
      file: null,
      language: '',
      keywords: '',
      snippet: ''
    };
    // Fermez le formulaire après soumission réussie
    this.isFormPopUpOpen = false;
    // Rafraîchissez la liste des posts ou affichez un message de succès
    this.getCollectionPosts();
  } catch (error) {
    console.error('Erreur lors de l\'ajout du post:', error);
  }
}


  }
};
</script>