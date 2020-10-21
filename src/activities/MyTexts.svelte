<script>
    import { onMount } from "svelte";
    import { myTextsStore } from "../store";
    import Read from "./Read.svelte";

    let displayTexts = [];
    let doRead = false;
    let content = "";
    let title = "";

    $: $myTextsStore, reRenderDisplayText();

    function remove(id) {
        const index = $myTextsStore.findIndex((item) => (item.id == id));
        $myTextsStore.splice(index, 1);
        $myTextsStore = $myTextsStore;
    }

    function reRenderDisplayText() {
        const myTexts = $myTextsStore.slice();

        displayTexts = [];
        while (myTexts.length != 0) {
            const startingIndex = 0;
            const endingIndex = 3;
            const slicedArr = myTexts.splice(startingIndex, endingIndex);
            displayTexts.push(slicedArr);
        }
        displayTexts = displayTexts;
    }
</script>

<style>
    .my-texts {
        margin-top: 5%;
    }
</style>

<div class="my-texts">
    {#if !doRead}
        {#each displayTexts as text (text)}
            <div class="row">
                {#each text as sampleText (sampleText)}
                    <div class="col-4">
                        <div class="card">
                            <div src="..." class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">{sampleText.title}</h5>
                                <p class="card-text">
                                    {sampleText.content.substring(0, 20)}...
                                </p>
                                <button
                                    class="btn btn-primary"
                                    on:click={() => {
                                        doRead = true;
                                        content = sampleText.content;
                                        title = sampleText.title;
                                    }}>Прочитај</button>
                                <button
                                    class="btn btn-danger"
                                    on:click={() => remove(sampleText.id)}>Избриши</button>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
            <div class="w-100" style="height: 10px" />
        {/each}
    {:else}
        <Read {title} {content} bind:doRead />
    {/if}
</div>
