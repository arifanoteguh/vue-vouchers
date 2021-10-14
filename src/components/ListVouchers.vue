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
                              @change="onAddFile"
                            ></v-file-input>
                          </v-form>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            text
                            @click="uploadVoucher"
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
    <v-row>
      <v-col>
        <div v-for="vv in vvouchers" :key="vv.Username">
          {{vv.Username}}
          {{vv.Password}}
          {{vv.Profile}}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import gql from 'graphql-tag';

  const papa = require('papaparse');

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
        vvouchers:[],
        rules: [
          value => !value || (value.type == "application/vnd.ms-excel" || value.type == "text/csv") || 'File must be CSV',
        ],
        file:null,
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
    methods: {
      async addVouchers(vvouchers){
        console.log("Im at addVouchers")
        for (let index = 0; index < vvouchers.length; index++) {              
          console.log("Im at iteration")
          await this.$apollo.mutate({
            // Query
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
            variables: {
              username: vvouchers[index].Username,
              password: vvouchers[index].Password,
              profile: vvouchers[index].Profile,
            }
          })
          console.log("Voucher "+index)
        }
        console.log("Im finished");
        this.file=""
        this.dialog = false;
      },
      uploadVoucher() {
        var ref = this;
        this.$papa.parse(this.file, {
          header: true,
          complete: function(results){
            this.vvouchers = results.data
            ref.addVouchers(this.vvouchers)
          }
        })
      },
      onAddFile(files) {
        this.file=files;  
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