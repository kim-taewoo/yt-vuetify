<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn right flat small class="red--text text--darken-2" accent slot="activator">
      -시간 수정
    </v-btn>
    <v-card>
      <v-container>
        <v-layout wrap>
          <v-flex xs12>
            <v-card-title class="title">시간 수정</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout wrap>
          <v-flex xs12>
            <v-time-picker 
              v-model="editableTime" 
              style="width: 100%" 
              actions
              locale="ko-kr"
              color="primary"
              >
              <template slot-scope="{save, cancel}">
                <v-layout>
                  <v-flex xs12 class="text-xs-center">
                    <v-btn
                      class="blue--text darken-1"
                      flat
                      @click.native="editDialog = false">닫기</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 class="text-xs-center">
                    <v-btn
                      class="blue--text darken-1"
                      flat
                      @click.native="onSaveChanges">저장</v-btn>
                  </v-flex>
                </v-layout>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetup'],
    data () {
      return {
        editDialog: false,
        editableTime: null
      }
    },
    methods: {
      onSaveChanges () {
        const newDate = new Date(this.meetup.date)
        const hours = this.editableTime.match(/^(\d+)/)[1]
        const minutes = this.editableTime.match(/:(\d+)/)[1]
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          date: newDate
        })
      }
    },
    created () {
      let date = new Date(this.meetup.date)
      let hours = date.getHours()
      let minutes = date.getMinutes()
      this.editableTime = hours + ':' + minutes
    }
  }
</script>