<template>
  <main>
    <div class="mx-auto max-w-lg max-w-7xl py-6 sm:px-6 lg:px-8 p-5">
        <!-- Your content -->
      <form>

        <Listbox as="div" v-model="selectedChild">
          <ListboxLabel class="block font-bold leading-6 text-gray-900">Животное:</ListboxLabel>
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

        <div class="block mt-6">          
          <label for="steps-range1" class="font-bold text-gray-900">Занятий в группе за период:</label>
          <input id="steps-range1" v-model="classesGroup" type="range" :min="minRangeVal" :max="maxRangeVal" step="1" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
          <div style="display: flex; justify-content: space-between" class="px-1">
             <!-- eslint-disable-next-line vue/require-v-for-key -->
            <span v-for="i in maxRangeVal + 1"> {{ i - 1}} </span>
          </div>
        </div>

        <div class="block mt-6">          
          <label for="steps-range2" class="font-bold text-gray-900">Занятий индивидуально за период:</label>
          <input id="steps-range2" v-model="classesIndividual" type="range" :min="minRangeVal" :max="maxRangeVal" step="1" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
          <div style="display: flex; justify-content: space-between" class="px-1">
             <!-- eslint-disable-next-line vue/require-v-for-key -->
            <span v-for="i in maxRangeVal + 1"> {{ i - 1}} </span>
          </div>
        </div>

        <div class="block mt-6">          
          <label for="steps-range3" class="font-bold text-gray-900">Опозданий за период:</label>
          <input id="steps-range3" v-model="classesLate" type="range" :min="minRangeVal" :max="maxRangeVal" step="1" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
          <div style="display: flex; justify-content: space-between" class="px-1">
             <!-- eslint-disable-next-line vue/require-v-for-key -->
            <span v-for="i in maxRangeVal + 1"> {{ i - 1}} </span>
          </div>
        </div>

        <div v-if="parseInt(classesLate) > 0" class="block mt-6"> 
          <!-- <label for="message" class="block mb-2font-bold text-gray-900">Комментарий по опозданиям</label> -->
          <textarea  @input="lateDescription = ($event.target as HTMLInputElement).value" rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Комментарий по опозданиям"></textarea>
        </div>

        <div class="block mt-6">          
          <label for="steps-range4" class="font-bold text-gray-900">Пропусков за период:</label>
          <input id="steps-range4" v-model="classesSkipped" type="range" :min="minRangeVal" :max="maxRangeVal" step="1" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
          <div style="display: flex; justify-content: space-between" class="px-1">
             <!-- eslint-disable-next-line vue/require-v-for-key -->
            <span v-for="i in maxRangeVal + 1"> {{ i - 1}} </span>
          </div>
        </div>

        <div v-if="parseInt(classesSkipped) > 0" class="block mt-6"> 
          <!-- <label for="message" class="block mb-2font-bold text-gray-900">Комментарий по опозданиям</label> -->
          <textarea  @input="skipDescription = ($event.target as HTMLInputElement).value" rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Комментарий по пропускам"></textarea>
        </div>

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

        <div class="block mt-6">
            <label for="gradesinput" class="block mb-2 text-sm font-bold text-gray-900">Оценки</label>
            <input v-model="grades" type="text" id="gradesinput" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Введите оценки через запятую">
        </div>

        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <div v-for="item in botomTextInputs" :key="item.title" class="block mt-6">
          <label :for="item.title" class="block mb-2 font-bold text-gray-900"> {{ item.title }}</label>
          <textarea @input="item.value = ($event.target as HTMLInputElement).value" :id="item.title" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" :placeholder="item.placeholder"></textarea>
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
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import dayjs from 'dayjs'
// @ts-ignore
import VueTailwindDatepicker from 'vue-tailwind-datepicker'

// @ts-ignore
import { generatePdf } from '../utils/pdf-generator.js'
// @ts-ignore
import { sendToAdmin } from '../utils/telegram-sender.js'

const dateValue = ref([])
const classesGroup = ref("0")
const classesIndividual = ref("0")
const classesSkipped = ref("0")
const skipDescription = ref("")
const classesLate = ref("0")
const lateDescription = ref("")
const goalProgress = ref(false)
const grades = ref("")
const saveLocal = ref(true)
const botomTextInputs = ref([
  {
    title: 'Прошлое достижение',
    value: '',
    placeholder: "Пожалуйста, дайте развернутый ответ",
  },
  {
    title: 'Следующее достижение',
    value: '',
    placeholder: "Пожалуйста, дайте развернутый ответ",
  },
  {
    title: 'Замечания',
    value: 'Нет',
    placeholder: "Пожалуйста, дайте развернутый ответ",
  },
  {
    title: 'Предложения',
    value: 'Нет',
    placeholder: "Пожалуйста, дайте развернутый ответ",
  },
  {
    title: 'Странности',
    value: 'Нет',
    placeholder: "Пожалуйста, дайте развернутый ответ",
  },
])

const minRangeVal = 0
const maxRangeVal = 5

const formatter = ref({
  date: 'DD MMM YYYY',
  month: 'MMM'
})

const teachers = [
  {
    id: 0,
    name: 'Мельянцова Ю.А.',
    job: 'Кинолог',
    goal: 'Животные',
  },
]

const selectedTeacher = ref(teachers[0])

const children = [
  {
    id: 0,
    name: 'Эрик',
  }
]

const selectedChild = ref(children[0])

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
      key: 'Предмет',
      value: selectedTeacher.value.job,
    },
    {
      key: 'Групповых занятий',
      value: classesGroup.value,
    },
    {
      key: 'Индивидуальных занятий',
      value: classesIndividual.value,
    },
    {
      key: 'Цель',
      value: selectedTeacher.value.goal,
    },
    {
      key: 'Движемся к цели?',
      value: (goalProgress.value ? "Да" : "Нет"),
    },
    {
      key: 'Оценки за период',
      value: grades.value,
    }
  ]

  botomTextInputs.value.forEach(item => {
    parsedFields.push({
      key: item.title,
      value: item.value
    })
  });

  parsedFields.push({
    key: 'Опозданий за период',
    value: classesLate.value,
  })
  
  if (lateDescription.value != "") {
    parsedFields.push({
      key: 'Комментарий по опозданиям',
      value: lateDescription.value
    })
  }

  parsedFields.push({
    key: 'Пропусков за период',
    value: classesSkipped.value,
  })
  
  if (skipDescription.value != "") {
    parsedFields.push({
      key: 'Комментарий по пропускам',
      value: skipDescription.value
    })
  }

  var blob = generatePdf(title, columns, parsedFields, saveLocal.value);
  sendToAdmin(blob, title);
}

</script>