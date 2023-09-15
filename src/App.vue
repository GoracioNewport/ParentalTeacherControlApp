<script setup lang="ts">
import { initDropdowns } from 'flowbite'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'

const navigation = [
  { name: 'Преподаватель', href: '/' },
  { name: 'Педиатр', href: '/doctor' },
  { name: 'Диетолог', href: '/diet' },
  { name: 'Кинолог', href: '/kinologist'}
  // { name: 'Админ', href: '/login' },
  // { name: 'Calendar', href: '/b' },
]

const routeToName = {
  'Main': 'Преподаватель',
  'doctor': 'Педиатр',
  'diet': 'Диетолог',
  'kinologist': 'Кинолог'
}

onMounted(() => {
  initDropdowns();   
});

const activeClasses = ref('text-blue-600 bg-gray-100 active');
const unactiveClasses = ref('hover:text-gray-600 hover:bg-gray-50')

</script>

<template>
  <header>
    <div class="wrapper min-w-full">
      <ul class="min-w-full flex overflow-y-scroll items-center justify-center text-sm font-medium text-center text-gray-500 border-b border-gray-200 pt-2">
          <span class="font-bold leading-6 text-gray-900 pb-2">
            Вы&nbsp;
          </span>
          <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="flex items-center text-gray-900 bg-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-2 py-2 mr-2 mb-2" type="button">
            {{ routeToName[$route.name] }} &nbsp;
            <ChevronUpDownIcon class="h-5 w-5 text-gray-400 mt-1"/>
          </button>
          <span class="font-bold leading-6 text-gray-900 pb-2">
            ?
          </span>
          <!-- Dropdown menu -->
          <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul class="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <!-- <li>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                </li> -->
                <li v-for="item in navigation" :key="item.name"> 
                    <RouterLink class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" :to="item.href" :class="[item.href == $route.path ?  activeClasses : unactiveClasses]"> {{ item.name }} </RouterLink>
                </li>
              </ul>
          </div>
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
