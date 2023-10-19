<!--<template>-->
<!--Inherited from parent-->
<!--</template>-->

<script>
import DataTableComponent from '../../datatable/components/DataTableComponent.vue'

const objectType = 'company'

export default {
  name: 'CompanyTable',
  extends: DataTableComponent,

  methods: {
    parentSetupColumnDefs: DataTableComponent.methods.setupColumnDefs,
    parentAvailableActions: DataTableComponent.methods.availableActionsArray,

    getObjectType() {
      return objectType
    },

    /**
     * Zakladna definicia slpcov
     *
     * @see https://datatables.net/reference/option/columns
     */
    setupColumns() {
      return [{ title: 'Id' }, { title: 'Parent' }, { title: 'Name' }]
    },

    setupServerSide() {
      return false
    },

    setupDataScr() {
      return ''
    },

    setupData() {
      return [
        [1, 'Test 1', 'Test 11'],
        [2, 'Test 2', 'Test 12'],
        [3, 'Test 3', 'Test 13'],
        [4, 'Test 4', 'Test 14'],
        [5, 'Test 5', 'Test 15'],
        [6, 'Test 6', 'Test 16'],
        [7, 'Test 7', 'Test 17']
      ]
    }
  }
}
</script>

<style scoped></style>
