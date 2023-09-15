<template>
  <main>
    <div class="mx-auto max-w-lg max-w-7xl py-6 sm:px-6 lg:px-8 p-5">
        <!-- Your content -->
      <form>

        <!-- Ребенок -->
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
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
        
        <!-- Специалист -->
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
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>

        <!-- Период -->
        <div class="block mt-6">
          <span class="font-bold text-gray-900"> Период: </span>
          <vue-tailwind-datepicker :formatter="formatter" :shortcuts="false" v-model="dateValue" as-single use-range style="border-color: lightgrey;" class="mt-2"/>
        </div>
        
        <!-- Верхние поля -->
        <div v-for="item in topTextInputs" :key="item.title" class="block mt-6">
          <label :for="item.title" class="block mb-2 font-bold text-gray-900"> {{ item.title }}</label>
          <input v-model="item.value" :id="item.title" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" :placeholder="item.placeholder">
        </div>

        <!-- Комментарий -->
        <div class="block mt-6"> 
          <label for="topTextCommentsId" class="block mb-2 font-bold text-gray-900"> Комментарий </label>
          <textarea @input="topTextComments = ($event.target as HTMLInputElement).value" id="topTextCommentsId" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"> </textarea>
        </div>

        <!-- Питание -->
        <div class="block, mt-6">
          <!-- eslint-disable-next-line vue/require-v-for-key -->
          <div v-for="(item, dayIndex) in dietDays">
             <!-- eslint-disable-next-line vue/require-v-for-key -->
            <div v-for="part in item"> 
              <div style="touch-action: none;">
                <label :for="dayIndex + part.title" class="block mb-2 font-bold text-gray-900"> День №{{ dayIndex + 1 }}, {{ part.title }}</label>
                <input :id="dayIndex + part.title" v-model="part.percentage" type="range" :min="0" :max="100" step="1" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                <div class="flex justify-center px-1">
                  <!-- eslint-disable-next-line vue/require-v-for-key -->
                  <span> {{ part.percentage }}% </span>
                </div>
              </div>

              <div v-if="part.percentage !== '100'">
                <label :for="dayIndex + part.title + 'comment'" class="block mb-2 font-bold text-gray-900"> День №{{ dayIndex + 1 }}, {{ part.title }}, комментарий </label>
                <textarea @input="part.comment = ($event.target as HTMLInputElement).value" :id="dayIndex + part.title + 'comment'" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Что не съел?"> </textarea>
              </div>
            </div>    
          </div>
        </div>

        <!-- Цель -->
        <div class="block mt-6">
          <span class="font-bold text-gray-900"> Цель: </span>
          <br>
          <span class="font-medium text-gray-900"> {{ selectedTeacher.goal }} </span>
          <div class="block mt-6">
            <span class="font-bold text-gray-900"> Движемся к цели? </span>
            <br>
            <label class="relative inline-flex items-center cursor-pointer mt-1">
              <input type="checkbox" v-model="goalProgress" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span class="ml-3 text-sm font-medium text-gray-900">Да</span>
            </label>
          </div>
        </div>
        
        <!-- Отправить -->
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
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import dayjs from 'dayjs'
// @ts-ignore
import VueTailwindDatepicker from 'vue-tailwind-datepicker'

// @ts-ignore
import { generatePdf } from '../utils/pdf-generator.js'
// @ts-ignore
import { sendToAdmin } from '../utils/telegram-sender.js'

const dateValue = ref([])
const saveLocal = ref(true)
const goalProgress = ref(false)
const topTextInputs = ref([
  {
    title: 'Дата рождения',
    value: "",
    placeholder: "ДД.ММ.ГГГГ",
  },
  {
    title: 'Возраст (лет, мес)',
    value: "",
    placeholder: "Пример: 10 лет, 8 мес",
  },
  {
    title: 'Рост (норма) в см',
    value: "",
    placeholder: "Пример: 160 (165)",
  },
  {
    title: 'Вес (норма) в кг',
    value: "",
    placeholder: "Пример: 54 (55)",
  },
  {
    title: 'ИМТ',
    value: "",
    placeholder: "",
  },
  {
    title: 'Ккал/день (в среднем)',
    value: "",
    placeholder: "",
  },
  {
    title: 'Предположительный вес с учётом возраста и роста',
    value: "",
    placeholder: "",
  },
])
const topTextComments = ref("")

const formatter = ref({
  date: 'DD MMM YYYY',
  month: 'MMM'
})

const teachers = [
  {
    id: 4,
    name: 'Артемьева Н.О.',
    job: 'Диетолог',
    goal: 'Соответствие с нормами роста веса',
  },
]

const dietLength = ref(7)
interface DayDietPart {
      title: string,
      percentage: string,
      comment: string,
}

// @ts-ignore
const dietDays: DayDietPart[][] = ref([])

for (let i = 0; i < dietLength.value; i++) {
  // @ts-ignore
  dietDays.value.push([{
      title: 'Завтрак',
      percentage: '100',
      comment: ""
    },
    {
      title: 'Обед',
      percentage: '100',
      comment: ""
    },
    {
      title: 'Ужин',
      percentage: '100',
      comment: ""
    },
    {
      title: 'Десерт',
      percentage: '100',
      comment: ""
    },
  ])
}

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

function getDateDiffsInDays(date1 : dayjs.Dayjs, date2 : dayjs.Dayjs) {
  if (date1 == null || date2 == null) {
    return 0;
  }

  return date1.diff(date2, 'day')
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
    {
      key: 'Цель',
      value: selectedTeacher.value.goal,
    },
    {
      key: 'Движемся к цели?',
      value: (goalProgress.value ? "Да" : "Нет"),
    },
  ]

  topTextInputs.value.forEach(item => {
    parsedFields.push({
      key: item.title,
      value: item.value
    })
  });

  parsedFields.push({
    key: 'Комментарий',
    value: topTextComments.value
  })


  for (let i = 0; i < dietLength.value; i++) {
    // @ts-ignore
    for (let j = 0; j < dietDays.value[i].length; j++) {
      parsedFields.push({
        // @ts-ignore
        key: 'День №' + (i + 1) + ', ' + dietDays.value[i][j].title,
        // @ts-ignore
        value: dietDays.value[i][j].percentage + '%'
      })

      // @ts-ignore
      if (dietDays.value[i][j].percentage != '100') {
        parsedFields.push({
        key: 'Комментарий',
        // @ts-ignore
        value: dietDays.value[i][j].comment
      })
      }
    }
  }

  var blob = generatePdf(title, columns, parsedFields, saveLocal.value);
  sendToAdmin(blob, title);
}

</script>