<template>
  <div>
    <div v-for="v in vouchers_vouchers" :key="v.uid">
      {{v.profile}}
      {{v.username}}
      {{v.password}}
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
    };
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