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
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
        
        <Listbox as="div" v-model="selectedTeacher" class="block mt-6">
          <ListboxLabel class="block font-bold leading-6 text-gray-900">Преподаватель:</ListboxLabel>
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

        <div class="block mt-6">
          <span class="font-bold text-gray-900"> Период: </span>
          <vue-tailwind-datepicker :formatter="formatter" :shortcuts="false" v-model="dateValue" as-single use-range style="border-color: lightgrey;" class="mt-2"/>
        </div>

        <div class="block mt-6">          
          <label for="steps-range" class="font-bold text-gray-900">Занятий в группе за период:</label>
          <input id="steps-range" v-model="classesGroup" type="range" :min="minRangeVal" :max="maxRangeVal" step="1" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
          <div style="display: flex; justify-content: space-between" class="px-1">
             <!-- eslint-disable-next-line vue/require-v-for-key -->
            <span v-for="i in maxRangeVal + 1"> {{ i - 1}} </span>
          </div>
        </div>

        <div class="block mt-6">          
          <label for="steps-range" class="font-bold text-gray-900">Занятий индивидуально за период:</label>
          <input id="steps-range" v-model="classesIndividual" type="range" :min="minRangeVal" :max="maxRangeVal" step="1" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
          <div style="display: flex; justify-content: space-between" class="px-1">
             <!-- eslint-disable-next-line vue/require-v-for-key -->
            <span v-for="i in maxRangeVal + 1"> {{ i - 1}} </span>
          </div>
        </div>

        <div class="block mt-6">          
          <label for="steps-range" class="font-bold text-gray-900">Опозданий за период:</label>
          <input id="steps-range" v-model="classesSkipped" type="range" :min="minRangeVal" :max="maxRangeVal" step="1" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
          <div style="display: flex; justify-content: space-between" class="px-1">
             <!-- eslint-disable-next-line vue/require-v-for-key -->
            <span v-for="i in maxRangeVal + 1"> {{ i - 1}} </span>
          </div>
        </div>

        <div v-if="classesSkipped > 0" class="block mt-4"> 
          <!-- <label for="message" class="block mb-2font-bold text-gray-900">Комментарий по опозданиям</label> -->
          <textarea  @input="skipDescription = $event.target.value" rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Комментарий по опозданиям"></textarea>
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
            <label for="grades" class="block mb-2 text-sm font-bold text-gray-900">Оценки</label>
            <input :v-model="grades" type="text" id="grades" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Введите оценки через запятую">
        </div>

        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <div v-for="item in botomTextInputs" :key="item.id" class="block mt-6">
          <label :for="item" class="block mb-2 font-bold text-gray-900"> {{ item.title }}</label>
          <textarea @input="item.value = $event.target.value" :id="item.title" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" :placeholder="item.placeholder"></textarea>
        </div>
        
        <div class="mt-6 flex items-center justify-end gap-x-6">
          <!-- <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button> -->
          <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click.prevent="generatePDF">Сохранить</button>
        </div>

      </form>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import Router from '../router'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import '../assets/CustomFont.js'
import * as dayjs from 'dayjs'

const dateValue = ref([])
const classesGroup = ref("0")
const classesIndividual = ref("0")
const classesSkipped = ref("0")
const skipDescription = ref("")
const goalProgress = ref(false)
const grades = ref("")
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
    value: '',
    placeholder: "Нет",
  },
  {
    title: 'Предложения',
    value: '',
    placeholder: "Нет",
  },
  {
    title: 'Странности',
    value: '',
    placeholder: "Нет",
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
    id: 1,
    name: 'Ахмедова Э.К.',
    job: 'Школа 1580',
    goal: 'Успеваемость выше среднего, а дисциплина - среднего уровня',
  },
  {
    id: 2,
    name: 'Криворак А.В.',
    job: 'Бокс',
    goal: ' В 10 лет на открытых рингах, не менее 4 соревнований в год, в 16-17 лет КМС',
  },
  {
    id: 3,
    name: 'Бибикова Н.В.',
    job: 'Английский',
    goal: 'Через 22 месяца знают английский как русский',
  },
  {
    id: 4,
    name: 'Артемьева Н.О.',
    job: 'Диетолог',
    goal: 'Соответствие с нормами роста веса',
  },
  {
    id: 5,
    name: 'Алина',
    job: 'Ортопед',
    goal: '',
  },
  {
    id: 6,
    name: 'Мария',
    job: 'Логопед',
    goal: '',
  },
  {
    id: 7,
    name: 'Наталия',
    job: 'Педиатр',
    goal: '',
  },
  {
    id: 8,
    name: 'Юлия',
    job: 'Кинолог',
    goal: '',
  },
  {
    id: 9,
    name: 'Алексей',
    job: 'Плавание',
    goal: '',
  },
  {
    id: 10,
    name: 'Олеся',
    job: 'Гимнастика',
    goal: '',
  },
]

const selectedTeacher = ref(teachers[0])

const children = [
  {
    id: 0,
    name: 'Максим',
  },
  {
    id: 1,
    name: 'Вадим',
  },
  {
    id: 2,
    name: 'Вероника',
  },
  {
    id: 3,
    name: 'Дима',
  }
]

const selectedChild = ref(children[0])

function generatePDF() {

  const columns = [
    { title: "Поле", dataKey: "key" },
    { title: "Значение", dataKey: "value" }
  ];

  const startDate = dayjs(dateValue.value[0]).format('DD.MM.YYYY')
  const finishDate = dayjs(dateValue.value[1]).format('DD.MM.YYYY')
  const dateInterval = startDate + " - " + finishDate;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: "letter"
  });

  doc.setFont("CustomFont", "normal") 

  // text is placed using x, y coordinates
  const title = selectedChild.value.name + ", " + selectedTeacher.value.job + ", " + dateInterval;
  doc.setFontSize(16).text(title, 0.5, 1.0);
  // create a line under heading 
  doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
  // Using autoTable plugin

  let parsedFields = [
    {
      key: 'Преподаватель',
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
    key: 'Пропущено занятий',
    value: classesSkipped.value,
  })

  
  if (skipDescription.value != "") {
    parsedFields.push({
      key: 'Комментарий по пропускам',
      value: skipDescription.value
    })
  }

  doc.autoTable({
    columns,
    body: parsedFields,
    margin: { left: 0.5, top: 1.25 },
    styles: {
      font: 'CustomFont',
    }
  });

  // console.log(parsedFields)

  // Creating footer and saving file
  var blob = doc.output("blob");

  var chat_id = import.meta.env.VITE_TELEGRAM_ID; // replace with yours
  var token = import.meta.env.VITE_TELEGRAM_TOKEN; // from botfather

  var formData = new FormData();
  formData.append('chat_id', chat_id);
  formData.append('document', blob, title + '.pdf');

  var request = new XMLHttpRequest();
  request.open('POST', `https://api.telegram.org/bot${token}/sendDocument`);
  request.send(formData);

  console.log(request)

  // Router.go();
}

</script>