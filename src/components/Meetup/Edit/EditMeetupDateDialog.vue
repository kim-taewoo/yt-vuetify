<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn left flat small class="red--text text--darken-2" accent slot="activator">
      -날짜 수정
    </v-btn>
    <v-card>
      <v-container>
        <v-layout wrap>
          <v-flex xs12>
            <v-card-title class="title">날짜 수정</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout wrap>
          <v-flex xs12>
            <v-date-picker 
              v-model="editableDate" 
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
            </v-date-picker>
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
        editableDate: null
      }
    },
    methods: {
      onSaveChanges () {
        const newDate = new Date(this.meetup.date)
        const newDay = new Date(this.editableDate).getUTCDate()
        const newMonth = new Date(this.editableDate).getUTCMonth()
        const newYear = new Date(this.editableDate).getUTCFullYear()
        newDate.setUTCDate(newDay)
        newDate.setUTCMonth(newMonth)
        newDate.setUTCFullYear(newYear)
        console.log(this.editableDate)
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          date: newDate
        })
      }
    },
    created () {
      const pickerDate = new Date(this.meetup.date)
      this.editableDate = pickerDate.getUTCFullYear() + '-' + (pickerDate.getUTCMonth() + 1) + '-' + pickerDate.getUTCDate()
    }
  }
</script>