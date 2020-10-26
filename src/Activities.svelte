<script>
    import { push } from "svelte-spa-router";
    import { darkTheme } from './store';
    let chitajLight = "#F9E79F";
    let chitajDark = "#F7F7FF";
    let gramatikaLight = "#FAD7A0";
    let gramatikaDark = "#BDD5EA";
    let slushajLight = "#F5CBA7";
    let slushajDark = "#577399";
    let akcentirajLight = "#EDBB99";
    let akcentirajDark = "#191923";
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
</style>

<div class="activities">
    <div class="container">
        <div class="row no-gutters">
            <div class="game col-3" />
            <div class="game col-3">
                <div
                    class="jumbotron"
                    style="background-color: {$darkTheme? chitajDark : chitajLight};"
                    on:click={() => push('/activities/readAndWrite')}>
                    <p style="color:black;">Читај и пишувај</p>
                </div>
            </div>
            <div class="game col-3">
                <div
                    class="jumbotron"
                    style="background-color: {$darkTheme? gramatikaDark : gramatikaLight};"
                    on:click={() => push('/activities/grammaticsAndVocabulary')}>
                    <p style="color:black;">Граматика и вокабулар</p>
                </div>
            </div>
            <div class="game col-3" />
            <div class="w-100" />
            <div class="game col-3" />
            <div class="game col-3">
                <div
                    class="jumbotron"
                    style="background-color: {$darkTheme? slushajDark : slushajLight};"
                    on:click={() => push('/activities/listenAndWatch')}>
                    <p>Слушај и Гледај</p>
                </div>
            </div>
            <div class="game col-3">
                <div
                    class="jumbotron"
                    style="background-color: {$darkTheme? akcentirajDark : akcentirajLight};"
                    on:click={() => push('/activities/accentAndPronounce')}>
                    <p>Акцентирај и Изговарај</p>
                </div>
            </div>
            <div class="game col-3" />
        </div>
    </div>
</div>
