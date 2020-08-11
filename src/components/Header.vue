<template>
    <div>
        <div v-if="state">
            <div v-show="turnInput">
                <input type="text" placeholder="Note Name" v-model="noteInput">
                <button @click="newNote" :disabled="noteInput == false ? true : false" class="add-note-btn">Add Note</button>
            </div>
            <br>
            <button @click="initNewNote" class="new-note-btn">{{ btnTxt }}</button>
        </div>
        <div v-else>
            <button @click="returnNotes" class="notes-btn">Notes</button>
        </div>
        <br>
        <!-- <button 
            @click="returnState" 
            :disabled="prevList ? false : true" 
            class="return-btn" 
            title="Cancel changes"> -->
            <div class="btns">
                <img class="state-btn" title="Cancel changes" @click="returnState" :src="prevBtn">
        <!-- </button> -->
        <!-- <button @click="returnCancelled" :disabled="cancelledList ? false : true" title="Repeat cancelled changes"> -->
                <img class="state-btn" title="Repeat cancelled changes" :src="nextBtn" @click="returnCancelled">
            </div>
        <!-- </button> -->
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            noteInput: '',
            turnInput: false
        }
    },
    computed: {
        prevBtn() {
            return this.prevList ? require('../images/prev.svg') : require('../images/prev-disabled.svg')
        },
        nextBtn() {
            return this.cancelledList ? require('../images/next.svg') : require('../images/next-disabled.svg')
        },
        state() {
            return this.$store.state.engage
        },
        btnTxt() {
            return this.turnInput ? 'Cancel New Note' : 'New Note'
        },
        ...mapGetters(['prevList', 'cancelledList'])
    },
    methods: {
        returnNotes() {
            this.$store.state.engage = true
        },
        ...mapActions([
            'returnCancelled',
            'returnState',
            'addNote'
        ]),
        initNewNote() {
           this.turnInput ? this.turnInput = false : this.turnInput = true
        },
        newNote() {
            this.addNote(this.noteInput);
            this.noteInput = ''
        }
    },
}
</script>

<style scoped>
    .state-btn {
        margin-left: 8px;
        height: 20px; 
        cursor: pointer;
    }
    .btns {
        margin-left: 1em;
    }
    button {
        font-weight: bold;
        cursor: pointer;
        padding: 8px;
        transition-duration: .4s;
        border-radius: 5px;
    }

    .notes-btn {
        background: #efefef;
        border: 0;
        padding: 10px;
    }
    .notes-btn:hover {
        background: #dbdbdb;
        color: #fff;
    }
    .new-note-btn {
        background: #fff;
        margin-left: .5em;
    }
    .new-note-btn:hover {
        background: #000;
        color: #fff;
    }
    .add-note-btn {
        background: #efefef;
        border: 0px;
        border-radius: 0 5px 5px 0;
    }
    input {
        padding: 7px;
        border: 1px solid grey;
        border-radius: 5px 0 0 5px;
    }

</style>