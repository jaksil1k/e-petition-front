<template>
<main class="admin-page">
  <div class="admin-container">
<!--    <nav class="admin-filters">-->
<!--      <div class="">-->

<!--      </div>-->
<!--    </nav>-->
<!--    <article class="admin-table">-->
<!--      <DataTableComponent :items="items"/>-->
<!--      {{items}}-->
      <el-table :data="items" height="100%" style="width: 100%"
      :row-class-name="tableRowClassName">
        <el-table-column prop="id" label="ID" width="250"/>
        <el-table-column prop="title" label="Title" width="180" />
        <el-table-column
            prop="status"
            label="Status"
            width="180"
            :filters="[
              { text: 'DRAFT', value: 'DRAFT' },
              { text: 'ON_REVIEW', value: 'ON_REVIEW' },
              { text: 'PUBLISH', value: 'PUBLISH'},
              { text: 'ACCEPT', value: 'ACCEPT'},
              { text: 'ON_FINAL_REVIEW', value: 'ON_FINAL_REVIEW'},
              { text: 'DISAPPROVED', value: 'DISAPPROVED' },
              { text: 'REJECTED', value: 'REJECTED'},
            ]"
            :filter-method="filterTag"
        />
        <el-table-column prop="createdAt" sortable label="Created At" />
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="showPetition(scope.row.id)">Show</el-button>
            <el-button link type="primary" size="small" @click="dialogVisible = true; currentPetition = scope.row.id"
                       v-if="scope.row.status === 'ON_REVIEW' || scope.row.status === 'PUBLISH'
                       || scope.row.status === 'ON_FINAL_REVIEW'">
              Review
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    <el-dialog
        v-model="dialogVisible"
        title="Approve"
        width="500"
        :before-close="handleClose"
    >
      <span>Do you approve or disapprove?</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="reject">Reject</el-button>
          <el-button type="primary" @click="accept">
            Accept
          </el-button>
        </div>
      </template>
    </el-dialog>
<!--    </article>-->
  </div>
</main>
</template>

<script>

import axios from "axios";
import DataTableComponent from "@/components/DataTableComponent";

export default {
  components: {DataTableComponent},
  data() {
    return {
      items: [],
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
      dialogVisible: false,
      currentPetition: null,
    }
  },
  async mounted() {
    this.items = (await axios.get("/admin/petition")).data;
  },
  methods: {
    tableRowClassName(row, rowIndex) {
      // console.log(row.row.status) ;
        if (row.row.status === "DRAFT") {
          return 'draft-row';
        } else if (row.row.status === 'ON_REVIEW' || row.row.status === 'ON_FINAL_REVIEW') {
          return 'warning-row';
        } else if (row.row.status === 'ACCEPT') {
          return 'success-row';
        } else if (row.row.status === 'PUBLISH') {
          return 'publish-row';
        } else if (row.row.status === 'DISAPPROVED' || row.row.status === 'REJECTED') {
          return 'error-row';
        }
        return '';
    },
    filterTag(value, row) {
      // console.log(row.)
      return row.status === value
    },
    handleClick(index, row) {
      console.log(index);
      console.log(row.status);
    },
    showPetition(id) {
      this.$router.push({name: 'petition_view', params: {id: id}});
    },
    handleClose() {
      this.dialogVisible = false;
    },
    accept() {
      // console.log(this.currentPetition);
      axios.post("/admin/petition/process?petition_id=" + this.currentPetition);
      this.dialogVisible = false;
      location.reload();
    },
    reject() {
      axios.post("/admin/petition/reject?petition_id=" + this.currentPetition);
      this.dialogVisible = false;
      location.reload();
    }
  },


}
</script>

<style>
.admin-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}
.admin-container {
  width: 70%;
  height: 70%;
  /*border: 2px solid rgba(0, 110, 255, 0.6);*/
  border: 2px solid rgba(0, 0, 0, 0.3);

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 3rem;

}
.admin-filters {
  margin: 2rem 0;
  border: 2px solid rgba(0, 110, 255, 0.6);
  height: 30%;
  width: 100%;
}
.admin-table {
  margin-bottom: 2rem;
  border: 2px solid rgba(0, 110, 255, 0.6);
  height: 70%;
  width: 100%;
  display: flex;
  /*flex-direction: column;*/
  justify-content: center;
}

.warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-7);
  /*background-color: #006EFF;*/
}
.success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-7);
}

.publish-row {
  --el-table-tr-bg-color: var(--el-color-primary-light-7);
}
.error-row {
  --el-table-tr-bg-color: var(--el-color-error-light-7);
}

.draft-row {
  --el-table-tr-bg-color: var(--el-color-info-light-7);
}
.el-table__cell {
  border-bottom: 2px solid rgba(0, 110, 255, 0.6);
}
</style>