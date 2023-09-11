<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'
const navigation = [
  { name: 'Преподаватель', href: '/' },
  { name: 'Педиатр', href: '/doctor' },
  // { name: 'Админ', href: '/login' },
  // { name: 'Calendar', href: '/b' },
]



const activeClasses = ref('text-blue-600 bg-gray-100 active');
const unactiveClasses = ref('hover:text-gray-600 hover:bg-gray-50')

</script>

<script lang="ts">

export default {
  methods: {
    triggerLogin() {
      this.$auth0.loginWithRedirect();
    }
  }
};
</script>

<template>
  <header>
    <div class="wrapper min-w-full">
      <ul class="min-w-full flex overflow-y-scroll items-center justify-center text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <!-- <li class="mr-2">
              <a href="#" aria-current="page" class="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active">Profile</a>
          </li>
          <li class="mr-2">
              <a href="#" class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50">Dashboard</a>
          </li>
          <li class="mr-2">
              <a href="#" class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50">Settings</a>
          </li>
          <li class="mr-2">
              <a href="#" class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50">Contacts</a>
          </li> -->
          <!-- eslint-disable-next-line vue/require-v-for-key -->
          <li class="mr-2" v-for="item in navigation"> 
              <RouterLink class="inline-block p-4 rounded-t-lg" :to="item.href" :class="[item.href == $route.path ?  activeClasses : unactiveClasses]"> {{ item.name }} </RouterLink>
          </li>
          <!-- <li class="mr-2"> 
            <a class="inline-block p-4 rounded-t-lg" :class="[unactiveClasses]" @click="triggerLogin"> Админ </a>
          </li> -->
      </ul>
    </div>
  </header>
  <RouterView /> 
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

header li {
  cursor: pointer;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
