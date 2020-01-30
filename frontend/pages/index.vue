<template>
  <div class="container">
    <div>
      <h1 class="title">
        esfiddle
      </h1>
      <div class="break-words">
        My personal playground for fiddling with elasticsearch and its
        search/suggest features. Past this page, you can create articles (in
        HTML). Help me gather (read: create) more random articles so I can
        improve the search algorithm (and/or parameter) of the search by
        creating as many articles (read: data) as you can!
      </div>
      <div class="break-words text-xs mt-2">
        P.S. Things <i>will</i> break here. I will only fix them at a
        best-effort basis (i.e. when I have time and motivation)!
      </div>
      <div class="links">
        <nuxt-link to="/articles/list" class="button--green">
          Let's get started
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
