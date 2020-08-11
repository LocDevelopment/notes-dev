<template>
    <div>
        <br>
        <ul>
            <transition-group name="slide">
                <li v-for="(item, index) in notesList" :class="'note' + index" :key="item.name" @click="openNote">
                    <div :class="'item' + index">
                        {{ item.name }}
                        <div>
                            <button @click.prevent="editNote(index)" class="edit-btn">Edit
                            </button>
                            <button @click="delNote(index)" class="delete-btn">Delete
                            </button>
                        </div>
                    </div>
                </li>            
            </transition-group>
        </ul>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import { eventBus } from '../main'
export default {
    data() {
        return {
            note: ''
        }
    },
    computed: {
        ...mapGetters(['notesList']),
        list() {
            return this.$store.state.list
        },
    },
    methods: {
        openNote(e) {
            const name = e.target.classList[0]
            const nameArr = name.split('')
            const index = nameArr[4]
            nameArr.pop()
            const word = nameArr.join('')
            if(!(name === 'edit-btn'||name === 'delete-btn'||word === 'close'||name === 'noteNameUpd')) eventBus.$emit('openNote', index)
        },
        ...mapActions([
            'delNote',
            'testAct',
            'returnState',
            'saveState'
        ]),
        editNote(index) {
            const input = document.createElement('input');
            input.setAttribute('value', this.$store.state.list[index].name)
            input.classList.add('noteNameUpd')
            input.setAttribute('style', 'padding: 7px; border: 1px solid grey; border-radius: 5px 0 0 5px;');
            const closeBtn = document.createElement('button');
            closeBtn.textContent = 'Save'
            closeBtn.classList.add('close' + index)
            closeBtn.setAttribute('style', 'background: #fff; border: 1px #efefef solid; border-radius: 0 5px 5px 0;font-weight: bold; cursor: pointer; padding: 8px;')
            const note = document.querySelector(`.note${index}`);
            note.querySelector(`.item${index}`).style.display = 'none'
            note.prepend(closeBtn)
            note.prepend(input)
            closeBtn.addEventListener('click', this.updNoteName)
        },
        updNoteName(e) {
            this.saveState();
            const index = e.target.classList[0].split('')[5]
            const text = document.querySelector('.noteNameUpd').value
            const note = document.querySelector(`.note${index}`)
            this.$store.dispatch('editNoteName', {index, text})
            note.removeChild(document.querySelector('.close' + index))
            note.removeChild(document.querySelector('.noteNameUpd'))
            note.querySelector(`.item${index}`).style.display = 'flex'
        }
    },
}
</script>

<style scoped>
    ul {
        list-style-type: none;
    }
    li {
        margin-bottom: 3px;
        cursor: pointer;
        font-family: sans-serif;
        border: 1px solid grey;
        padding: 10px;
        border-radius: 6px;
        transition-property: background-color;
        transition-duration: 1.3s;
    }
    li:hover {
        background-color: #efefef;
        border: 1px solid #efefef;
    }
    li > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    button {
        font-weight: bold;
        cursor: pointer;
        padding: 8px;
        transition-duration: .4s;
        border-radius: 5px;
    }
    button:hover {
        color: #fff;
    }
    .delete-btn, .edit-btn {
        margin-left: 10px;
    }
    .delete-btn {
        color: red;
        border: 2px solid red;
        background:rgba(255, 0, 0, .1)
    }
    .delete-btn:hover {
        background: red;
    }
    .edit-btn {
        color: cornflowerblue;
        border: 2px solid cornflowerblue;
        background: rgba(0, 0, 255, .1);
    }
    .edit-btn:hover {
        background: cornflowerblue;
    }
    input {
        padding: 7px;
        border: 1px solid grey;
        border-radius: 5px 0 0 5px;
    }
    .noteNameUpd {
        padding: 7px;
        border: 1px solid grey;
        border-radius: 5px 0 0 5px;
    }

    .return-btn {
        display: inline-block;
        padding: 0.35em 1.2em;
        border: 0.1em solid #FFFFFF;
        margin: 0 0.3em 0.3em 0;
        border-radius:0.12em;
        box-sizing: border-box;
        text-decoration:none;
        font-family:'Roboto',sans-serif;
        font-weight:300;
        color:#FFFFFF;
        text-align:center;
        transition: all 0.2s;
    }
    .return-btn:hover {
        color:#000000;
        background-color:#FFFFFF;
    }
    @media all and (max-width:30em) {
        .return-btn {
            display:block;
            margin:0.4em auto;
        }
    }    



    /* ANIMATION */
    .slide-enter {
        opacity: 0;
    }

    .slide-enter-active {
        animation: slide-in .6s linear forwards;
        transition: opacity .5s;
    }

    .slide-leave-active {
        animation: slide-out 0s linear forwards;
        transition: opacity 0s;
        opacity: 0;
        position: absolute;
    }

    @keyframes slide-in {
        from {
            transform: translateX(-100px);
        }
        to {
            transform: translateX(0);
        }
    }

</style>