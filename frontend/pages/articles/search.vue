<template>
  <div class="container mx-auto py-4">
    <div class="font-bold">
      Specific Article Title Search
    </div>
    <div class="my-5 flex">
      <input
        v-model="query"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-2"
        type="text"
        placeholder="Type article title here!"
      />
      <button
        v-on:click="searchArticles"
        type="button"
        class="py-1 px-2 mx-2 rounded bg-blue-500 text-white"
      >
        Search
      </button>
    </div>
    <div v-if="suggestion !== null" class="italic text-lg">
      <span class="font-bold">Did you mean:</span>
      <button
        v-on:click="updateQueryAndSearch(suggestion)"
        class="text-blue-500"
      >
        {{ suggestion }}
      </button>
      ?
    </div>
    <h2 class="text-xl font-bold mt-6">
      Search Results:
    </h2>
    <div v-if="error" class="justify-center">
      No articles found with the title query.
    </div>
    <div v-else class="my-5 flex items-center justify-center container">
      <table
        class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5"
      >
        <thead class="text-white">
          <tr
            v-for="n in articles.length"
            v-bind:key="n"
            class="bg-gray-800 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
          >
            <th class="p-3">Article ID</th>
            <th class="p-3">Article Title</th>
            <th class="p-3">Article Author</th>
            <th class="p-3">Article Content Preview</th>
            <th class="p-3">Created At</th>
            <th class="p-3">Last Updated</th>
            <th class="p-3">Actions</th>
          </tr>
        </thead>
        <tbody class="flex-1 sm:flex-none">
          <tr
            v-for="row in articles"
            v-bind:key="row.increment"
            class="flex flex-col flex-no wrap sm:table-row mb-3 sm:mb-0"
          >
            <td class="border p-3">{{ limitString(row.id, 10) }}</td>
            <td class="border p-3">{{ limitString(row.title, 10) }}</td>
            <td class="border p-3">{{ limitString(row.author, 10) }}</td>
            <td class="border p-3">{{ limitString(row.document, 10) }}</td>
            <td class="border p-3">{{ limitString(row.createdAt, 10) }}</td>
            <td class="border p-3">{{ limitString(row.updatedAt, 10) }}</td>
            <td class="border p-3 text-center">
              <nuxt-link
                :to="'/articles/detail?id=' + row.id"
                class="btn btn-blue"
              >
                <i class="fa fa-eye"></i>
              </nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import articleQueries from './graphql/article_queries'

export default {
  data() {
    return {
      articles: [],
      error: null,
      query: '',
      suggestion: null
    }
  },
  methods: {
    searchArticles() {
      this.$apollo
        .query({
          query: articleQueries.searchArticle,
          variables: {
            title: this.query
          }
        })
        .then((data) => {
          data = data.data.searchArticle
          this.suggestion = data.meta.suggest
          this.articles = []

          data.content.forEach((article) => {
            this.articles.push({
              id: article.id,
              title: article.title,
              author: article.author,
              document: article.document,
              createdAt: article.createdAt,
              updatedAt: article.updatedAt
            })
          })
        })
    },
    limitString(input, length) {
      let modified = input.substring(0, length)
      if (input.length > length) {
        modified += '...'
      }
      return modified
    },
    updateQueryAndSearch(query) {
      this.query = query
      this.searchArticles()
    }
  }
}
</script>

<style scoped>
.btn {
  @apply py-1 px-2 rounded;
}
.btn-blue {
  @apply bg-blue-500 text-white;
}
.btn-blue:hover {
  @apply bg-blue-700;
}
.btn-red {
  @apply border bg-white text-red-500;
}
.btn-red:hover {
  @apply bg-red-500 text-white;
}
.btn-yellow {
  @apply bg-yellow-600 text-white;
}
.btn-yellow:hover {
  @apply bg-yellow-800 text-white;
}

@media (min-width: 640px) {
  table {
    display: inline-table !important;
  }

  thead tr:not(:first-child) {
    display: none;
  }
}

td:not(:last-child) {
  border-bottom: 0;
}

th:not(:last-child) {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
</style>
