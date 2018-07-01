<template>
  <!-- <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <v-spacer></v-spacer>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app> -->

  <v-app dark>
    <v-navigation-drawer
      temporary
      v-model="sideNav"
      enable-resize-watcher
      fixed
      app
      width="250"
    >
      <v-list>
        <v-list-tile 
          v-for="item in menuItems" :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content> {{item.title}} </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated"
        @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content> 로그아웃 </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dense dark app class="primary">
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav"> </v-toolbar-side-icon>
      <v-toolbar-title style="margin-left: 0;">
        <router-link to="/" tag="span" style="cursor: pointer">우리 지금 만나♪</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn 
          flat
          v-for="item in menuItems" :key="item.title"
          :to="item.link">
          <v-icon>{{item.icon}}</v-icon> {{item.title}}
        </v-btn>
        <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
          <v-icon>exit_to_app</v-icon> 로그아웃
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <transition name="fade" mode="out-in">
        <router-view></router-view>      
      </transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      // clipped: false,
      // sideNav: false,
      // fixed: false,
      // items: [{
      //   icon: 'bubble_chart',
      //   title: 'Inspire'
      // }],
      // miniVariant: false,
      // right: true,
      // rightDrawer: false,
      // title: 'Vuetify.js'

      sideNav: false
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        { icon: 'face', title: '회원가입', link: '/signup' },
        { icon: 'lock_open', title: '로그인', link: '/signin' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'supervisor_account', title: '약속 보기', link: '/meetups' },
          { icon: 'room', title: '약속 만들기', link: '/meetup/new' },
          { icon: 'person', title: '프로필', link: '/profile' }
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
  name: 'App'
}
</script>

<style scoped >
  .test {
    cursor: pointer;
  }

  .test:hover {
    background-color: aqua;
  }

  .fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
  }
  
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
