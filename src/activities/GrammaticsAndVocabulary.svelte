<script>
    import { push } from "svelte-spa-router";
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
            title: "./objects/bike.png",
            id: "0",
            options: [
                {
                    title: "Авион",
                    value: "Авион",
                    true: 0,
                },
                {
                    title: "Велосипед",
                    value: "Велосипед",
                    true: 1,
                },
                {
                    title: "Автомобил",
                    value: "Автомобил",
                    true: 0,
                },
                {
                    title: "Брод",
                    value: "Брод",
                    true: 0,
                },
            ],
        },
        {
            title: "./objects/bottle.png",
            id: "1",
            options: [
                {
                    title: "Шише",
                    value: "Шише",
                    true: 1,
                },
                {
                    title: "Чаша",
                    value: "Чаша",
                    true: 0,
                },
                {
                    title: "Лажица",
                    value: "Лажица",
                    true: 0,
                },
                {
                    title: "Нож",
                    value: "Нож",
                    true: 0,
                },
            ],
        },
        {
            title: "./objects/chair.png",
            id: "2",
            options: [
                {
                    title: "Маса",
                    value: "Маса",
                    true: 0,
                },
                {
                    title: "Стол",
                    value: "Стол",
                    true: 1,
                },
                {
                    title: "Чинија",
                    value: "Чинија",
                    true: 0,
                },
                {
                    title: "Кревет",
                    value: "Кревет",
                    true: 0,
                },
            ],
        },
    ];
    let questionsAnm = [
        {
            title: "./animals/lav.png",
            id: "0",
            options: [
                {
                    title: "Мачка",
                    value: "Мачка",
                    true: 0,
                },
                {
                    title: "Куче",
                    value: "Куче",
                    true: 0,
                },
                {
                    title: "Лав",
                    value: "Лав",
                    true: 1,
                },
                {
                    title: "Тигар",
                    value: "Тигар",
                    true: 0,
                },
            ],
        },
        {
            title: "./animals/cat.png",
            id: "1",
            options: [
                {
                    title: "Мачка",
                    value: "Мачка",
                    true: 1,
                },
                {
                    title: "Куче",
                    value: "Куче",
                    true: 0,
                },
                {
                    title: "Лав",
                    value: "Лав",
                    true: 0,
                },
                {
                    title: "Тигар",
                    value: "Тигар",
                    true: 0,
                },
            ],
        },
        {
            title: "./animals/kuche.png",
            id: "2",
            options: [
                {
                    title: "Мачка",
                    value: "Мачка",
                    true: 0,
                },
                {
                    title: "Куче",
                    value: "Куче",
                    true: 1,
                },
                {
                    title: "Лав",
                    value: "Лав",
                    true: 0,
                },
                {
                    title: "Тигар",
                    value: "Тигар",
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
    .grammatics-vocabulary-actions {
        margin-top: 10%;
        margin-left: 8%;
    }
    .row-btn {
        height: 1%;
        margin: 1% 32.5%;
    }
</style>

<div class="read-and-write">
    <div class="row-btn">
        <div class="col-4"><button
            type="button"
            class="btn btn-primary"
            on:click={() => push('/activities/')}><span><i class="fas fa-chevron-left"></i></span>&nbsp;<span>Назад</span></button></div>
    </div>
    <div class="row">
        <div class="col-4">
            <div class="grammatics-vocabulary-actions">
                <ul class="list-group list-group-flush">
                    {#each categories as category}
                        <li
                            class="list-group-item"
                            class:active={activeCat == category.index}
                            on:click={() => (activeCat = category.index)}
                            on:click={() => setCattegory(category.index)}><span><i class="fas fa-hand-point-right"></i></span>&nbsp;
                            <span>{category.title}</span>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
        <div class="col-8">
            {#if !last}
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <div class="container">
                                <img
                                    src={question.title}
                                    alt="pogodi"
                                    style="width:40%; height:100%;" />
                            </div>
                        </div>
                        <div class="w-100" style="height: 2%" />
                        <div class="videoCont">
                            {#each question.options as option (option.value)}
                                <input
                                    class="btn btn-primary"
                                    type="button"
                                    name={question.id}
                                    value={option.value}
                                    on:click={() => (answers[question.id] = option.true)}
                                    checked={answers[question.id] == option.true}
                                    on:click={check(option.true)} />
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
                            class="btn btn-primary"
                            on:click={inc}><span><i class="fas fa-chevron-right"></i></span>&nbsp;<span>Следно прашање</span></button>
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
                    <button
                        on:click={() => setCattegory({ currentCat })}><span><i class="fas fa-step-backward"></i></span>&nbsp;<span>Започни од
                            ново</span></button>
                </div>
            {/if}
        </div>
    </div>
</div>
