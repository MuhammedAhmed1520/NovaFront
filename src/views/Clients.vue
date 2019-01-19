<template>
  <div class="money">
    <v-toolbar flat color="white">
      <v-toolbar-title class="subheading grey--text">
        <v-icon>person</v-icon>All Clients Data
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

      <v-dialog right v-model="type_dialog" max-width="800px">
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
                  <v-text-field label="Name" color="teal"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="NickName" color="teal"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="Email" color="teal"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="Phone" color="teal"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="Skype" color="teal"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="Country" color="teal"></v-text-field>
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
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
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
        text: "Name",
        align: "left",
        value: "name"
      },
      { text: "NickName", value: "name" },
      { text: "Email", value: "name" },
      { text: "Phone ", value: "name" },
      { text: "Skype ", value: "name" },
      { text: "Country ", value: "name" },
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
      return this.editedIndex === -1 ? "New Client" : "Edit Client";
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
