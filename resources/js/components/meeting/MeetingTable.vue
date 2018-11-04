<template>
    <el-table
            v-loading="listLoading"
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
        <el-table-column label="Lieu" width="150px">
            <template slot-scope="scope">
                <span>{{ scope.row.place}}</span>
            </template>
        </el-table-column>
        <el-table-column label="Sujet" width="200px" align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.subject }}</span>
            </template>
        </el-table-column>
        <el-table-column label="Synthèse" min-width="110px" align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.synthesis }}</span>
            </template>
        </el-table-column>
        <el-table-column label="Date de début" width="150px" align="center">
            <template slot-scope="scope">
                <span v-if="scope.row.began_at">{{ scope.row.began_at | parseDateTime }}</span>
            </template>
        </el-table-column>
        <el-table-column label="Date de clôture" width="150px" align="center">
            <template slot-scope="scope">
                <span v-if="scope.row.finished_at">{{ scope.row.finished_at | parseDateTime }}</span>
            </template>
        </el-table-column>

        <el-table-column label="Actions" align="center" width="280" class-name="small-padding fixed-width">
            <template slot-scope="scope">
                <el-button type="primary" @click="updateMeeting(scope.row)">Modifier</el-button>
                <el-button type="danger" @click="deleteMeeting(scope.row)">Supprimer</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import { parseTime } from './../../utils';
    import * as types from './../../store/mutation-types';

    export default {
        name: "MeetingTable",
        data() {
            return {
                listLoading: true,
            }
        },
        mounted() {
            this.loadMeetings();
        },
        filters: {
            parseDateTime(status) {
                return parseTime(status, '{y}-{m}-{d} {h}:{i}');
            }
        },
        methods: {
            sortChange() {
                this.$emit('sortChange');
            },
            updateMeeting(meeting) {
                this.$emit('openUpdate', meeting);
            },
            deleteMeeting(meeting) {
                this.$store.dispatch(types.DELETE_MEETING, meeting).then(
                    (res) => {
                        this.$notify({
                            title: 'Success!',
                            message: 'Entretien bien supprimé!',
                            type: 'success',
                            duration: 2000
                        })
                    }
                );
            },
            loadMeetings() {
                this.$store.dispatch(types.LOAD_MEETING_LIST).then(
                    (res) => this.listLoading = false
                );
            }
        },
        computed: {
            list() {
                return this.$store.state.meeting.meetingsList;
            }
        }
    }
</script>

<style scoped>

</style>
