<template>
  <v-dialog width="350px" persistent v-model="registerDialog">
    <v-btn class="primary" accent slot="activator">
      {{ userIsRegistered ? '등록취소' : '등록하기' }}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout wrap>
          <v-flex>
            <v-card-title class="title" v-if="userIsRegistered">약속 취소할까요?</v-card-title>
            <v-card-title v-else>약속 등록할까요?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex xs12>
            <v-card-text>언제든 자유롭게 취소할 수 있습니다.</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat class="red--text text--darken-1" @click="registerDialog = false">취소</v-btn>
              <v-btn flat class="green--text text--darken-1" @click="onAgree">확인</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetupId'],
    data () {
      return {
        registerDialog: false
      }
    },
    computed: {
      userIsRegistered () {
        return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
          return meetupId === this.meetupId
        }) >= 0
      }
    },
    methods: {
      onAgree () {
        if (this.userIsRegistered) {
          this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
        } else {
          this.$store.dispatch('registerUserForMeetup', this.meetupId)
        }
      }
    }
  }
</script>