<script>
    import { push } from "svelte-spa-router";
    import { darkTheme } from './store';
    import { darkTheme2 } from "./store";
    import { lightTheme } from "./store";
    import { lightTheme2 } from "./store";
    import { popOverTxt } from "./store";

    $popOverTxt = "Избери некоја од понудените активности за да прдолжиш."
</script>

<style>
    .activities {
        height: 85%;
    }

    .game {
        height: 200px;
    }

    .jumbotron {
        text-align: center;
        margin: 5%;
    }

    p {
        display: block;
    }

    .jumbotron:hover {
        opacity: 0.5;
        cursor: pointer;
    }
    .chitajJumbLight {
        background-color: #F9E79F;
    }
    .chitajJumbLight2 {
        background-color: #C2D3CD;
    }
    .chitajJumbDark {
        background-color: #F7F7FF;
    }
    .vokabularJumbLight {
        background-color: #FAD7A0;
    }
    .vokabularJumbLight2 {
        background-color: #AFBFC0;
    }
    .vokabularJumbDark {
        background-color: #BDD5EA;
    }
    .slushajJumbLight {
        background-color: #F5CBA7;
    }
    .slushajJumbLight2 {
        background-color: #9FA4A9;
    }
    .slushajJumbDark {
        background-color: #577399;
    }
    .akcentirajJumbLight {
        background-color: #EDBB99;
    }
    .akcentirajJumbLight2 {
        /* background-color: #847E89; */
        background-color: #50514f;
    }
    .akcentirajJumbDark {
        background-color: #191923;
    }
</style>

<div class="activities">
    <div class="container">
        <div class="row no-gutters">
            <div class="game col-3" />
            <div class="game col-3">
                <div
                    class="jumbotron" class:chitajJumbLight={$lightTheme} class:chitajJumbLight2={$lightTheme2} class:chitajJumbDark={$darkTheme2}
                    on:click={() => push('/activities/readAndWrite')}>
                    <p style="color:black;">Читај и пишувај</p>
                </div>
                <!-- <div
                    class="jumbotron"
                    style="background-color: {$darkTheme? chitajDark : chitajLight};"
                    on:click={() => push('/activities/readAndWrite')}>
                    <p style="color:black;">Читај и пишувај</p>
                </div> -->
            </div>
            <div class="game col-3">
                <div
                    class="jumbotron" class:vokabularJumbLight={$lightTheme} class:vokabularJumbLight2={$lightTheme2} class:vokabularJumbDark={$darkTheme2}
                    on:click={() => push('/activities/grammaticsAndVocabulary')}>
                    <p style="color:black;">&nbsp; Вокабулар &nbsp;</p>
                </div>
                <!-- <div
                    class="jumbotron"
                    style="background-color: {$darkTheme? gramatikaDark : gramatikaLight};"
                    on:click={() => push('/activities/grammaticsAndVocabulary')}>
                    <p style="color:black;">Вокабулар</p>
                </div> -->
            </div>
            <div class="game col-3" />
            <div class="w-100" />
            <div class="game col-3" />
            <div class="game col-3">
                <div
                    class="jumbotron" class:slushajJumbLight={$lightTheme} class:slushajJumbLight2={$lightTheme2} class:slushajJumbDark={$darkTheme2}
                    on:click={() => push('/activities/listenAndWatch')}>
                    <p style="color:black;">Слушај и Гледај</p>
                </div>
                <!-- <div
                    class="jumbotron"
                    style="background-color: {$darkTheme? slushajDark : slushajLight};"
                    on:click={() => push('/activities/listenAndWatch')}>
                    <p>Слушај и Гледај</p>
                </div> -->
            </div>
            <div class="game col-3">
                <div
                    class="jumbotron" class:akcentirajJumbLight={$lightTheme} class:akcentirajJumbLight2={$lightTheme2} class:akcentirajJumbDark={$darkTheme2}
                    on:click={() => push('/activities/accentAndPronounce')}>
                    <p>Акцентирај и Изговарај</p>
                </div>
                <!-- <div
                    class="jumbotron"
                    style="background-color: {$darkTheme? akcentirajDark : akcentirajLight};"
                    on:click={() => push('/activities/accentAndPronounce')}>
                    <p>Акцентирај и Изговарај</p>
                </div> -->
            </div>
            <div class="game col-3" />
        </div>
    </div>
</div>
