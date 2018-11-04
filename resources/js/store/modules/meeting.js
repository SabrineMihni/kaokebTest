import * as types from './../mutation-types'

const API_URL = '/api/meetings';


const state = {
    meetingsList: []
};

const getters = {

};

const actions = {

    [types.LOAD_MEETING_LIST] ({ commit }) {
        axios.get(API_URL).then((response) => {
            commit(types.SET_MEETING_LIST_LOCAL, { list: response.data })
        }, (err) => {
            console.log(err)
        })
    },

    [types.ADD_NEW_MEETING] ({ commit, state }, meeting) {
        axios.post(API_URL+'/', meeting).then( (response) => {
            commit( types.ADD_MEETING_LOCAL, { meeting: response.data })
        }, (err) => {
            console.log(err)
        })
    },

    [types.UPDATE_MEETING] ({ commit, state },  meeting ) {
        axios.put(API_URL + '/' + meeting.id, meeting).then( (response) => {
            commit(types.UPDATE_MEETING_LOCAL, { meeting: response.data })
        }, (err) => {
            console.log(err)
        })
    },

    [types.DELETE_MEETING] ({ commit, state }, meeting ) {
        axios.delete(API_URL + '/' + meeting.id).then( (response) => {
                commit(types.DELETE_MEETING_LOCAL, { meeting });
            }, (err) => {
                console.log(err)
            }
        )
    }
};

const mutations = {

    [types.SET_MEETING_LIST_LOCAL] (state, { list }) {
        state.meetingsList = list
    },

    [types.ADD_MEETING_LOCAL] (state, { meeting }) {
        state.meetingsList.push(meeting)
    },

    [types.UPDATE_MEETING_LOCAL] (state, { meeting }) {
        let idx = state.meetingsList.map(cs => cs.id).indexOf(meeting.id)
        state.meetingsList.splice(idx, 1, meeting)
    },

    [types.DELETE_MEETING_LOCAL] (state, { meeting }) {
        let idx = state.meetingsList.map(cs => cs.id).indexOf(meeting.id)
        state.meetingsList.splice(idx, 1)
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}
