<script>
    import { store } from "./store";
    import { push, link } from "svelte-spa-router";
    import { storeUser } from "./logging";
    import { userStore, isUserLoggedIn } from "./store";
    import { darkTheme2 } from "./store";
    import { lightTheme } from "./store";
    import { lightTheme2 } from "./store";
    import { popOverTxt } from "./store";

    
    let name = $userStore;
    let errorMsg = "";

    function onStartClick() {
        if (name) {
            storeUser(name);
            $userStore = name;
            push("/activities");
        } else {
            errorMsg = "Внесете име";
        }
    }
    function setPopTxtHome () {
        if ($isUserLoggedIn)
            $popOverTxt = "Добредојде во „Вокабуларко“, кликни на „Активности“ за да прдолжиш.";
        else
            $popOverTxt = "Добредојде во „Вокабуларко“, внеси го твоето име за да продолжиш.";
    }  
    setPopTxtHome();
</script>

<style>
    .home {
        height: 85%;
    }

    input[type="text"] {
        background-color: rgba(226, 226, 226, 0.7);
    }

    .start {
        margin: 20px;
        display: flex;
        justify-content: center;
        text-align: center;
    }

    h1,
    p {
        text-align: center;
    }

    .click-here {
        color: #c52939;
        cursor: pointer;
    }

    .jumbLight {
        background-color: #F5CBA7;
    }
    .jumbLight2 {
        background-color: #9FA4A9;
    }
    .jumbDark {
        /* background-color: #577399; */
        background-color: #BDD5EA;
    }
</style>

<!-- <div class="home" style="background-color: {$store.backgroundColor}"> -->
<div class="home">
    <div class="container">
        {#if $isUserLoggedIn}
            <div class="row">
                <div class="col-3" />
                <div class="col-6">
                    <div class="jumbotron" class:jumbLight={$lightTheme} class:jumbLight2={$lightTheme2} class:jumbDark={$darkTheme2}>
                        <h1 class="display-7" style="color:black;">Вокабуларко</h1>
                        <p class="lead" style="color:black;">Добредојде, {name}</p>

                        <hr class="my-4" />

                        <p style="color:black;">
                            Кликнете
                            <span
                                class="click-here"
                                on:click={() => push('/activities')}>тука</span>
                            или во табот за Активности за да започнете или
                            продолжите со игрите.
                        </p>
                    </div>
                </div>
                <div class="col-3" />
            </div>
        {:else}
            <div class="row">
                <div class="col-4" />
                <div class="col-4">
                    <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Внесете го вашето име"
                        bind:value={name} />
                    {#if errorMsg}
                        <small
                            id="emailHelp"
                            class="form-text text-muted"
                            style="color: red !important;">{errorMsg}</small>
                    {/if}
                </div>
                <div class="col-4" />
                <div class="w-100" />
                <div class="col-4" />
                <div class="col-4">
                    <div class="start">
                        <button
                            type="button"
                            class="start-button btn btn-primary"
                            on:click={onStartClick}>Започни</button>
                    </div>
                </div>
                <div class="col-4" />
            </div>
        {/if}
    </div>
</div>
