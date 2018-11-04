<template>
    <div>
        <el-form ref="memberForm" :rules="rules" :model="member" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
            <el-form-item label="Nom" prop="last_name">
                <el-input v-model="member.last_name"/>
            </el-form-item>
            <el-form-item label="Prénom" prop="first_name">
                <el-input v-model="member.first_name"/>
            </el-form-item>
            <el-form-item label="Email" prop="email">
                <el-input v-model="member.email"/>
            </el-form-item>
            <el-form-item label="Téléphone">
                <el-input v-model="member.phone"/>
            </el-form-item>
            <el-form-item label="Position">
                <el-input v-model="member.position"/>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer member-form">
            <el-button @click="close()">Annuler</el-button>
            <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">Confirmer</el-button>
        </div>
    </div>
</template>

<script>
    import * as types from './../../store/mutation-types'

    export default {
        name: "MemberForm",
        props: ['dialogStatus', 'member'],
        data() {
            return {
                rules: {
                    first_name: [{ required: true, message: 'Le prénom est obligatoire!', trigger: 'change' }],
                    last_name: [{ required: true, message: 'Le nom est obligatoire!', trigger: 'change' }],
                    email: [{ required: true, message: 'L\'adresse email est obligatoire!', trigger: 'blur' },
                        { type: 'email', message: 'L\'adresse email n\'est pas valide!', trigger: 'blur' },],
                }
            }
        },
        methods: {
            close() {
                this.$emit('close');
            },
            createData() {
                this.$refs['memberForm'].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch(types.ADD_NEW_MEMBER, this.member).then(
                            (res) => {
                                this.close();
                                this.$notify({
                                    title: 'Success!',
                                    message: 'Membre bien ajouté!',
                                    type: 'success',
                                    duration: 2000
                                })
                            }
                        );
                    }
                });
            },
            updateData() {
                this.$refs['memberForm'].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch(types.UPDATE_MEMBER, this.member).then(
                            (res) => {
                                this.close();
                                this.$notify({
                                    title: 'Success!',
                                    message: 'Membre bien modifié!',
                                    type: 'success',
                                    duration: 2000
                                })
                            }
                        );
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

    .member-form .el-button+.el-button {
        float: right;
    }

</style>
