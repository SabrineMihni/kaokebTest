import * as types from './../mutation-types'

const API_URL = '/api/members';


const state = {
    membersList: []
};

const getters = {

};

const actions = {

    [types.LOAD_CLIENT_STATUS_LIST] ({ commit }) {
        axios.get(API_URL).then((response) => {
            commit(types.SET_CLIENT_STATUS_LIST, { list: response.data.data })
        }, (err) => {
            console.log(err)
        })
    },

    [types.ADD_NEW_CLIENT_STATUS] ({ commit, state }, clientStatus) {
        axios.post(API_URL+'/', clientStatus).then( (response) => {
            commit( types.ADD_CLIENT_STATUS, { clientStatus })
        }, (err) => {
            console.log(err)
        })
    },

    [types.UPDATE_CLIENT_STATUS] ({ commit, state },  clientStatus ) {
        axios.put(API_URL + '/' + clientStatus.id, clientStatus).then( (response) => {
            commit(types.UPDATE_CURRENT_CLIENT_STATUS, { clientStatus: response.data })
        }, (err) => {
            console.log(err)
        })
    },

    [types.DELETE_CLIENT_STATUS] ({ commit, state }, clientStatus ) {
        axios.delete(API_URL + '/' + clientStatus.id).then( (response) => {
                commit(types.DELETE_CURRENT_CLIENT_STATUS, { clientStatus });
            }, (err) => {
                console.log(err)
            }
        )
    }
};

const mutations = {

    [types.SET_CLIENT_STATUS_LIST] (state, { list }) {
        state.clientStatusList = list
    },

    [types.ADD_CLIENT_STATUS] (state, { clientStatus }) {
        state.clientStatusList.push(clientStatus)
    },

    [types.UPDATE_CURRENT_CLIENT_STATUS] (state, { clientStatus }) {
        let idx = state.clientStatusList.map(cs => cs.id).indexOf(clientStatus.id)
        state.clientStatusList.splice(idx, 1, clientStatus)
    },

    [types.DELETE_CURRENT_CLIENT_STATUS] (state, { clientStatus }) {
        let idx = state.clientStatusList.map(cs => cs.id).indexOf(clientStatus.id)
        state.clientStatusList.splice(idx, 1)
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}
