<template>
  <div class="container mx-auto py-4">
    <div>
      List all Articles and Search
    </div>
    <div class="my-5">
      <input
        v-on:input="getSuggestions"
        v-model="prefix"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Start Typing for Completion"
      />
      <div class="my-3">Search results:</div>
      <div v-for="suggestion in suggestions" v-bind:key="suggestion.i">
        <nuxt-link
          :to="'/articles/detail?id=' + suggestion.id"
          class="text-blue-500"
        >
          {{ suggestion.title }}
        </nuxt-link>
      </div>
    </div>
    <div class="my-5 flex items-center justify-center container">
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
            <td class="border p-3">
              <nuxt-link
                :to="'/articles/detail?id=' + row.id"
                class="btn btn-blue"
              >
                View
              </nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-5 text-center">
      <button v-on:click="getArticles(offset, limit)" class="text-blue-500">
        Load more...
      </button>
    </div>
  </div>
</template>

<script>
import articleQueries from './graphql/article_queries'

export default {
  data() {
    return {
      articles: [],
      prefix: '',
      suggestions: [],
      offset: 0,
      limit: 5
    }
  },
  beforeMount() {
    this.getArticles(this.offset, this.limit)
  },
  methods: {
    getArticles(offset, limit) {
      this.$apollo
        .query({
          query: articleQueries.readArticles,
          variables: {
            offset,
            limit
          }
        })
        .then((data) => {
          let i = 0
          data = data.data.readManyArticles
          for (; i < data.length; ++i) {
            this.articles.push({
              increment: i + this.offset,
              id: data[i].id,
              title: data[i].title,
              author: data[i].author,
              document: data[i].document,
              createdAt: data[i].createdAt,
              updatedAt: data[i].updatedAt
            })
          }
          this.offset += data.length
        })
    },
    limitString(input, length) {
      let modified = input.substring(0, length)
      if (input.length > length) {
        modified += '...'
      }
      return modified
    },
    getSuggestions() {
      this.suggestions = []
      this.$apollo
        .query({
          query: articleQueries.autoComplete,
          variables: {
            prefix: this.prefix
          }
        })
        .then((data) => {
          data = data.data.autoCompleteTitle
          const maxSuggestion = data.length > 5 ? 5 : data.length
          for (let i = 0; i < maxSuggestion; ++i) {
            this.suggestions.push({
              i,
              id: data[i].id,
              title: data[i].title
            })
          }
        })
    }
  }
}
</script>

<style scoped>
.btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-blue {
  @apply bg-blue-500 text-white;
}
.btn-blue:hover {
  @apply bg-blue-700;
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
