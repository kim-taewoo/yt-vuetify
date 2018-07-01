<template>
  <v-container :class="{'px-0': $vuetify.breakpoint.smAndDown}">
    <v-layout v-if="loading" class="mt-2" justify-center align-center style="height: 380px;">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular :size="70" :width="7" indeterminate color="amber"></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout v-if="!loading" wrap v-for="meetup in meetups" :key="meetup.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="secondary">
          <v-container py-0 px-1>
            <v-layout row align-center>
              <v-flex xs5 sm4 md4>
                <v-card-media
                  :src="meetup.imageUrl[0].imgaeUrl"
                  height="130px">
                </v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h3 class="white--text mb-0">{{ meetup.title }}</h3>
                    <div class="grey--text text--lighten-2">
                      {{ meetup.date | date }}
                    </div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat class="white--text"
                  :to="'/meetups/' + meetup.id">
                    <v-icon left>arrow_right_alt</v-icon>
                    자세히 보기
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      meetups () {
        return this.$store.getters.loadedMeetups
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>