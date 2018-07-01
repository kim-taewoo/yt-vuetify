<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout wrap>
          <v-flex xs12>
            <v-card-title class="title">수정하기</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="제목"
                id="title"
                required
                v-model="editedTitle">
              </v-text-field>
              <v-text-field
                name="description"
                label="설명"
                id="description"
                required
                multi-line
                v-model="editedDescription">
              </v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat class="blue--text" @click="editDialog = false">닫기</v-btn>
              <v-btn flat class="blue--text" @click="onSaveChanges">저장</v-btn>
            </v-card-actions>
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
        editedTitle: this.meetup.title,
        editedDescription: this.meetup.description,
        editDialog: false
      }
    },
    methods: {
      onSaveChanges () {
        if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
          return
        }
        this.editDialog = false
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          title: this.editedTitle,
          description: this.editedDescription
        })
      }
    }
  }
</script>
