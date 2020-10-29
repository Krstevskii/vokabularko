<script>
    import { onMount } from "svelte";
    import { myTextsStore } from "../store";
    import Read from "./Read.svelte";
    import { darkTheme2 } from "../store";
    import { lightTheme } from "../store";
    import { lightTheme2 } from "../store";

    let displayTexts = [];
    let doRead = false;
    let content = "";
    let title = "";

    $: $myTextsStore, reRenderDisplayText();

    function remove(id) {
        const index = $myTextsStore.findIndex((item) => item.id == id);
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
        margin-top: 2%;
    }
    .cardLight {
        background-color: #F5CBA7;
    }
    .cardLight2 {
        background-color: #9FA4A9;
    }
    .cardDark {
        /* background-color: #577399; */
        background-color: #BDD5EA;
    }
</style>

<div class="my-texts">
    {#if !doRead}
        {#each displayTexts as text (text)}
            <div class="row">
                {#each text as sampleText (sampleText)}
                    <div class="col-4">
                        <div class="card" class:cardLight2={$lightTheme2} class:cardDark={$darkTheme2}>
                            <div src="..." class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5  style="color:black;" class="card-title">{sampleText.title}</h5>
                                <p  style="color:black;" class="card-text">
                                    {sampleText.content.substring(0, 20)}...
                                </p>
                                <div class="row justify-content-start">
                                    <div class="col-md-auto">
                                        <button
                                            class="btn btn-primary"
                                            on:click={() => {
                                                doRead = true;
                                                content = sampleText.content;
                                                title = sampleText.title;
                                            }}><span><i
                                                    class="fas fa-glasses" /></span>&nbsp;<span>Прочитај</span></button>
                                    </div>
                                    <div class="col-md-auto">
                                        <button
                                            class="btn btn-danger"
                                            on:click={() => remove(sampleText.id)}><span><i
                                                    class="fas fa-trash-alt" /></span>&nbsp;<span>Избриши</span></button>
                                    </div>
                                </div>
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
