<template>
  <div>
    <div v-for="v in vouchers_vouchers" :key="v.uid">
      {{v.profile}}
      {{v.username}}
      {{v.password}}
    </div>
    <div>
      <v-text-field v-model="profileAdd"></v-text-field>
      <v-text-field v-model="usernameAdd"></v-text-field>
      <v-text-field v-model="passwordAdd"></v-text-field>
      <button @click="addVoucher">Add Voucher</button>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      // Initialize your apollo data
      vouchers_vouchers:[],
      profileAdd:"",
      usernameAdd:"",
      passwordAdd:"",
    };
  },
  methods: {
    async addVoucher(){
      await this.$apollo.mutate({
        //Query
        mutation: gql`
          mutation($profile: String!, $username: String!, $password: String!){
            insert_vouchers_vouchers(objects: {password: $password, profile: $profile, username: $username}) {
              returning {
                created_at
                password
                profile
                uid
                username
              }
            }
          }
        `,
        //Param
        variables: {
          username: this.usernameAdd,
          profile: this.profileAdd,
          password: this.passwordAdd
        }
      })
    }
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    vouchers_vouchers: {
      query() { 
        return gql`query MyQuery {
          vouchers_vouchers {
            username
            profile
            password
            uid
            created_at
          }
        }`
      },
      // update: data=>data.vouchers
    }
  },
}
</script>