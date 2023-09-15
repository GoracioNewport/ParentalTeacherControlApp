<template>
  <main>
    <div class="mx-auto max-w-lg max-w-7xl py-6 sm:px-6 lg:px-8 p-5">
        <!-- Your content -->
      <form>

        <Listbox as="div" v-model="selectedChild">
          <ListboxLabel class="block font-bold leading-6 text-gray-900">Ребёнок:</ListboxLabel>
          <div class="relative mt-2">
            <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span class="flex items-center">
                <!-- <img :src="selected.avatar" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" /> -->
                <span class="block truncate">{{ selectedChild.name }} </span>
              </span>
              <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>

            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
              <ListboxOptions class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ListboxOption as="template" v-for="person in children" :key="person.id" :value="person" v-slot="{ active, selected }">
                  <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                    <div class="flex items-center">
                      <!-- <img :src="person.avatar" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" /> -->
                      <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ person.name }}</span>
                    </div>

                    <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                      <CheckIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
        
        <Listbox as="div" v-model="selectedTeacher" class="block mt-6">
          <ListboxLabel class="block font-bold leading-6 text-gray-900">Спициалист:</ListboxLabel>
          <div class="relative mt-2">
            <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span class="flex items-center">
                <!-- <img :src="selected.avatar" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" /> -->
                <span class="block truncate">{{ selectedTeacher.name }} / {{ selectedTeacher.job  }}</span>
              </span>
              <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>

            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
              <ListboxOptions class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ListboxOption as="template" v-for="person in teachers" :key="person.id" :value="person" v-slot="{ active, selected }">
                  <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                    <div class="flex items-center">
                      <!-- <img :src="person.avatar" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" /> -->
                      <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ person.name }} / {{ person.job  }}</span>
                    </div>

                    <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                      <CheckIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>

        <div class="block mt-6">
          <span class="font-bold text-gray-900"> Период: </span>
          <vue-tailwind-datepicker :formatter="formatter" :shortcuts="false" v-model="dateValue" as-single use-range style="border-color: lightgrey;" class="mt-2"/>
        </div>

        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <div v-for="item in botomTextInputs" :key="item.title" class="block mt-6">
          <label :for="item.title" class="block mb-2 font-bold text-gray-900"> {{ item.title }}</label>
          <textarea @input="item.value = ($event.target as HTMLInputElement).value" :id="item.title" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" :placeholder="item.placeholder"></textarea>
        </div>

        <div v-for="(item, index) in deviations" :key="index" class="block mt-6">


          <div>
            <label :for="'deviationa' + index" class="block mb-2 font-bold text-gray-900 flex items-center justify-between"> 
              Отклонение №{{ index + 1 }}, описание
              <TrashIcon v-if="index == (deviations.length - 1)" class="h-5 w-5 text-gray-400" @click="removeDeviation"/>
            </label>
            <textarea @input="item.description = ($event.target as HTMLInputElement).value" :id="'deviationa' + index" rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Пожалуйста, дайте развернутый ответ"></textarea>
          </div>

          <div class="block mt-6">
            <label :for="'deviationb' + index" class="block mb-2 font-bold text-gray-900"> Отклонение №{{ index + 1 }}, мероприятия по устранению</label>
            <textarea @input="item.due = ($event.target as HTMLInputElement).value" :id="'deviationb' + index" rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Пожалуйста, дайте развернутый ответ"></textarea>
          </div>

          <div class="block mt-6">
            <label :for="'deviationc' + index" class="block mb-2 font-bold text-gray-900"> Отклонение №{{ index + 1 }}, срок устранения/ФИО ответственного </label>
            <textarea @input="item.manager = ($event.target as HTMLInputElement).value" :id="'deviationc' + index" rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Дата/ФИО"></textarea>
          </div>
        </div>

        <div class="block mt-6 flex items-center justify-end">
          <button class="flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click.prevent="addDeviation">
            <PlusIcon class="h-5 w-5 pt-1"/>
            &nbsp;Добавить отклонение
          </button>
        </div>
        
        <div class="mt-6 flex items-center justify-between gap-x-6">

          <div class="flex">
            <div class="flex items-center h-5">
              <input id="helper-checkbox" aria-describedby="helper-checkbox-text" type="checkbox" v-model="saveLocal" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            </div>
            <div class="ml-2 text-sm">
              <label for="helper-checkbox" class="font-medium text-gray-900 dark:text-gray-300">Сохранить отчёт</label>
              <p id="helper-checkbox-text" class="text-xs font-normal text-gray-500 dark:text-gray-300">Скачать pdf-файл на ваше устройство</p>
            </div>
          </div>

          <!-- <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button> -->
          <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click.prevent="processSend">Отправить</button>
        </div>

      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon, PlusIcon, TrashIcon } from '@heroicons/vue/20/solid'
