import storage from '../../utils/storage.js'

const state = {
    user:'哈酱',
    sum: 0,
    rightNo: 0,
    lastPerf: {
        score: 0,
        sum: 10,
        right: 0
    }
}

const getters = {
    rightRate: (state, getters, rootState) => {
        return state.sum === 0 ? 0:state.rightNo/state.sum 
    },
    lastScore: state => state.lastPerf.score,
    lastRight: state => state.lastPerf.right
}

const actions = {

}

const mutations = {
    recordScore(state, perf){
        state.sum += perf.sum
        state.rightNo += perf.right
        state.lastPerf = Object.assign(perf)
    },
    initPersonal(state, state2){
        state.user = state2.user
        state.sum += state2.sum
        state.rightNo += state2.rightNo
        state.lastPerf = Object.assign(state2.lastPerf)
    },
    storePersonal(state){
        storage.store('personal' ,state)
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}