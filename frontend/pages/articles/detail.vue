<template>
  <div class="container mx-auto py-4">
    <div v-if="article !== null">
      <h1 class="text-6xl text-center">
        {{ article.title }}
      </h1>
      <div class="info py-2">
        <p>Written by {{ article.author }}</p>
        <p>Created at {{ article.createdAt }}</p>
        <p>Last updated at {{ article.updatedAt }}</p>
      </div>
      <div class="content">
        {{ article.document }}
      </div>
      <div class="info pt-5">
        <p>Article ID: {{ article.id }}</p>
      </div>
    </div>
    <div v-else>
      <h1 class="text-6xl text-center">Article Not Found</h1>
      <div class="content text-center">
        I'm sorry, but the article with id {{ $route.query.id }} could not be
        found. It is possible that the article has been deleted, or it may not
        have existed at all.
      </div>
    </div>
  </div>
</template>

<script>
import readArticles from './graphql/read_articles'

export default {
  data() {
    return {
      article: {
        id: '',
        author: '',
        document: '',
        title: '',
        createdAt: '',
        updatedAt: ''
      }
    }
  },
  beforeMount() {
    this.readArticleById(this.$route.query.id)
  },
  methods: {
    readArticleById(id) {
      this.$apollo
        .query({
          query: readArticles.readArticleById,
          variables: { id }
        })
        .then((data) => {
          const doc = data.data.readArticleById
          if (doc === null) {
            this.article = null
            return
          }
          this.article = {
            id: doc.id,
            author: doc.author,
            document: doc.document,
            title: doc.title,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
          }
        })
        .catch((err) => {
          this.article = null
          throw err
        })
    }
  }
}
</script>

<style scoped>
.info {
  @apply text-xs text-right;
}
</style>
