<template>
  <table class="table">
    <tr class="table-head">
      <th class="table-head__item">ID</th>
      <th class="table-head__item">Title</th>
      <th class="table-head__item">Status</th>
      <th class="table-head__item">CreatedAt</th>
    </tr>
    <tr class="table-row" v-for="item in items" :key="item.id">
      <td class="table-row__item">{{item.id}}</td>
      <td class="table-row__item">{{item.title}}</td>
      <td class="table-row__item">{{item.status}}</td>
      <td class="table-row__item">{{item.createdAt}}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "DataTableComponent",
  props: ['items'],
}
</script>
<style scoped>

.table {
  /*width: 100%;*/
  border-collapse: collapse;
}
.table-head {

  /*box-shadow: 0 0 1px rgba(0, 110, 255, 1);*/


  border-bottom: 2px solid rgb(0, 110, 255, 0.6);
}
.table-head__item {
  padding: 0 1rem;
}
.table-row__item {
  padding: 0 1rem;
}

</style>
