<template>
    <modal class="modal-card">
        <div slot="header" class="modal-card-header">
            <div class="modal-card-header-title">
                <input
                    class="form-control"
                    type="text"
                    :value="card.title"
                    :readonly="!toggleTitle"
                    @click.prevent="toggleTitle = !toggleTitle"
                    @blur="onBlurTitle"
                    ref="inputTitle"
                />
            </div>
            <a class="modal-close-btn" href="" @click.prevent="onClickClose">&times;</a>
        </div>
        <div slot="body">
            <h3>Description</h3>
            <textarea
                class="form-control"
                cols="30"
                rows="3"
                placeholder="Add a more detailed description..."
                :readonly="!toggleDesc"
                @click.prevent="toggleDesc = !toggleDesc"
                @blur="onBlurInputDesc"
                ref="inputDesc"
                v-model="card.description"
            ></textarea>
        </div>
        <div slot="footer"></div>
    </modal>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Modal from './Modal.vue';

export default {
    components: {
        Modal
    },
    props: ['boardId'],
    data() {
        return {
            toggleTitle: false,
            toggleDesc: false
        };
    },
    computed: {
        ...mapState(['card'])
    },
    created() {
        const id = this.$route.params.cid;
        this.FETCH_CARD({ id });
    },
    methods: {
        ...mapActions(['FETCH_CARD']),
        onClickClose() {
            this.$router.push(`/board/${this.boardId}`);
        },
        onBlurInputDesc() {},
        onBlurTitle() {}
    }
};
</script>

<style>
.modal-card .modal-container {
    min-width: 300px;
    max-width: 800px;
    width: 60%;
}
.modal-card-header-title {
    padding-right: 30px;
}
.modal-close-btn {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 24px;
    text-decoration: none;
}
.modal-card-header {
    position: relative;
}
</style>
