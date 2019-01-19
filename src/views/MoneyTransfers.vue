<template>
  <div class="money">
    <v-toolbar flat color="white">
      <v-toolbar-title class="subheading grey--text">
        <v-icon>transform</v-icon>All Money Transfers
      </v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
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
      <v-dialog transition="slide-y-reverse-transition" v-model="type_dialog" max-width="800px">
        <v-btn fab dark slot="activator" round color="teal" class="mb-2">
          <v-icon dark>add</v-icon>
        </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="Value" color="teal" hint="Value that will Transfered"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    label="Actual Value"
                    color="teal"
                    hint="Value that will be Recieved"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    :items="['Account1', 'Account2', 'Account3', 'Account4']"
                    label="From Account"
                    required
                    color="teal"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    :items="['Account1', 'Account2', 'Account3', 'Account4']"
                    label="To Account"
                    required
                    color="teal"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    :items="['Completed', 'Not Completed']"
                    label="Status"
                    required
                    color="teal"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-menu
                    :close-on-content-click="false"
                    v-model="menu2"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      color="teal"
                      v-model="date"
                      label="Expected Date"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker v-model="date" color="teal" @input="menu2 = false"></v-date-picker>
                  </v-menu>
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
            <v-btn color="teal" flat @click="close">Cancel</v-btn>
            <v-btn color="teal" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="desserts" class="elevation-1" :loading="true">
      <v-progress-linear slot="progress" height="2" color="teal" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.calories }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">
          <v-tooltip v-if="props.item.status == 'Not Completed'" top>
            <v-icon slot="activator" color="teal lighten-3" text-color="white">cancel</v-icon>
            <span>{{ props.item.status }}</span>
          </v-tooltip>

          <v-tooltip v-else top>
            <v-icon slot="activator" color="teal" text-color="white">check_circle</v-icon>
            <span>{{ props.item.status }}</span>
          </v-tooltip>

          <!-- <v-icon  v-if="props.item.status == 'Not Completed'" color="teal lighten-3" text-color="white">cancel</v-icon>
          <v-icon  v-else  color="teal" text-color="white">check_circle</v-icon>-->
        </td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>

        <td class="justify-start layout px-0">
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
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >Money Transaction Added Successfully
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    type_dialog: false,
    notifications: false,
    sound: true,
    snackbar: false,
    color: "teal",
    mode: "",
    timeout: 6000,
    widgets: false,
    alert: false,
    date: "",
    menu: false,
    modal: false,
    menu2: false,
    headers: [
      {
        text: "Value",
        align: "left",
        value: "protein"
      },
      { text: "From Account", value: "name" },
      { text: "To Account", value: "name" },
      { text: "Actual Value", value: "protein" },
      { text: "Expected Date ", value: "name" },
      { text: "Status ", value: "status" },
      { text: "Signture ", value: "name" },
      { text: "Notes", value: "name", sortable: false },
      { text: "Actions", align: "left", value: "name", sortable: false }
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
      return this.editedIndex === -1
        ? "New Money Transfer"
        : "Edit Money Transfer";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
    console.log(this.$ls.get("data"));
  },
  methods: {
    initialize() {
      this.desserts = [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          status: "Completed"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          status: "Not Completed"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          status: "Completed"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          status: "Not Completed"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          status: "Completed"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          status: "Not Completed"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          status: "Completed"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          status: "Not Completed"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          status: "Completed"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          status: "Not Completed"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.type_dialog = true;
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
      this.snackbar = true;
    }
  }
};
</script>
