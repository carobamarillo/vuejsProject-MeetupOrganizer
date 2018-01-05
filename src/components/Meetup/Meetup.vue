<template>
  <v-content>
    <v-container>
      <v-layout row wrap v-if="loading">
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular indeterminate color="primary" :size="70"></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center v-else>
        <v-flex xs12>
          <v-card>
            <v-card-title>
              <h1 class="accent--text">{{ meetup.title }}</h1>
              <template v-if="userIsCreator">
                <v-spacer></v-spacer>
                <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
              </template>
            </v-card-title>
            <v-card-media :src="meetup.imageUrl" height="400px"></v-card-media>
            <v-card-text>
              <div>{{ meetup.date | date }} - {{ meetup.location }}</div>
              <div>
                <app-edit-meetup-date-dialog 
                :meetup="meetup" 
                v-if="userIsCreator"></app-edit-meetup-date-dialog>
                <app-edit-meetup-time-dialog
                :meetup="meetup"
                v-if="userIsCreator"
                ></app-edit-meetup-time-dialog>
              </div>
              <div class="mt-2">{{ meetup.description }}</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <app-meetup-register-dialog :meetupId="meetup.id" v-if="userIsAthenticated && !userIsCreator"></app-meetup-register-dialog>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      meetup () {
        return this.$store.getters.loadedMeetup(this.id)
      },
      userIsAthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAthenticated) {
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