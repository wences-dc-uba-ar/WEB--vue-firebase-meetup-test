<template>
  <v-dialog
    scrollable
    max-width="350px"
    transition="dialog-transition"
    v-model="showDialog"
  >
    <v-btn
      accent
      slot="activator"
      color="success">
      Edit Date
    </v-btn>

    <v-card>
      <v-container>
        <v-layout
          row
          wrap>
          <v-flex xs12>
            <v-card-title primary-title>
              Edit Meetup Date
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider/>
        <v-layout
          row
          wrap>
          <v-flex xs12>
            <v-date-picker
              v-model="fecha"
              :landscape="false"
              :reactive="true"
              actions>
              <template slot-scope="{save, cancel}" >
                <v-btn
                  flat
                  color="red"
                  @click.native="onClose">Close</v-btn>
                <v-spacer/>
                <v-btn
                  flat
                  color="blue"
                  @click.native="onSave">save</v-btn>
              </template>
            </v-date-picker>
          </v-flex>
        </v-layout>

      </v-container>
    </v-card>

  </v-dialog>
</template>

<script>
export default {
  props: {
    meetup: {
      type: Object,
      default() {
        return {
          date: new Date()
        };
      }
    }
  },
  data() {
    return {
      showDialog: false,
      // date: this.meetup.date.toISOString(),
      fecha: this.getFecha(this.meetup.date),
      hora: this.getHora(this.meetup.date)
    };
  },
  computed: {},
  methods: {
    getFecha(dt) {
      // return date.toJSON().substring(0, 10);      // UTC:
      return dt.getFullYear() + '-' + ('0'+(dt.getMonth()+1)).slice(-2) + '-' + ('0'+dt.getDate()).slice(-2); // da en Local Timezone
    },
    getHora(dt) {
      // return date.toJSON().substring(11, 19); // da en UTC
      return ('0'+dt.getHours()).slice(-2) + ':' + ('0'+dt.getMinutes()).slice(-2) + ':' + dt.getSeconds(); // da en Local Timezone
    },
    getDateUTC(fecha, hora) {
      const year = fecha.match(/^(\d+)-/)[1];
      const month = fecha.match(/-(\d+)-/)[1];
      const day = fecha.match(/-(\d+)$/)[1];

      const hour = hora.match(/^(\d+)/)[1];
      let minutes = hora.match(/:(\d+)/)[1];
      //   minutes = parseInt(minutes) - (new Date()).getTimezoneOffset();

      const dateUTC = new Date(year, month - 1, day, hour, minutes);

      return dateUTC;
    },
    onSave() {
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: this.getDateUTC(this.fecha, this.hora)
      });
      this.showDialog = false;
    },
    onClose() {
      this.showDialog = false;
    }
  }
};
</script>
