<template>
  <div class="card" ref="root">
    <div class="card-body">
      <DataTable
        :columns="d_columns"
        :data="d_data"
        :options="d_options"
        ref="table"
        width="100%"
        class="table hover stripe order-column"
      >
      </DataTable>
    </div>
    <!--</div>-->
  </div>
</template>

<script>
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-select-bs5'
import 'datatables.net-buttons-bs5'
import 'datatables.net-fixedcolumns-bs5'
import 'datatables.net-colreorder-bs5'
import languageEN from 'datatables.net-plugins/i18n/en-GB.mjs'
import languageSK from 'datatables.net-plugins/i18n/sk.mjs'
// NOTE: tento plugin sposobuje ze vsetky predchadajuce extensions prestanu fungovat!!
//FIXME
import 'datatables.net-plugins/features/conditionalPaging/dataTables.conditionalPaging.mjs'

DataTable.use(DataTablesCore)
var dt = null

export default {
  name: 'DataTableTestComponent',
  components: { DataTable },

  mounted() {
    // Ziskanie referenice na Datatable API
    dt = this.$refs.table.dt
    this.d_dt = this.$refs.table.dt

    dt.on('draw', () => {
      this.onDraw()
    })
  },

  created() {},

  methods: {
    /**
     * Nastavenie rozlozenia layoutu tabulky
     *
     * @see https://datatables.net/reference/option/dom
     */
    setupDom() {
      return (
        '<"row top-section"<"col-sm-12 col-md-5"l><"col-sm-12 col-md-7"Bf>>' +
        '<"row"<"col-sm-12"tr>>' +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>"
      )
    },

    setupColumns() {
      return [{ title: 'Id' }, { title: 'Name' }]
    },

    setupData() {
      return [
        [1, 'Test 1'],
        [2, 'Test 2'],
        [3, 'Test 3'],
        [4, 'Test 4'],
        [5, 'Test 5'],
        [6, 'Test 6'],
        [7, 'Test 7']
      ]
    },

    setupDataScr() {
      // server-side ocakava "data", non server-side sa mozne nastavit na "''" aby sa nemuseli data wrapovat do "data" fieldu
      return ''
    },

    setupServerSide() {
      return false
    },

    setupProcessing() {
      return false
    },

    setupSearching() {
      return true
    },

    setupScrollX() {
      return true
    },

    setupLengthMenu() {
      return [5, 10, 15, 20, 25, 50]
    },

    setupSelectStyle() {
      return 'os'
    },

    setupSelectSelector() {
      // Ignoruje posledne 2 stlpce v tabulke na select
      return 'td:not(:nth-last-child(-n+' + 2 + '))'
    },

    setupColumnDefs() {
      const defs = []

      return defs
    },

    setupButtons() {
      return [
        {
          text: 'Select all',
          action: function (e, dt, node, config) {
            dt.rows().select()
          }
        },

        {
          text: 'Select none',
          action: function () {
            dt.rows().deselect()
          }
        }
      ]
    },

    /**
     * Jazykova konfiguracia
     *
     * @see https://datatables.net/examples/advanced_init/language_file.html
     * @see https://datatables.net/examples/basic_init/language.html
     */
    setupLanguage() {
      return languageEN
    },

    onDraw() {
      console.log('draw callback')
      // this.setPaginationElementVisibility()
    },

    onInitComplete() {
      console.log('init complete callback')
    },

    renderEditButton(data, type, row, meta) {
      let editUrl = this.d_editUrl + '/' + row.id
      return (
        '<a href="' +
        editUrl +
        '" class="btn btn-ghost-secondary btn-icon" aria-label="Button">' +
        '<i class="icon ti ti-edit"></i>' +
        '</a>'
      )
    },

    renderDeleteButton(data, type, row, meta) {
      let deletePostUrl = this.d_deleteUrl + '/' + row.id
      return (
        '<a class="btn btn-ghost-danger btn-icon btn-datatable-delete" aria-label="Button">' +
        '<i class="icon ti ti-trash"></i>' +
        '</a>'
      )
    }

    /**
     * Pomocna metoda ktora schova pagonation element pokial je pocet zaznamov mensi ako nastavena dlzka zobrazovanych elementov,
     * podobne ako oficialny plugin ktory ale sposobuje nefunkcnost inych extensios
     * @see https://github.com/DataTables/Plugins/blob/master/features/conditionalPaging/dataTables.conditionalPaging.js
     */
    //   setPaginationElementVisibility() {
    //     const elements = document.getElementsByClassName('dataTables_paginate')
    //     let paginateElement = null
    //     if (elements) {
    //       paginateElement = elements[0]
    //     }

    //     if (paginateElement) {
    //       const info = this.d_dt.page.info()
    //       const pageCount = Math.ceil(info.recordsDisplay / info.length)

    //       if (pageCount > 1) {
    //         paginateElement.style.display = 'block'
    //       } else {
    //         paginateElement.style.display = 'none'
    //       }
    //     }
    //   }
  },

  props: {
    dataUrl: {
      type: String,
      default: ''
    },
    dataSrc: {
      type: String,
      default: '' // root element in json, by default in datatables is "data"
    },
    editUrl: {
      type: String,
      default: ''
    },
    deleteUrl: {
      type: String,
      default: ''
    },
    showIdColumn: {
      type: String,
      default: ''
    },

    isSuperAdmin: {
      type: String,
      default: ''
    },

    availableActions: {
      default: '{}'
    }
  },

  data: function () {
    return {
      d_dt: null,
      d_dataUrl: this.dataUrl,
      d_dataSrc: this.src,
      d_editUrl: this.editUrl,
      d_deleteUrl: this.deleteUrl,
      d_columns: this.setupColumns(),
      d_data: this.setupData(),
      d_options: {
        dom: this.setupDom(),
        language: this.setupLanguage(),
        serverSide: this.setupServerSide(),
        processing: this.setupProcessing(),
        conditionalPaging: true, // from datatables plugins
        lengthMenu: this.setupLengthMenu(),
        pagingType: 'numbers',
        scrollX: this.setupScrollX(),
        colReorder: true,
        select: true,
        searching: this.setupSearching(),
        columnDefs: this.setupColumnDefs(),
        buttons: this.setupButtons(),
        // Fixed Columns start
        fixedColumns: true,
        scrollCollapse: true,
        scrollY: 300
        // Fixed Columns end
      }
    }
  }
}
</script>

<style>
@import 'datatables.net-dt';
</style>
