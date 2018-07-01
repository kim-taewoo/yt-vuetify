import * as firebase from 'firebase'

export default {
  state: {
    loadedMeetups: [
      {
        imageUrl: 'http://mblogthumb2.phinf.naver.net/MjAxNzA2MjJfOTgg/MDAxNDk4MDYwMjAzMDA4.Pq7QO5b18GNzTiIcUO4qkO4LSPkCXPrTeUkqYg8oUwsg.Cs0Iad_Rz_41kyCD_oMECT94v441WguEIySYi_bQDmYg.JPEG.formaj/IMG_5473.jpg?type=w800',
        id: 'fjae;jae',
        title: '대학로 Emoi',
        date: new Date(),
        location: '대학로 Emoi'
      },
      {
        imageUrl: 'http://cfile25.uf.tistory.com/image/2301304056C5631007D99E',
        id: 'faa',
        title: '대학로 정돈 돈까스',
        date: new Date(),
        location: '정돈 돈까스'
      }
    ]
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetupData (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
    }
  },
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const imageUrl = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              creatorId: obj[key].creatorId,
              location: obj[key].location
            })
            console.log(obj[key].imageUrl.val())
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    createMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: [],
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let key
      let storageRef
      let imageUrl
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key
          // commit('createMeetup', {
          //   ...meetup,
          //   id: key
          // })
          return key
        })
        .then(key => {
          for (let i = 0; i < payload.image.length; i++) {
            const img = payload.image[i]
            const filename = img.name
            const ext = filename.slice(filename.lastIndexOf('.'))
            storageRef = firebase.storage().ref()
            storageRef.child('meetups/' + key + i + ext).put(img)
              .then(fileData => {
                return storageRef.child(fileData.ref.fullPath).getDownloadURL()
              })
              .then(imgUrl => {
                imageUrl = imgUrl
                return firebase.database().ref('/meetups/' + key).child('/imageUrl/')
                  .push(imgUrl)
              })
              .then(data => {
                return meetup.imageUrl.push({
                  imageUrl: imageUrl, fbKey: data.key
                })
              })
          }
          // const filename = payload.image.name
          // const ext = filename.slice(filename.lastIndexOf('.'))
          // storageRef = firebase.storage().ref()
          // return storageRef.child('meetups/' + key + ext).put(payload.image)
        })
        // .then(fileData => {
        //   return storageRef.child(fileData.ref.fullPath).getDownloadURL()
        // })
        // .then(imageUrl => {
        //   return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
        // })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            // imageUrl: imageDone,
            id: key
          })
          commit('setLoading', false)
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    updateMeetupData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then(() => {
          commit('updateMeetupData', payload)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date < meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    }
  }
}
