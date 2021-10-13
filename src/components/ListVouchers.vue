<template>
  <v-container>
    <v-row>
      <v-col>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Seller
                </th>
                <th class="text-left">
                  1 Hari
                </th>
                <th class="text-left">
                  3 Hari
                </th>
                <th class="text-left">
                  7 Hari
                </th>
                <th class="text-left">
                  Tambah Voucher
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in vouchers"
                :key="item.uid"
              >
                <td>{{ item.seller }}</td>
                <td>{{ item.v1 }}</td>
                <td>{{ item.v3 }}</td>
                <td>{{ item.v7 }}</td>
                <td>
                  <v-dialog
                    v-model="dialog"
                    width="500"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        :loading="loading5"
                        :disabled="loading5"
                        color="primary"
                        class="ma-2 white--text"
                        fab
                        @click="loader = 'loading5'"
                        x-small
                      >
                        <v-icon dark>
                          mdi-plus-thick
                        </v-icon>
                      </v-btn>
                    </template>

                    <v-card>
                      <v-card-title class="text-h5 grey lighten-2">
                        Upload CSV File
                      </v-card-title>

                        <v-card-text>
                          <v-form>
                            <v-file-input
                              :rules="rules"
                              accept=".csv"
                              placeholder="Pilih csv file"
                            ></v-file-input>
                          </v-form>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            text
                            @click="dialog = false"
                          >
                            Tambah
                          </v-btn>
                        </v-card-actions>
                    </v-card>
                  </v-dialog>
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
        vouchers: [
          {
            seller: 'Seller A',
            v1: 20,
            v3: 6,
            v7: 20
          },
          {
            seller: 'Seller B',
            v1: 30,
            v3: 6,
            v7: 20
          },
          {
            seller: 'Seller C',
            v1: 10,
            v3: 6,
            v7: 20
          }
        ],
        rules: [
          value => !value || (value.type == "application/vnd.ms-excel" || value.type == "text/csv") || 'File must be CSV',
        ],
        loader:null,
        loading5: false,
        dialog: false,
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },
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