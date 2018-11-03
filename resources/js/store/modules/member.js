import * as types from './../mutation-types'

const API_URL = '/api/members';


const state = {
    membersList: []
};

const getters = {

};

const actions = {

    [types.LOAD_MEMBER_LIST] ({ commit }) {
        axios.get(API_URL).then((response) => {
            commit(types.SET_MEMBER_LIST_LOCAL, { list: response.data })
        }, (err) => {
            console.log(err)
        })
    },

    [types.ADD_NEW_MEMBER] ({ commit, state }, member) {
        axios.post(API_URL+'/', member).then( (response) => {
            commit( types.ADD_MEMBER_LOCAL, { member: response.data })
        }, (err) => {
            console.log(err)
        })
    },

    [types.UPDATE_MEMBER] ({ commit, state },  member ) {
        axios.put(API_URL + '/' + member.id, member).then( (response) => {
            commit(types.UPDATE_MEMBER_LOCAL, { member: response.data })
        }, (err) => {
            console.log(err)
        })
    },

    [types.DELETE_MEMBER] ({ commit, state }, member ) {
        axios.delete(API_URL + '/' + member.id).then( (response) => {
                commit(types.DELETE_MEMBER_LOCAL, { member });
            }, (err) => {
                console.log(err)
            }
        )
    }
};

const mutations = {

    [types.SET_MEMBER_LIST_LOCAL] (state, { list }) {
        state.membersList = list
    },

    [types.ADD_MEMBER_LOCAL] (state, { member }) {
        state.membersList.unshift(member)
    },

    [types.UPDATE_MEMBER_LOCAL] (state, { member }) {
        let idx = state.membersList.map(cs => cs.id).indexOf(member.id)
        state.membersList.splice(idx, 1, member)
    },

    [types.DELETE_MEMBER_LOCAL] (state, { member }) {
        let idx = state.membersList.map(cs => cs.id).indexOf(member.id)
        state.membersList.splice(idx, 1)
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}
