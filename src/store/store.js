import VueX from 'vuex'
import Vue from 'vue'

Vue.use(VueX)

export const store = new VueX.Store({
    state: {
        list: [],
        engage: true,
        prevList: [],
        cancelledList: []
    },
    getters: {
        notesList: state => state.list,
        prevList: state => state.prevList.length,
        cancelledList: state => state.cancelledList.length
    },
    mutations: {
        delNote: (state, payload) => state.list.splice(payload, 1),
        changeNoteName: (state, payload) => state.list[payload.index].name = payload.text, 
        addNote: (state, payload) => state.list.unshift({ name: payload, records: [] }),
        addRecord: (state, payload) => state.list[payload[0]].records.push({record: payload[1], checked: false}),
        saveState: state => state.prevList.unshift(JSON.stringify(state.list)),
        returnState: state => {
            if(state.prevList.length > 0) {
                // Saving state to return array
                state.cancelledList.unshift(JSON.stringify(state.list))
                // Returning Main state to previous state
                state.list = JSON.parse(state.prevList[0])
                // And deleting It from Previous Array
                state.prevList.shift()
            }
        },
    },
    actions: {
        returnCancelled: context => {
            if(context.state.cancelledList.length > 0) {
                // Saving Current State
                context.commit('saveState')
                // Returning state with cancelled changes 
                context.state.list = JSON.parse(context.state.cancelledList[0])
                // Deleting this state from list
                context.state.cancelledList.shift()
            }
        },
        saveState: context => context.commit('saveState'),
        returnState: context => {
            context.commit('returnState');
        },
        delNote: (context, payload) => {
            context.commit('saveState')    
            context.commit('delNote', payload)
        },
        editNoteName: (context, payload) => context.commit('changeNoteName', payload),
        addNote: (context, payload) => {
            context.commit('saveState')    
            context.commit('addNote', payload)
        },
        clearAll: context => {
            context.state.prevList = []
            context.state.cancelledList = []
        }
    }
})
