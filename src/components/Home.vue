<template>
  <v-container :px-0="$vuetify.breakpoint.smAndDown">
    <v-layout v-if="loading" class="mt-2" justify-center align-center style="height: 380px;">
      <v-flex xs12 sm8 class="text-xs-center">
        <v-progress-circular :size="70" :width="7" indeterminate color="amber" ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout v-if="!loading" justify-center align-center row wrap class="mt-2">
      <v-flex xs12 sm8>
        <v-carousel style="cursor: pointer;height: 380px">
          <v-carousel-item v-for="meetup in meetups" :src="meetup.imageUrl" :key="meetup.id"
          @click.native="onLoadMeetup(meetup.id)">
            <div class="event-title subheading">
              {{meetup.title}}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout mt-3 row wrap>
      <v-flex sm6 class="text-xs-right">
        <v-btn :small="$vuetify.breakpoint.xsOnly" to="/meetups" class="primary">모든 약속 보기</v-btn>
      </v-flex>
      <v-flex sm6 class="text-xs-left">
        <v-btn :small="$vuetify.breakpoint.xsOnly" to="/meetup/new" class="primary">새 약속 만들기</v-btn>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  export default {
    computed: {
      meetups () {
        return this.$store.getters.featuredMeetups
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadMeetup (id) {
        this.$router.push('/meetups/' + id)
      }
    }
  }
</script>

<style scoped>
  .event-title {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0,0,0,0.5);
    color: white;
    padding: 10px;
    user-select: none;
  }
</style>
