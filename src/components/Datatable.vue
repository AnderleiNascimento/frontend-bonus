<template>
    <b-row class="justify-content-center">
        <b-col cols="12">
          <b-card no-body>
            <b-card-header>
              <b-row class="align-items-center">
                <b-col>
                  <b-card-title>{{ title }}</b-card-title>
                </b-col>
              </b-row>
            </b-card-header>
            <b-card-body class="pt-0">
              <div class="table-responsive m-0">
                <table class="table datatable" :id="tableId">
                  <thead class="table-light">
                    <tr>
                        <th
                            v-for="(column, index) in columns"
                            :key="index"
                            v-show="!column.hidden"
                        >
                            {{ column.label }}
                        </th>            
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, index) in rows" :key="index">
                        <td
                          v-for="(column, index) in columns"
                          :key="index"
                          v-show="!column.hidden"
                          :data-th="column.label"
                        >
                          <template v-if="column.formatFn">
                            {{ column.formatFn(row[column.field], row) ?? '-' }}
                          </template>
                          <template v-else>
                            <slot :name="`field-${column.field.replace(/[_\.]/g, '-')}`" :row="row" />
                            <template v-if="!$slots[`field-${column.field.replace(/[_\.]/g, '-')}`]">
                              {{ formatData.getValueColumnTable(row, column) }}
                            </template>
                          </template>
                        </td>
                        <!-- <td>
                          <div class="flex justify-end items-center">
                            <template v-if="$slots.actions">
                              <slot name="actions" :row="row" />
                            </template>
                          </div>
                        </td> -->
                    </tr>
                  </tbody>
                </table>
  
                <div v-if="$slots.export" class="d-flex flex-wrap gap-2 mt-2">
                  <slot name="export" />
                </div>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
    </b-row>
</template>

<script setup>
import { watch, ref, nextTick } from "vue";

import {
  DataTable
} from "simple-datatables";

import { useFormatData } from "@/composables/useFormatData"

const formatData = useFormatData()

const props = defineProps({
  name: {
    type: String,
    default: 'datatable'
  },
  title: {
    type: String,
    default: 'Datatable'
  },
  columns: {
    type: Array,
    required: true
  },
  rows: {
    type: Array,
    required: true
  },
})

const tableId = ref(props.name);
let dataTableInstance = null;

watch(
  () => [props.rows, props.columns],
  async ([newRows, newColumns]) => {
    if (newRows.length > 0 && newColumns.length > 0) {
      await nextTick();

      if (dataTableInstance) {
        dataTableInstance.destroy();
      }

      dataTableInstance = new DataTable(`#${tableId.value}`);
    }
  },
  { immediate: true }
);
</script>