<script>
    import MyTexts from "./MyTexts.svelte";
    import Write from "./Write.svelte";

    const options = [
        { tabIndex: 1, displayText: "Прочитај" },
        { tabIndex: 2, displayText: "Напиши" },
    ];

    let activeTab = 1;
</script>

<style>
    .read-and-write {
        height: 85%;
    }

    .read-write-actions {
        margin-top: 10%;
        margin-left: 8%;
    }

    .row {
        height: 100%;
    }

    .container {
        height: 100%;
    }
</style>

<div class="read-and-write">
    <div class="row">
        <div class="col-4">
            <div class="read-write-actions">
                <ul class="list-group list-group-flush">
                    {#each options as option (option)}
                        <li
                            class="list-group-item"
                            class:active={activeTab == option.tabIndex}
                            on:click={() => (activeTab = option.tabIndex)}>
                            {option.displayText}
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
        <div class="col-8">
            {#if activeTab == 1}
                <MyTexts />
            {/if}
            {#if activeTab == 2}
                <Write bind:activeTab />
            {/if}
        </div>
    </div>
</div>
