<template>
  <v-app-bar
      app
      color="#AD8B73"
      dark
    >
      <div class="d-flex align-center">
        <v-toolbar-title>SECOND HANDED</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
      <v-btn icon dark>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon dark>
        <v-icon>mdi-chat-processing-outline</v-icon>
      </v-btn>
      <div class="d-flex align-center">
        <template>
          <v-menu
            v-model="loginPopper"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-y
            v-if="auth.create && !searchState"
          >
            <template
              v-slot:activator="{ on }"
            >
              <v-btn
                v-on="on"
                elevation="2"
              >LOG IN</v-btn>

            </template>

            <v-card v-if="newFolderPopper">
              <v-card-text>
                <v-text-field
                  v-model="newFolderName"
                  :rules="folderNameRules"
                  :maxlength="25"
                  :counter="25"
                  @keydown.enter="mkdir"
                  clearable
                  label="Name"
                  :autofocus="true"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn @click="newFolderPopper = false" depressed>Cancel</v-btn>
                <v-btn
                  color="success"
                  :disabled="!folderNameValidation()"
                  depressed
                  @click="mkdir"
                >
                  Create Folder
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
          <v-btn
            icon
            dark
            title="Upload Files"
            @click="uploadOpen"
            v-if="auth.upload && !searchState"
          >
            <v-icon>mdi-plus-circle</v-icon>
          </v-btn>

          <template>
            <div class="text-center">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-if="userRole === 'MASTER'"
                    icon
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-dots-horizontal</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    to="/admin/management"
                  >
                    <v-list-item-title class="menu-txt">관리자페이지</v-list-item-title>
                  </v-list-item>

                  <v-list-item
                    to="/admin/log"
                  >
                    <v-list-item-title class="menu-txt">로그페이지</v-list-item-title>
                  </v-list-item>

                </v-list>
              </v-menu>
            </div>
          </template>
        </template>
        <v-btn
          elevation="2"
        >JOIN US</v-btn>
      </div>

  </v-app-bar>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";

  @Component({})
  export default class Navbar extends Vue{
    private loginPopper = false;
  }
</script>