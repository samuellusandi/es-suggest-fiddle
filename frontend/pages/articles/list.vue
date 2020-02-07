<template>
  <div class="container mx-auto py-4">
    <div
      v-if="notify > 0"
      class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
      role="alert"
    >
      <div class="flex">
        <div class="py-1">
          <svg
            class="fill-current h-6 w-6 text-teal-500 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
            />
          </svg>
        </div>
        <div>
          <p class="font-bold">A new article was added!</p>
          <p class="text-sm">
            The articles list have been updated! {{ notify }} new article(s)
            have been added since you last refreshed this page.
          </p>
        </div>
      </div>
    </div>
    <h2 class="text-xl my-5">
      All Articles
    </h2>
    <div class="my-5">
      <input
        v-on:input="getSuggestions"
        v-model="prefix"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Start Typing for Completion"
      />
      <div v-if="suggestions.length > 0" class="my-3">Search results:</div>
      <div v-for="suggestion in suggestions" v-bind:key="suggestion.i">
        <nuxt-link
          :to="'/articles/detail?id=' + suggestion.id"
          class="text-blue-500"
        >
          <span v-html="suggestion.title" />
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
            <td class="border p-3">
              <span v-html="limitString(row.title, 10)" />
            </td>
            <td class="border p-3">
              <span v-html="limitString(row.author, 10)" />
            </td>
            <td class="border p-3">
              <span v-html="limitString(row.document, 10)" />
            </td>
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
    <div class="mt-5 text-center">
      <button
        v-on:click="getArticles(articles.length, limit)"
        class="text-blue-500"
      >
        Load more...
      </button>
    </div>
  </div>
</template>

<script>
import articleQueries from './graphql/article_queries'
import articleSubscriptions from './graphql/article_subscriptions'

export default {
  data() {
    return {
      articles: [],
      prefix: '',
      suggestions: [],
      limit: 5,
      notify: 0
    }
  },
  apollo: {
    $subscribe: {
      articleCreated: {
        query: articleSubscriptions.articleCreated,
        result(data) {
          const article = data.data.articleCreated
          for (let i = 0; i < this.articles.length; ++i) {
            this.articles[i].increment += 1
          }
          this.articles.unshift({
            increment: 0,
            id: article.id,
            title: article.title,
            author: article.author,
            document: article.document,
            createdAt: article.createdAt,
            updatedAt: article.updatedAt
          })
          this.notify++
        }
      }
    }
  },
  beforeMount() {
    this.getArticles(0, this.limit)
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
              increment: i + this.articles.length,
              id: data[i].id,
              title: data[i].title,
              author: data[i].author,
              document: data[i].document,
              createdAt: data[i].createdAt,
              updatedAt: data[i].updatedAt
            })
          }
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
      const suggestions = []
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
            suggestions.push({
              i,
              id: data[i].id,
              title: data[i].title
            })
          }
        })
      this.suggestions = suggestions
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
