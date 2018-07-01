<template>
  <v-container :class="{'px-0': $vuetify.breakpoint.smAndDown}">
    <v-layout v-if="loading" class="mt-2" justify-center align-center style="height: 380px;">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular :size="70" :width="7" indeterminate color="amber" v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center v-else>
      <v-flex xs12 sm8>
        <v-card>
          <v-card-title>
            <h1 class="white--text title">{{ meetup.title }}</h1>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <gc-edit-meetup-details-dialog :meetup="meetup"></gc-edit-meetup-details-dialog>
            </template>
          </v-card-title>
          <v-card-media
            :src="meetup.imageUrl"
            height="250px">
          </v-card-media>
          <v-card-text>
            <div class="info--text">{{ meetup.date | date }} - {{ meetup.location }}
              <gc-edit-meetup-date-dialog :meetup="meetup" v-if="userIsCreator"></gc-edit-meetup-date-dialog>
              <gc-edit-meetup-time-dialog :meetup="meetup" v-if="userIsCreator"></gc-edit-meetup-time-dialog>
            </div>
            <div>{{meetup.description?meetup.description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dicta error ipsa quae hic voluptatem voluptates, corporis dolores exercitationem! Laboriosam beatae, mollitia consequatur possimus quis doloribus ullam non cum nam.'}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <gc-meetup-register-dialog :meetupId="meetup.id" v-if="userIsAuthenticated && !userIsCreator"></gc-meetup-register-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      meetup () {
        return this.$store.getters.loadedMeetup(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.meetup.creatorId
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>