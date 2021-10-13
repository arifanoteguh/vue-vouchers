<template>
  <v-container>
    <v-row align="center">
      <v-col>
        <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Voucher
              </th>
              <th class="text-left">
                Jumlah
              </th>
              <th class="text-left">
                
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in desserts"
              :key="item.name"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.sisa }}</td>
              <td>
                <v-btn
                  class="ma-2"
                  :loading="loading"
                  :disabled="loading"
                  color="primary"
                  @click="loader = 'loading'"
                  small
                >
                  Print
                  <v-icon right >
                    mdi-printer
                  </v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        desserts: [
          {
            name: '1 Hari',
            sisa: 20
          },
          {
            name: '3 Hari',
            sisa: 30
          },
          {
            name: '7 Hari',
            sisa: 0
          }
        ],
        loader: null,
        loading: false
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]
        setTimeout(() => (this[l] = false), 3000)
        this.loader = null
      }
    }
  }
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>