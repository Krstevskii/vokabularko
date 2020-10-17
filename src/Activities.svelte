<script>
    import { push } from "svelte-spa-router";
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
                    style="background-color: #F9E79F;"
                    on:click={() => push('/activities/readAndWrite')}>
                    <p>Читај и пишувај</p>
                </div>
            </div>
            <div class="game col-3">
                <div
                    class="jumbotron"
                    style="background-color: #FAD7A0;"
                    on:click={() => push('/activities/gramaticsAndVocabulary')}>
                    <p>Граматика и вокабулар</p>
                </div>
            </div>
            <div class="game col-3" />
            <div class="w-100" />
            <div class="game col-3" />
            <div class="game col-3">
                <div
                    class="jumbotron"
                    style="background-color: #F5CBA7;"
                    on:click={() => push('/activities/hearAndWatch')}>
                    <p>Слушај и Гледај</p>
                </div>
            </div>
            <div class="game col-3">
                <div
                    class="jumbotron"
                    style="background-color: #EDBB99;"
                    on:click={() => push('/activities/accentAndPronounce')}>
                    <p>Акцентирај и Изговарај</p>
                </div>
            </div>
            <div class="game col-3" />
        </div>
    </div>
</div>
