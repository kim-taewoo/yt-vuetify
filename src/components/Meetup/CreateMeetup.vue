<template>
  <v-container>
    <v-layout  justify-center row>
      <v-flex xs12 sm6>
        <h2 class="red--text text--darken-2">Create a New Meetup</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form autocomplete="off" @submit.prevent="onCreateMeetup">
          <v-layout justify-center row>
            <v-flex xs12 sm6>
              <v-text-field
                name="title"
                label="제목"
                id="title"
                required
                v-model="title">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout justify-center row>
            <v-flex xs12 sm6>
              <v-text-field
                name="location"
                label="장소"
                id="location"
                required
                v-model="location">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout justify-center row>
            <v-flex xs12 sm6>
              <v-text-field
                name="description"
                label="설명"
                id="description"
                required
                multi-line
                v-model="description">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout justify-center row>
            <v-flex xs12 sm6>
              <h4 class="subheading">배경 사진</h4>
              <v-btn
              color="primary"
              class="white--text"
              @click="onPickFile"
              raised
              style="margin-left: 0;"
            >
              Upload
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
              <input
                multiple
                type="file" 
                style="display:none" 
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked">
              <!-- <v-text-field
                name="imageUrl"
                label="이미지"
                id="image-url"
                required
                v-model="imageUrl">
              </v-text-field> -->
              <img
                v-for="(img,index) in imageUrl"
                :key="index"
                :src="img"
                width="100%"
                alt="">
            </v-flex>
          </v-layout>
          <v-layout justify-center mt-3>
            <v-flex xs12 sm6>
              <h4 class="subheading">날짜 정하기*</h4>
            </v-flex>
          </v-layout>
          <v-layout justify-center>
            <v-flex xs12 sm6>
              <v-date-picker
              v-model="date"
              color="primary"
              locale="ko-kr"></v-date-picker> 
            </v-flex>
          </v-layout>
          <v-layout justify-center mt-3>
            <v-flex xs12 sm6>
              <h4 class="subheading">시간 정하기*</h4>    
            </v-flex>
          </v-layout>
          <v-layout justify-center>
            <v-flex xs12 sm6>
              <v-time-picker v-model="time" color="primary"></v-time-picker> 
            </v-flex>
          </v-layout>

          <v-layout justify-center mt-3>
            <v-flex xs12 sm6>
              <v-divider></v-divider>
            </v-flex>
          </v-layout>
          <v-layout justify-center row>
            <v-flex xs12 sm6>
              <v-btn class="primary" :disabled="!formIsValid" type="submit">약속 만들기</v-btn>
            </v-flex>
          </v-layout>       
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        location: '',
        imageUrl: [],
        description: '',
        date: null,
        time: new Date(),
        image: []
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' &&
        this.location !== '' &&
        this.imageUrl !== '' &&
        this.description !== ''
      },
      submittableDateTime () {
        const date = new Date(this.date)
        if (typeof this.time === 'string') {
          const hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        return date
      }
    },
    methods: {
      onCreateMeetup () {
        if (!this.formIsValid) {
          return
        }
        if (!this.image) {
          return
        }
        const meetupData = {
          title: this.title,
          location: this.location,
          // imageUrl: this.imageUrl,
          image: this.image,
          description: this.description,
          date: this.submittableDateTime
        }
        this.$store.dispatch('createMeetup', meetupData)
        this.$router.push('/meetups')
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        this.image = []
        this.imageUrl = []
        const files = event.target.files
        console.log('1:', files)
        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          let filename = file.name
          if (filename.lastIndexOf('.') <= 0) {
            return alert('유효한 이미지 파일을 업로드 해주세요!')
          }
          const fileReader = new FileReader()
          fileReader.addEventListener('load', () => {
            this.imageUrl.push(fileReader.result)
          })
          fileReader.readAsDataURL(file)
          this.image.push(file)
        }
        // let filename = files[0].name
        // console.log('3:', filename)
        // if (filename.lastIndexOf('.') <= 0) {
        //   return alert('유효한 이미지 파일을 업로드 해주세요!')
        // }
        console.log(this.image)
        console.log(this.imageUrl)
        // fileReader.readAsDataURL(files[0])
        // this.image = files[0]
      }
    }
  }
</script>