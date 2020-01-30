<template>
  <div class="container mx-auto py-4">
    <div v-if="error !== null">
      <div
        @click="closeError"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong class="font-bold">
          Could not successfully create article!
        </strong>
        <span class="block sm:inline">
          Either your submission was rejected, or your submission could not be
          sent. Error is {{ error.message }}
        </span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            class="fill-current h-6 w-6 text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path
              d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
            />
          </svg>
        </span>
      </div>
    </div>
    <h2 class="subtitle">
      Create new Article
    </h2>
    <form>
      <label for="author" class="font-bold my-2">
        Author
      </label>
      <input
        id="author"
        v-model="author"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
        placeholder="Author's name here"
      />
      <label for="title" class="font-bold my-2">
        Title
      </label>
      <input
        id="title"
        v-model="title"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
        placeholder="The title of the article"
      />
      <label for="content" class="font-bold my-2">
        Content
      </label>
      <textarea
        id="content"
        v-model="document"
        class="shadow content appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
        placeholder="The content of the article"
      />
      <div class="text-right">
        <button
          @click="submit"
          type="button"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded"
        >
          Submit Article!
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import articleMutations from './graphql/article_mutations'

export default {
  data() {
    return {
      title: '',
      document: '',
      author: '',
      error: null
    }
  },
  methods: {
    async submit() {
      await this.$apollo
        .mutate({
          mutation: articleMutations.createArticle,
          variables: {
            title: this.title,
            document: this.document,
            author: this.author
          }
        })
        .then((data) => {
          data = data.data.createArticle
          this.$router.push(`/articles/detail?id=${data.id}`)
        })
        .catch((err) => {
          this.error = err
          throw err
        })
    },
    closeError() {
      this.error = null
    }
  }
}
</script>

<style scoped>
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.content {
  min-height: 30vh;
}
</style>
