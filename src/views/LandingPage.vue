<template>
  <div class="landing-page container is-multiline columns">
    <div class="has-text-centered logo column is-full">
      Logo will be here
    </div>
    <div class="column is-full">
      <h1 class="has-text-primary has-text-centered title is-2">Healthdesk</h1>
    </div>
    <div class="has-text-centered has-text-grey column is-full">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consectetur
      ante vitae ligula tincidunt condimentum. Suspendisse potenti. Aliquam
      imperdiet tellus dui, vel ultricies enim tempus vitae. Curabitur eget
      turpis lobortis magna elementum dignissim ac ac lacus.
    </div>
    <div class="columns is-multiline links column is-full">
      <div class="column is-full has-text-centered">
        How can we help you?
      </div>
      <div class="column is-full">
        <router-link to="/form" v-slot="{ navigate }">
          <b-button @click="navigate" type="is-primary" rounded expanded
            >Find a medical center</b-button
          >
        </router-link>
      </div>
      <div class="column is-full">
        <b-button type="is-light" rounded expanded>Authorize</b-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.logo {
  border: 1px solid black;
}

.links {
  margin-top: 1rem;
}
</style>