import dayjs from 'dayjs'
// @ts-ignore
import VueTailwindDatepicker from 'vue-tailwind-datepicker'

// @ts-ignore
import { generatePdf } from '../utils/pdf-generator.js'
// @ts-ignore
import { sendToAdmin } from '../utils/telegram-sender.js'

const dateValue = ref([])
const saveLocal = ref(true)
const botomTextInputs = ref([
  {
    title: 'Обращения по заболеванию',
    value: "",
    placeholder: "Пожалуйста, дайте развернутый ответ",
  },
  {
    title: 'Пропуски занятий по заболеванию',
    value: "",
    placeholder: "Пожалуйста, дайте развернутый ответ",
  },
  {
    title: 'Плановые мероприятия (в отчётном периоде)',
    value: "",
    placeholder: "Пожалуйста, дайте развернутый ответ",
  },
  {
    title: 'Дата следующих исследований',
    value: "",
    placeholder: "Пожалуйста, дайте развернутый ответ",
  },
  {
    title: 'Рекомендации/замечания',
    value: "",
    placeholder: "Пожалуйста, дайте развернутый ответ",
  },
  {
    title: 'Все выявленные отклонения от нормы',
    value: "",
    placeholder: "Пожалуйста, дайте развернутый ответ",
  },
  {
    title: 'Мероприятия, направленные на устранения отклонений',
    value: "",
    placeholder: "Пожалуйста, дайте развернутый ответ",
  },
])

const formatter = ref({
  date: 'DD MMM YYYY',
  month: 'MMM'
})

const teachers = [
  {
    id: 7,
    name: 'Карпачева Н.А',
    job: 'Педиатр',
    goal: 'Здоровье',
  }
]

const selectedTeacher = ref(teachers[0])

const children = [
  {
    id: 0,
    name: 'Максим',
  },
  {
    id: 1,
    name: 'Дима',
  },
  {
    id: 2,
    name: 'Вадим',
  },
  {
    id: 3,
    name: 'Вероника',
  }
]

const selectedChild = ref(children[0])

interface Deviation {
  description: string,
  due: string,
  manager: string,
}

// @ts-ignore
const deviations: Deviation[] = ref([])

function addDeviation() {
  // @ts-ignore
  deviations.value.push({
    description: "",
    due: "",
    manager: "",
  })
}


// @ts-ignore
function removeDeviation() {
  // @ts-ignore
  deviations.value.pop();
}

function processSend() {

  const columns = [
    { title: "Поле", dataKey: "key" },
    { title: "Значение", dataKey: "value" }
  ];

  const startDate = dayjs(dateValue.value[0]).format('DD.MM.YYYY')
  const finishDate = dayjs(dateValue.value[1]).format('DD.MM.YYYY')
  const dateInterval = startDate + " - " + finishDate;

  const title = selectedChild.value.name + ", " + selectedTeacher.value.job + ", " + dateInterval;

  let parsedFields = [
    {
      key: 'Специалист',
      value: selectedTeacher.value.name,
    },
    {
      key: 'Период',
      value: dateInterval,
    },
    {
      key: 'Спецификация',
      value: selectedTeacher.value.job,
    },
  ]

  botomTextInputs.value.forEach(item => {
    parsedFields.push({
      key: item.title,
      value: item.value
    })
  });

  let index = 1;
  // @ts-ignore
  deviations.value.forEach(item => {
    parsedFields.push({
      key: "Отклонение №" + index + ", описание",
      value: item.description
    })

    parsedFields.push({
      key: "Отклонение №" + index + ", мероприятия по устранению",
      value: item.due
    })

    parsedFields.push({
      key: "Отклонение №" + index + ", срок устранения/ФИО ответственного",
      value: item.manager
    })

    index++;
  })

  var blob = generatePdf(title, columns, parsedFields, saveLocal.value);
  sendToAdmin(blob, title);
}

</script>