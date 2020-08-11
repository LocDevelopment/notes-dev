<template>
    <div>
        <img src="../images/tick.svg" style="display: none" class="tick-image" alt="Save">
        <br>
        {{ item.name }}
        <br><br>
        <button @click="turnInput = !turnInput">{{ btnName }}</button>
        <br><br>
        <div v-if="turnInput">
            <input type="text" placeholder="ToDo Name" v-model="recordInput">
            <button @click="newRecord" :disabled="recordInput == false ? true : false" class="add-btn">Add ToDo</button>     
        </div>
        <ul>
            <li v-for="(recordObj, index) in item.records" :key="recordObj.record" :class="'record-' + index">
                <div class="rec-content">
                    <input type="checkbox" 
                    v-model="recordObj.checked" 
                    class="note-checkbox"
                    :value="recordObj.record">
                    {{ recordObj.record }}
                    <img class="btn-img" style="height: 1.1em" title="Edit" @click="editRecord(index)" src="../images/edit.svg">
                    <img class="btn-img" style="height: 1.1em" title="Delete" @click="delRecord(index)" src="../images/close.svg">
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'
export default {
    props: ['note'],
    data() {
        return {
            recordInput: '',
            turnInput: false
        }
    },
    computed: {
        item() {
            return this.$store.state.list[this.note]
        },
        btnName() {
            return this.turnInput ? 'Cancel New ToDo' : 'Add ToDo'
        },
        // closeBtn() {
        //     const closeBtn = document.createElement('img');
        //     closeBtn.setAttribute('src', '../images/tick.svg')
        //     return closeBtn
        // }
    },
    methods: {
        ...mapMutations(['addRecord']),
        ...mapActions(['saveState']),
        newRecord() {
            this.saveState();
            this.addRecord([this.note, this.recordInput])
            this.recordInput = ''
        },
        editRecord(index) {
            const val = this.item.records[index].record
            const input = document.createElement('input')
            input.setAttribute('value', val)
            input.classList.add('input-' + index)
            const saveBtn = document.querySelector('.tick-image').cloneNode()
            saveBtn.classList.add('save-btn')
            saveBtn.style.display = 'inline-block'
            saveBtn.setAttribute('data-index', index)
            saveBtn.setAttribute('title', 'Save')
            const record = document.querySelector(`.record-${index}`)
            record.querySelector(`.rec-content`).style.display = 'none'
            record.prepend(saveBtn)
            record.prepend(input)
            saveBtn.addEventListener('click', this.updRecord)
        },
        updRecord(e) {
            this.saveState();
            const index = e.target.getAttribute('data-index')
            if(this.item.records[index].record === document.querySelector('.input-' + index).value) {
                const record = document.querySelector(`.record-${index}`)
                record.querySelector(`.rec-content`).style.display = 'block'
                record.removeChild(record.querySelector('.input-' + index))
                record.removeChild(record.querySelector('.save-btn'))                
            } else this.item.records[index].record = document.querySelector('.input-' + index).value
        },
        delRecord(index) {
            this.saveState();
            this.$store.state.list[this.note].records.splice(index, 1)
        }
    }
}
</script>

<style scoped>
    button {
        font-weight: bold;
        cursor: pointer;
        padding: 8px;
        transition-duration: .4s;
        border-radius: 5px;
    }
    input {
        padding: 7px;
        border: 1px solid grey;
        border-radius: 5px 0 0 5px;
    }
    .add-btn {
        background: #efefef;
        border: 0px;
        border-radius: 0 5px 5px 0;
    }
    .add-btn:hover {
        background: dimgray;
        color: #fff;
    }
    .save-btn {
        display: inline-block;
        height: 1.1em;
        margin-left: .9em;
        cursor: pointer;
    }
    .btn-img {
        margin-left: 15px;
        cursor: pointer;
    }
    ul {
        list-style-type: none;
    }
    li {
        border: 1px solid #cecece;
        padding: 8px;
        border-radius: 5px;
    }
    .rec-content {
        display: flex;
        align-items: center;
    }
    .note-checkbox {
        margin-right: 10px;
    }
</style>