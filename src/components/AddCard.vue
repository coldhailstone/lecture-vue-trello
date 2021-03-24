<template>
    <div class="add-card">
        <form @submit.prevent="onSubmitNewCard">
            <input class="form-control" type="text" v-model="inputCardTitle" ref="inputCardTitle" @blur="$emit('close')" />
            <button class="btn btn-success" type="submit" :disabled="invalidInput">Add Card</button>
            <a class="cancel-add-btn" href="" @click.prevent="$emit('close')">&times;</a>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props: ['listId'],
    data() {
        return {
            inputCardTitle: ''
        };
    },
    computed: {
        invalidInput() {
            return !this.inputCardTitle.trim();
        }
    },
    mounted() {
        this.$refs.inputCardTitle.focus();
    },
    methods: {
        ...mapActions(['ADD_CARD']),
        onSubmitNewCard() {
            if (this.invalidInput) return;
            const { inputCardTitle, listId } = this;
            const pos = this.newCardPos();
            this.ADD_CARD({ title: inputCardTitle, listId, pos }).finally(() => (this.inputCardTitle = ''));
        },
        newCardPos() {
            const curList = this.$store.state.board.lists.filter(l => l.id === this.listId)[0];
            if (!curList) return 65535;
            const { cards } = curList;
            if (!cards.length) return 65535;
            return cards[cards.length - 1].pos * 2;
        }
    }
};
</script>

<style>
.add-card {
    padding: 10px;
    display: block;
    position: relative;
}
.add-card .cancel-add-btn {
    display: inline-block;
    margin-left: 10px;
    vertical-align: middle;
    text-decoration: none;
    color: #888;
    font-size: 24px;
}
.add-card .cancel-add-btn:hover,
.add-card .cancel-add-btn:focus {
    color: #666;
}
</style>
