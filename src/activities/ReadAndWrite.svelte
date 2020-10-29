<script>
    import MyTexts from "./MyTexts.svelte";
    import Write from "./Write.svelte";
    import { push } from "svelte-spa-router";
    import { darkTheme2 } from "../store";
    import { lightTheme2 } from "../store";
    import { popOverTxt } from "../store";

    // $popOverTxt = "Избери некој од понудените текстови или напиши свој."

    const options = [
        {
            tabIndex: 1,
            displayText: "Прочитај",
            iconClass: "fas fa-book-open",
        },
        { tabIndex: 2, displayText: "Напиши", iconClass: "fas fa-pencil-alt" },
    ];

    let activeTab = 1;

    function setPopTxtRW(txt) {
        $popOverTxt = txt;
    }
</script>

<style>
    .read-and-write {
        height: 85%;
        position: relative;
        min-height: 85vh;
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
    .back-button {
        margin-top: 5%;
    }
    .list-grp-light2 {
        color: #d6d8db;
        background-color: #114B5F;
    }
    .list-grp-light2.list-group-item-action.active {
        color: #114B5F;
        background-color: #d6d8db;
        /* border-color: #114B5F; */
        border-color: #d6d8db;
    }
    .list-grp-light2.list-group-item-action:focus, .list-grp-light2.list-group-item-action:hover {
        color: #114B5F;
        background-color: #c8cbcf;
    }

    .list-grp-dark {
        color: #d6d8db;
        background-color: #1d3040;
    }
    .list-grp-dark.list-group-item-action.active {
        color: #1d3040;
        background-color: #d6d8db;
        border-color: #d6d8db;
    }
    .list-grp-dark.list-group-item-action:focus, .list-grp-dark.list-group-item-action:hover {
        color: #1d3040;
        background-color: #c8cbcf;
    }
</style>

<div class="read-and-write">
    <div class="row">
        <div class="col-4">
            <div class="read-write-actions">
                <ul class="list-group list-group-flush">
                    {#each options as option (option)}
                        <li
                            class="list-group-item list-group-item-action" class:list-grp-dark={$darkTheme2} class:list-grp-light2={$lightTheme2}
                            class:active={activeTab == option.tabIndex}
                            on:click={() => (activeTab = option.tabIndex)}>
                            <span><i class={option.iconClass} /></span>&nbsp;
                            <span>{option.displayText}</span>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
        <div class="col-8" style="margin-bottom: 60px;">
            <!-- <button
                type="button"
                class="btn btn-primary back-button"
                on:click={() => push('/activities/')}><span><i
                        class="fas fa-chevron-left" /></span>&nbsp;<span>Назад</span></button> -->

            {#if activeTab == 1}
                <p hidden>{setPopTxtRW("Избери некој од понудените текстови или напиши свој.")}</p>
                <MyTexts />
            {/if}
            {#if activeTab == 2}
            <p hidden>{setPopTxtRW("Напиши го својот текст и притисни на копчето „Зачувај“.")}</p>
                <Write bind:activeTab />
            {/if}
        </div>
    </div>
</div>
