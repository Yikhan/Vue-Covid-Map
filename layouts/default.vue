<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="navigation">
      <b-navbar-brand>
        <nuxt-link class="nav-link title" to="/" exact>Covid-19 Data Playground</nuxt-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <nuxt-link class="nav-link" to="/" exact>Data Map</nuxt-link>
          </b-nav-item>
          <b-nav-item>
            <nuxt-link class="nav-link" to="/grid" exact>Data Grid</nuxt-link>
          </b-nav-item>
          <b-nav-item>
            <nuxt-link class="nav-link" to="/addRecord" exact>Add New Record</nuxt-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <nuxt-child />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="less" scoped>
.navigation {
  font-family: 'Goldman', cursive;
  .title {
    color: whitesmoke;
  }
}
</style>