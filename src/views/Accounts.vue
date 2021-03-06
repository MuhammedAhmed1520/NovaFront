<template>
  <div class="accounts">
    <v-toolbar flat color="white">
      <v-toolbar-title class="subheading grey--text">
        <v-icon>account_balance_wallet</v-icon>All Accounts Data
      </v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        color="teal"
        single-line
        hide-details
      ></v-text-field>

      <!-- Add New Account Dialog -->
      <v-dialog v-model="account_dialog" max-width="800px">
        <v-btn fab dark slot="activator" round color="teal" class="mb-2">
          <v-icon dark>add</v-icon>
        </v-btn>
        <v-card>
          <v-card-title>
            <v-container>
              <v-layout left mt-2>
                <span class="headline">New Account Data</span>
              </v-layout>
              <v-layout right>
                <!-- Account Type -->
                <v-dialog right v-model="type_dialog" max-width="500px">
                  <v-btn slot="activator" round color="teal" dark class="mb-2">New Account Type
                    <v-icon right dark>add</v-icon>
                  </v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm12 md12>
                            <v-text-field
                              v-model="editedItem.name"
                              color="teal"
                              label="Account TypeName"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="teal" flat @click="close">Cancel</v-btn>
                      <v-btn
                        color="teal"
                        :loading="true"
                        :disabled="loading"
                        flat
                        @click="save"
                      >Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-layout>
            </v-container>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="Name" color="teal" required></v-text-field>
                </v-flex>

                <v-flex xs12 sm6>
                  <v-select
                    :items="['1', '2', '3', '4']"
                    label="Account Type"
                    required
                    color="teal"
                  ></v-select>
                </v-flex>

                <v-flex xs12 sm6 md6>
                  <v-text-field label="Default Value" color="teal" hint="Account balance"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md6>
                  <v-text-field label="Value" color="teal" hint="Real Account balance"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12>
                  <v-select
                    :items="['Dollar', 'Dollar2', 'Dollar3', 'Dollar4']"
                    label="Currency"
                    required
                    color="teal"
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    name="input-7-1"
                    box
                    label="Notes"
                    auto-grow
                    color="teal"
                    background-color="white"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="teal" flat @click="account_dialog = false">Close</v-btn>
            <v-btn
              color="teal"
              :loading="true"
              :disabled="loading"
              flat
              @click="account_dialog = false"
            >Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="desserts" class="elevation-1" :loading="true">
      <v-progress-linear slot="progress" height="2" color="teal" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.calories }}</td>
        <td class="text-xs-left">{{ props.item.fat }}</td>
        <td class="text-xs-left">{{ props.item.carbs }}</td>
        <td class="text-xs-left">{{ props.item.protein }}</td>
        <td class="text-xs-left">{{ props.item.protein }}</td>

        <td class="justify-center layout px-0">
          <v-tooltip class="mt-3" left>
            <v-icon
              small
              class="mr-2"
              slot="activator"
              color="teal"
              @click="editItem(props.item)"
            >edit</v-icon>
            <span>Edit</span>
          </v-tooltip>
          <v-tooltip class="mt-3" right>
            <v-icon
              small
              color="red lighten-1"
              text-color="white"
              slot="activator"
              @click="deleteItem(props.item)"
            >delete</v-icon>
            <span>Delete</span>
          </v-tooltip>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    type_dialog: false,
    account_dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    alert: false,
    headers: [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Account Type", value: "protein" },
      { text: "Default Value", value: "protein" },
      { text: "Value", value: "protein" },
      { text: "Signture ", value: "protein" },
      { text: "Notes", value: "protein" },
      { text: "Actions", value: "name", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Account Type" : "Edit Account Type";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.desserts = [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.account_dialog = true;
      this.alert = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);

      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        confirmButtonColor: "#EF5350",
        cancelButtonText: "No, cancel!",
        cancelButtonColor: "#009688",
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          this.$swal({
            title: "Deleted",
            text: "Your file has been deleted.",
            type: "success",
            confirmButtonColor: "#009688"
          });
          this.snackbar = true;
        } else if (
          // Read more about handling dismissals
          result.dismiss === this.$swal.DismissReason.cancel
        ) {
          this.$swal({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            type: "error",
            confirmButtonColor: "#009688"
          });
          this.snackbar = true;
        }
      });
    },

    close() {
      this.type_dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
      this.alert = true;
    }
  }
};
</script>
