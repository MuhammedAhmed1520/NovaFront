<template>
  <v-footer
    height="auto"
    color="grey lighten-5"
  >
    <v-layout
      justify-center
      row
      wrap
    >
      <v-flex
        grey
        lighten-5
        py-3
        text-xs-center
        teal--text
        xs12
        app
      >
        &copy;2018 — <strong>NovaSolutions.com</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>
<script>
  export default {
    data: () => ({
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us'
      ]
    })
  }
</script>