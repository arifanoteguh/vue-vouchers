<template>
  <v-app id="inspire">

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      app
    >

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="#fcb69f"
      dark
      src="bg.jpg"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Vouchers</v-toolbar-title>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main class="pa-0">
      <!--  -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: null,
        items: [
          { title: 'Voucher', icon: 'mdi-ticket-confirmation', to: '/' },
          { title: 'Voucher List', icon: 'mdi-ticket-confirmation', to: '/list' },
          { title: 'Logout', icon: 'mdi-logout', to: '/login' }
        ],
      }
    },
  }
</script>