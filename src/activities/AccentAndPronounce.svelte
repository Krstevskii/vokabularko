<script>
    const tabIndex = Object.freeze({
        read: 1,
        write: 2,
        myTexts: 3,
    });
    let count = 0;
    let picked;
    let answers = {};
    let last = 0;
    let qst = [];
    let activeCat = 0;
    let currentCat;
    let categories = [
        {
            title: "Општо",
            index: 0,
            //val: questionsOps
        },
        {
            title: "Животни",
            index: 1,
            //val: questionsAnm
        },
    ];
    let questionsOps = [
        {
            title: "Микрофон",
            id: "0",
            options: [
                {
                    title: "кро",
                    value: "кро",
                    true: 0,
                },
                {
                    title: "Ми",
                    value: "Ми",
                    true: 1,
                },
                {
                    title: "фон",
                    value: "фон",
                    true: 0,
                },
            ],
        },
        {
            title: "Велосипед",
            id: "1",
            options: [
                {
                    title: "си",
                    value: "си",
                    true: 0,
                },
                {
                    title: "ло",
                    value: "ло",
                    true: 1,
                },
                {
                    title: "пед",
                    value: "пед",
                    true: 0,
                },
                {
                    title: "Ве",
                    value: "Ве",
                    true: 0,
                },
            ],
        },
        {
            title: "Кондураџија",
            id: "2",
            options: [
                {
                    title: "ду",
                    value: "ду",
                    true: 0,
                },
                {
                    title: "Кон",
                    value: "Кон",
                    true: 0,
                },
                {
                    title: "ра",
                    value: "ра",
                    true: 1,
                },
                {
                    title: "ја",
                    value: "ја",
                    true: 0,
                },
                {
                    title: "џи",
                    value: "џи",
                    true: 0,
                },
            ],
        },
    ];
    let questionsAnm = [
        {
            title: "Кокошка",
            id: "0",
            options: [
                {
                    title: "Ко",
                    value: "Ко",
                    true: 1,
                },
                {
                    title: "кош",
                    value: "кош",
                    true: 0,
                },
                {
                    title: "ка",
                    value: "ка",
                    true: 0,
                },
            ],
        },
        {
            title: "Носорог",
            id: "1",
            options: [
                {
                    title: "рог",
                    value: "рог",
                    true: 0,
                },
                {
                    title: "со",
                    value: "со",
                    true: 0,
                },
                {
                    title: "Но",
                    value: "Но",
                    true: 1,
                },
            ],
        },
        {
            title: "Крокодил",
            id: "2",
            options: [
                {
                    title: "Кро",
                    value: "Кро",
                    true: 1,
                },
                {
                    title: "дил",
                    value: "дил",
                    true: 0,
                },
                {
                    title: "ко",
                    value: "ко",
                    true: 0,
                },
            ],
        },
    ];
    let activeQuestion = 0;
    //$: question = questionsOps[activeQuestion];
    function setCattegory(ind) {
        if (ind == 0) qst = questionsOps;
        else if (ind == 1) qst = questionsAnm;
        picked = undefined;
        activeQuestion = 0;
        last = 0;
        answers = {};
        count = 0;
        shuffle(qst);
        currentCat = ind;
    }
    setCattegory(0); //init
    $: question = qst[activeQuestion];
    function dec() {
        if (activeQuestion === 0) {
            return;
        }
        activeQuestion -= 1;
        picked = undefined;
    }
    function inc() {
        if (activeQuestion === qst.length - 1) {
            last = 1;
            picked = undefined;
            correctAnswers();
            return;
        }
        activeQuestion += 1;
        picked = undefined;
    }
    function correctAnswers() {
        console.log("here");
        for (let i = 0; i < qst.length; i++) {
            if (answers[i] == 1) {
                count++;
                console.log(count);
            }
        }
    }
    function check(answ) {
        picked = answ;
    }
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue,
            randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    //shuffle(questions);
    function reload() {
        window.location.reload();
    }
</script>

<style>
    .read-and-write {
        height: 85%;
    }

    textarea {
    }

    .row {
        height: 100%;
    }

    .container {
        height: 100%;
    }
    .videoCont {
        /* position: relative;
        width: 100%;
        height: 80%; */
        padding-bottom: 56.25%;
        margin: 0 auto;
    }
    .vid {
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
        margin-top: 0px;
        margin-right: auto;
        margin-bottom: 0px;
        margin-left: auto;
    }
</style>

<div class="read-and-write">
    <div class="row">
        <div class="col-4">
            <div class="container">
                <ul class="list-group list-group-flush">
                    {#each categories as category}
                        <li
                            class="list-group-item"
                            class:active={activeCat == category.index}
                            on:click={() => (activeCat = category.index)}
                            on:click={() => setCattegory(category.index)}>
                            {category.title}
                        </li>
                    {/each}
                </ul>

                <!-- <ul class="list-group">
                    <li class="list-group-item">{video.title}</li>
                    <li class="list-group-item">{video.title}</li>
                    <li class="list-group-item">{video.title}</li>
                </ul> -->
            </div>
        </div>
        <div class="col-8">
            {#if !last}
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <div class="container">
                                <h1 class="display-4">{question.title}</h1>
                            </div>
                        </div>
                        <div class="w-100" style="height: 2%" />
                        <div class="videoCont">
                            <!-- <div class="form-group">
                            <textarea
                                class="form-control"
                                id="write"
                                rows="20"
                                cols="50" />
                        </div> -->
                            <!-- <iframe title={video.title} src={video.link} class="vid"></iframe> -->
                            <!-- <div class="videoCont"><iframe title={video.title} src={video.link} class="vid"></iframe></div> -->
                            {#each question.options as option (option.value)}
                                <!-- <label on:click> -->
                                <input
                                    class="btn btn-primary"
                                    type="button"
                                    name={question.id}
                                    value={option.value}
                                    on:click={() => (answers[question.id] = option.true)}
                                    checked={answers[question.id] == option.true}
                                    on:click={check(option.true)} />
                                <!-- </label> -->
                            {/each}
                            {#if picked}
                                <div class="col">
                                    <h2>Точен одговор!</h2>
                                </div>
                            {:else if picked == 0}
                                <div class="col">
                                    <h2>Погрешен одговор!</h2>
                                </div>
                            {/if}
                        </div>
                    </div>
                    <div class="col">
                        <button
                            type="button"
                            class="btn btn-primary-outline"
                            on:click={inc}>Следно прашање</button>
                    </div>
                </div>
            {/if}
            {#if last}
                {#if count && count != 2}
                    <div class="col">
                        <h2>Браво, точно одговори на {count} прашање</h2>
                    </div>
                {:else}
                    <div class="col">
                        <h2>Браво, точно одговори на {count} прашања</h2>
                    </div>
                {/if}
                <div class="col">
                    <button on:click={() => setCattegory({currentCat})}>Започни од ново</button>
                </div>
            {/if}
        </div>
    </div>
</div>
