<template>
    <el-table
            v-loading="listLoading"
            key="id"
            :data="list"
            border
            fit
            highlight-current-row
            style="width: 100%;"
            @sort-change="sortChange">
        <el-table-column label="ID" prop="id" sortable="custom" align="center" width="65">
            <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
            </template>
        </el-table-column>
        <el-table-column label="Nom" width="150px" align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.last_name }}</span>
            </template>
        </el-table-column>
        <el-table-column label="Prénom" width="150px" align="center">
            <template slot-scope="scope">
                <span class="link-type">{{ scope.row.first_name }}</span>
            </template>
        </el-table-column>
        <el-table-column label="Email" width="220px" align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.email }}</span>
            </template>
        </el-table-column>
        <el-table-column label="Position" width="220px" align="center">
            <template slot-scope="scope">
                <span style="color:red;">{{ scope.row.position }}</span>
            </template>
        </el-table-column>

        <el-table-column label="Actions" align="center" min-width="230" class-name="small-padding fixed-width">
            <template slot-scope="scope">
                <el-button type="primary" @click="updateMember(scope.row)">Modifier</el-button>
                <el-button type="danger" @click="deleteMember(scope.row)">Supprimer</el-button>
            </template>
        </el-table-column>
    </el-table>

</template>

<script>

  import * as types from './../../store/mutation-types';

  export default {
    name: 'MembersTable',
      data() {
        return {
            listLoading: true,
        }
      },
    mounted() {
        this.loadMembers();
      },
    methods: {
      sortChange() {
        this.$emit('sortChange');
      },
      updateMember(member) {
            this.$emit('openUpdate', member);
      },
      deleteMember(member) {
          this.$store.dispatch(types.DELETE_MEMBER, member).then(
              (res) => {
                  this.$notify({
                      title: 'Success!',
                      message: 'Membre bien supprimé!',
                      type: 'success',
                      duration: 2000
                  })
              }
          );
      },
        loadMembers() {
          this.$store.dispatch(types.LOAD_MEMBER_LIST).then(
              (res) => this.listLoading = false
          );
        }
    },
      computed: {
        list() {
            return this.$store.state.member.membersList;
        }
      }
  }
</script>

<style scoped>

</style>
