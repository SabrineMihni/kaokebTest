<template>
    <div>
        <el-form ref="meetingForm" :rules="rules" :model="meeting" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
            <el-form-item label="Lieu" prop="place">
                <el-input v-model="meeting.place"/>
            </el-form-item>
            <el-form-item label="Sujet" prop="subject">
                <el-input v-model="meeting.subject"/>
            </el-form-item>
            <el-form-item label="Synthèse" prop="synthesis">
                <el-input v-model="meeting.synthesis"/>
            </el-form-item>
            <el-form-item label="Date de début">
                <el-date-picker v-model="meeting.began_at" type="datetime" placeholder="Veuillez choisir une date"/>
            </el-form-item>
            <el-form-item label="Date de clôture">
                <el-date-picker v-model="meeting.finished_at" type="datetime" placeholder="Veuillez choisir une date"/>
            </el-form-item>
            <dnd-list :list2="memberList" :list1="meeting.members" @updateMembers="(list1) => meeting.members = list1"></dnd-list>
        </el-form>
        <div slot="footer" class="dialog-footer member-form">
            <el-button @click="close()">Annuler</el-button>
            <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">Confirmer</el-button>
        </div>
    </div>
</template>

<script>
    import * as types from './../../store/mutation-types'
    import DndList from "../DndList/DndList";

    export default {
        name: "MeetingForm",
        components: {DndList},
        props: ['dialogStatus', 'meeting'],
        data() {
            return {
                rules: {
                    place: [{ required: true, message: 'Le lieu est obligatoire!', trigger: 'change' }],
                    subject: [{ required: true, message: 'Le sujet est obligatoire!', trigger: 'change' }],
                }
            }
        },
        mounted() {
            this.loadMembers();
        },
        methods: {
            close() {
                this.$emit('close');
            },
            createData() {
                this.$refs['meetingForm'].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch(types.ADD_NEW_MEETING, this.meeting).then(
                            (res) => {
                                this.close();
                                this.$notify({
                                    title: 'Success!',
                                    message: 'Entretien bien ajouté!',
                                    type: 'success',
                                    duration: 2000
                                })
                            }
                        );
                    }
                });
            },
            updateData() {
                this.$refs['meetingForm'].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch(types.UPDATE_MEETING, this.meeting).then(
                            (res) => {
                                this.close();
                                this.$notify({
                                    title: 'Success!',
                                    message: 'Entretien bien modifié!',
                                    type: 'success',
                                    duration: 2000
                                })
                            }
                        );
                    }
                });
            },
            loadMembers() {
                this.$store.dispatch(types.LOAD_MEMBER_LIST).then(
                    (res) => this.listLoading = false
                );
            }
        },
        computed: {
            memberList() {
                return this.$store.state.member.membersList;
            }
        }
    }
</script>

<style lang="scss" scoped>

    .member-form .el-button+.el-button {
        float: right;
    }

</style>
