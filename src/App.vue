<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer temporary clipped fixed v-model="drawer" app>
      <v-list dense>
        <v-list-tile v-for="item in menuItems" :key="item.title" router :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left temporary>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor:pointer">DevMeetUp</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" router :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
          <v-icon left>exit_to_app</v-icon>
          LogOut
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <router-view></router-view>
  </v-app>
</template>
<script>
  export default {
    data: () => ({
      drawer: false
    }),
    computed: {
      menuItems () {
        let menuItems = [{
          icon: 'face',
          title: 'Sign Up',
          link: '/signup'
        },
        {
          icon: 'lock_open',
          title: 'Sign In',
          link: '/signin'
        }]
        if (this.userIsAuthenticated) {
          menuItems = [{
            icon: 'explore',
            title: 'View Meetups',
            link: '/meetups'
          },
          {
            icon: 'room',
            title: 'Organize Meetup',
            link: '/meetup/new'
          },
          {
            icon: 'person',
            title: 'Profile',
            link: '/profile'
          }
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      }
    },
    props: {
      source: String
    }
  }
</script>