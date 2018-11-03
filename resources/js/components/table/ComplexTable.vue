<template>
    <div class="app-container">
        <div class="filter-container">

            <template v-if="type === 'member'">
                <el-input placeholder="Email" v-model="listQuery.email" style="width: 200px;" class="filter-item" @keyup.enter.native=""/>
                <el-input placeholder="Nom" v-model="listQuery.last_name" style="width: 200px;" class="filter-item" @keyup.enter.native=""/>
                <el-input placeholder="Position" v-model="listQuery.position" style="width: 200px;" class="filter-item" @keyup.enter.native=""/>
            </template>
            <template v-if="type === 'meeting'">
                <el-input placeholder="Lieu" v-model="listQuery.email" style="width: 200px;" class="filter-item" @keyup.enter.native=""/>
                <el-input placeholder="Sujet" v-model="listQuery.last_name" style="width: 200px;" class="filter-item" @keyup.enter.native=""/>
            </template>

            <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="">
                <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>
            </el-select>

            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="">Chercher</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">Ajouter</el-button>
            <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="">Exporter</el-button>
        </div>
        <template v-if="type === 'meeting'">
            <br><br>
            <MeetingsTable :listLoading="listLoading" :tableKey="tableKey" :list="list" @sort-change="sortChange"></MeetingsTable>
        </template>

        <template v-if="type === 'member'">
            <br><br>
            <members-table @openUpdate="(member) => updateMember(member)"></members-table>
        </template>

      <!--  <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->

        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogMeetingFormVisible">

        </el-dialog>

        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogMemberFormVisible">
            <MemberForm :dialogStatus="dialogStatus" :member="member" @close="dialogMemberFormVisible=false"></MemberForm>
        </el-dialog>
    </div>
</template>

<script>
    import { fetchList, fetchPv, createArticle, updateArticle } from './../../store/api/article';
    import waves from './../directives/waves'; // Waves directive
    import Pagination from './../Pagination';
    import MeetingsTable from './../meeting/MeetingTable';
    import MemberForm from './../member/MemberForm';
    import MembersTable from "../member/MembersTable"; // Secondary package based on el-pagination
    import * as types from './../../store/mutation-types';

    const calendarTypeOptions = [
        { key: 'CN', display_name: 'China' },
        { key: 'US', display_name: 'USA' },
        { key: 'JP', display_name: 'Japan' },
        { key: 'EU', display_name: 'Eurozone' }
    ];

    // arr to obj ,such as { CN : "China", US : "USA" }
    const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
        acc[cur.key] = cur.display_name;
        return acc
    }, {});

    export default {
        name: 'ComplexTable',
        props: ['type'],
        components: {MembersTable, MemberForm, MeetingsTable, Pagination },
        directives: { waves },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    published: 'success',
                    draft: 'info',
                    deleted: 'danger'
                };
                return statusMap[status]
            },
            typeFilter(type) {
                return calendarTypeKeyValue[type]
            }
        },
        data() {
            return {
                tableKey: 0,
                list: null,
                total: 0,
                listLoading: true,
                listQuery: {
                    page: 1,
                    limit: 20,
                    email: undefined,
                    last_name: undefined,
                    position: undefined,
                    sort: '+id'
                },
                importanceOptions: [1, 2, 3],
                calendarTypeOptions,
                sortOptions: [{ label: 'ID Ascendant', key: '+id' }, { label: 'ID Descendant', key: '-id' }],
                statusOptions: ['published', 'draft', 'deleted'],
                showReviewer: false,
                member: {
                    email: '',
                    first_name: '',
                    last_name: '',
                    phone: '',
                    position: ''
                },
                dialogFormVisible: false,
                dialogMemberFormVisible: false,
                dialogMeetingFormVisible: false,
                dialogStatus: '',
                textMap: {
                    update: 'Modifier',
                    create: 'Créer'
                },
                dialogPvVisible: false,
                pvData: [],
                rules: {
                    type: [{ required: true, message: 'type is required', trigger: 'change' }],
                    timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
                    title: [{ required: true, message: 'title is required', trigger: 'blur' }]
                },
                downloadLoading: false
            }
        },
        created() {
        },
        methods: {
            resetMemberTemp() {
                this.member = {
                    email: '',
                    first_name: '',
                    last_name: '',
                    phone: '',
                    position: ''
                }
            },
            handleCreate() {

                if(this.type === 'member') {
                    this.resetMemberTemp();
                    this.dialogStatus = 'create';
                    this.dialogMemberFomVisible = true;
                }

            },
            createData() {
                this.$refs['memberForm'].validate((valid) => {
                    if (valid) {
                        this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
                        this.temp.author = 'vue-element-admin'
                        createArticle(this.temp).then(() => {
                            this.list.unshift(this.temp)
                            this.dialogFormVisible = false
                            this.$notify({
                                title: '成功',
                                message: '创建成功',
                                type: 'success',
                                duration: 2000
                            })
                        })
                    }
                })
            },
            updateMember(member) {
                this.member = member;
                this.dialogStatus = 'update';
                this.dialogMemberFormVisible = true;
            }
        }
    }
</script>

<style scoped>

</style>
