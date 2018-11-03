<template>
    <el-table
            v-loading="listLoading"
            :key="tableKey"
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
                <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
        </el-table-column>
        <el-table-column label="Lieu" min-width="150px">
            <template slot-scope="scope">
                <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.title }}</span>
                <el-tag>{{ scope.row.type | typeFilter }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="Sujet" width="110px" align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.author }}</span>
            </template>
        </el-table-column>
        <el-table-column label="Synthèse" width="110px" align="center">
            <template slot-scope="scope">
                <span style="color:red;">{{ scope.row.reviewer }}</span>
            </template>
        </el-table-column>
        <el-table-column label="Date de début" width="110px" align="center">
            <template slot-scope="scope">
                <span style="color:red;">{{ scope.row.reviewer }}</span>
            </template>
        </el-table-column>
        <el-table-column label="Date de clôture" width="110px" align="center">
            <template slot-scope="scope">
                <span style="color:red;">{{ scope.row.reviewer }}</span>
            </template>
        </el-table-column>

        <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
            <template slot-scope="scope">
                <el-button type="primary" @click="updateMeeting(scope.row)">Modifier</el-button>
                <el-button type="danger" @click="deleteMeeting(scope.row)">Supprimer</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: "MeetingTable",
        props: ['listLoading', 'tableKey', 'list'],
        methods: {
            sortChange() {
                this.$emit('sortChange');
            },
            updateMeeting(meeting) {

            },
            deleteMeeting(meeting) {

            }
        }
    }
</script>

<style scoped>

</style>
