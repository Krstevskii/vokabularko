<script>
    import { myTextsStore } from "../store";
    import {push} from "svelte-spa-router";

    let title = "";
    let content = "";
    let error = "";
    export let activeTab;

    function findLatestId() {
        let maxId = 0;
        $myTextsStore.forEach(item => {
            if(maxId < item.id) {
                maxId = item.id;
            }
        });

        return maxId;

    }

    function save(e) {
        e.preventDefault();
        const maxId = findLatestId();
        if (title) {
            const res = {
                id: maxId + 1,
                title,
                content,
            };
            $myTextsStore.unshift(res);
            activeTab = 1;
        } else {
            error = "Ве молиме внесете наслов";
        }
    }
</script>

<style>
    .write {
        margin-top: 5%;
    }
</style>

<div class="write">
    <form>
        <div class="form-group">
            <label for="title">Наслов:</label>
            <input
                type="title"
                class="form-control"
                id="title"
                bind:value={title}
                aria-describedby="emailHelp" />
            {#if error}
                <small id="emailHelp" class="form-text text-muted">{error}</small>
            {/if}
        </div>
        <div class="form-group">
            <label for="content">Текст:</label>
            <textarea
                bind:value={content}
                class="form-control"
                id="content"
                rows="3" />
        </div>
        <button
            class="btn btn-primary" type="button"
            on:click={(e) => save(e)}>Зачувајjjj</button>
    </form>
</div>
