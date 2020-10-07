
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
      '~/plugins/firebase.js',
      { src: '~/plugins/vue-notification.js', ssr: false}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/firebase',
  ],
  /*
  **
  */
  firebase: {
    config: {
      apiKey: "AIzaSyD-vyAcZ-BF7MiJ6RVX5Py5ZNdl7T5C8l4",
      authDomain: "dashboard-998fa.firebaseapp.com",
      databaseURL: "https://dashboard-998fa.firebaseio.com",
      projectId: "dashboard-998fa",
      storageBucket: "dashboard-998fa.appspot.com",
      messagingSenderId: "100447578947",
      appId: "1:100447578947:web:30eeeb51c90f2b8d875df6"
    },
    services: {
      firestore: true,
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
