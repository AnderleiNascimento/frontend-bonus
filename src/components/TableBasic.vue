<template>
  <b-row v-if="columns.some((column) => column.filterOptions) || $slots.filters">
    <Filter>
      <template #fields>
        <template v-if="$slots.filters">
          <slot name="filters" />
        </template>
        <template v-else>
          <template v-for="(column, index) in columns" :key="index">
            <b-col md="4" v-if="column.filterOptions">
              <InputTextGroup
                v-if="column.filterOptions.type === 'text'"
                :label="column.label"
                :name="`filter_${column.field}`"
                :placeholder="column.filterOptions.placeholder"
                v-model="filters[column.filterOptions.by ?? column.field]"
                :mask="column.filterOptions.mask"
              />
            </b-col>
          </template>
        </template>
        <b-col sm="12" class="text-end">
          <b-button type="button" variant="secondary" @click="handleClickReset">
            <i class="fas fa-eraser" />
            Limpar
          </b-button>
          {{ " " }}
          <b-button type="button" variant="success" @click="handleClickFiltered">
            <i class="fas fa-filter" />
            Filtrar
          </b-button>
        </b-col>
      </template>
    </Filter>
  </b-row>
  
  <b-row class="justify-content-center">
    <b-col cols="12">
      <b-card no-body>
        <slot name="body"></slot>
        <b-card-header v-if="title">
          <b-row class="align-items-center">
            <b-col>
              <b-card-title>{{ title }}</b-card-title>
            </b-col>
          </b-row>
        </b-card-header>
        <b-card-body class="pt-0">
          <b-row v-if="routeAdd && canAdd" class="text-end mb-2">
            <b-col>
              <b-button type="button" variant="primary" @click="router.push(routeAdd)">
                <i class="fas fa-plus" />
                Adicionar
              </b-button>
            </b-col>
          </b-row>
          <div v-if="spinner.getShow" class="d-flex justify-content-center">
            <Spinner  />
          </div>
          <b-table-simple responsive :bordered="bordered" class="mb-0 table-centered">
            <b-thead :class="{ 'table-light': !bordered }">
              <b-tr>
                <b-th v-for="(column, index) in columns" :key="index" v-show="!column.hidden">
                  {{ column.label }}
                </b-th>
                <b-th v-if="hasAction || $slots.actions"></b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="(row, index) in rows" :key="index">
                <b-td v-for="(column, index) in columns" :key="index" v-show="!column.hidden" :data-th="column.label">
                  <template v-if="column.formatFn">
                    {{ column.formatFn(row[column.field], row) ?? '-' }}
                  </template>
                  <template v-else>
                    <slot :name="`field-${column.field.replace(/[_\.]/g, '-')}`" :row="row" />
                    <template v-if="!$slots[`field-${column.field.replace(/[_\.]/g, '-')}`]">
                      {{ formatData.getValueColumnTable(row, column) }}
                    </template>
                  </template>
                </b-td>
                <b-td v-if="hasAction || $slots.actions" class="text-end">
                  <template v-if="$slots.actions">
                    <slot name="actions" :row="row" />
                  </template>
                  <template v-else>
                    <template v-if="isDropdownActions">
                      <b-dropdown
                        :variant="null"
                        class="d-inline-block"
                        menu-class="dropdown-menu-end"
                        toggle-class="p-0 m-0"
                      >
                        <template #button-content>
                          <i class="las la-ellipsis-v fs-20 text-muted"></i>
                        </template>
                        <b-dropdown-item v-if="canEdit" @click="router.push(`${routeEdit}/${row.id}`)">
                            Editar
                        </b-dropdown-item>
                        <b-dropdown-item v-if="canRemove" @click="handleRemove(row.id)">
                          Remover
                        </b-dropdown-item>
                      </b-dropdown>
                    </template>
                    <template v-else>
                      <router-link v-if="canEdit" :to="`${routeEdit}/${row.id}`">
                        <i class="las la-pen text-secondary fs-18" />
                      </router-link>
                      <i v-if="canRemove" class="las la-trash-alt text-secondary fs-18 cursor-pointer" @click="handleRemove(row.id)" /> 
                    </template>
                  </template>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>

          <b-row v-if="hasPagination" class="d-flex justify-content-between align-items-center mt-3">
            <b-col class="text-left">
              {{ (currentPage - 1) * pagination.getPerPage + 1 }}-{{ Math.min(currentPage * pagination.getPerPage, pagination.getTotalRows) }} de {{ pagination.getTotalRows }} itens
            </b-col>
            <b-col class="text-sm-center">
              <b-pagination
                v-model="currentPage"
                :total-rows="pagination.getTotalRows"
                :per-page="pagination.getPerPage"
                prev-text="Anterior"
                next-text="Próximo"
                class="justify-content-end mt-3"
              />
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script setup>
import { onMounted, ref, watch } from "vue"
import { useFormatData } from "@/composables/useFormatData"
import Filter from "@/components/Filter.vue"
import InputTextGroup from "@/components/InputTextGroup.vue"
import Spinner from "@/components/Spinner.vue"
import { useRouter } from 'vue-router'
import { usePaginationStore } from '@/stores/pagination'
import { useSpinnerStore } from '@/stores/spinner'

const formatData = useFormatData()
const pagination = usePaginationStore()
const spinner = useSpinnerStore()
const currentPage = ref(pagination.getCurrentPage)
const router = useRouter()

const props = defineProps({
  name: { type: String, default: 'datatable' },
  title: { type: String },
  columns: { type: Array, required: true },
  rows: { type: Array, required: true },
  filters: { type: Object },
  store: { type: Object },
  hasAction: { type: Boolean, default: false },
  routeAdd: { type: [Object, String] },
  routeEdit: { type: [Object, String] },
  isDropdownActions: { type: Boolean, default: false },
  hasPagination: { type: Boolean, default: true },
  canRemove: { type: Boolean, default: true },
  canEdit: { type: Boolean, default: true },
  canAdd: { type: Boolean, default: true },
  bordered: { type: Boolean, default: false },
  responsive: { type: String },
})

const filters = ref(props.filters ?? {})

function handleClickReset() {
  clearFieldFilters()
}

async function handleClickFiltered() {
  const cleaned = Object.fromEntries(
    Object.entries(filters.value).filter(([_, value]) => value !== null)
  )
  await props.store.get(cleaned)
}

async function clearFieldFilters() {
  const hasActiveFilters = Object.values(filters.value).some(
    (val) => val !== null && val !== '' && val !== false
  )
  if (!hasActiveFilters) return
  for (const key in filters.value) {
    filters.value[key] = null
  }
  await props.store.get()
}

watch(currentPage, async (newPage) => {
  await props.store.get({
    page: newPage,
    limit: pagination.getPerPage
  })
})

async function handleRemove(id) {
  await props.store.remove(id)
}

onMounted(() => {
  pagination.setCurrentPage(1)
})
</script>
