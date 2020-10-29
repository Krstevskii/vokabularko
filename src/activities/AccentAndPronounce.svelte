<script>
    import data from "./static/accentAndPronounce";
    import { userStore } from "../store";
    import { darkTheme2 } from "../store";
    import { lightTheme2 } from "../store";
    import { popOverTxt } from "../store";
    import { lightTheme } from "../store";

    $popOverTxt = "Кликни го слогот на кој мислиш дека паѓа акцентот на прикажаниот збор и притисни на стрелката за да отидеш на следното прашање. Кога ќе ги одговориш сите прашања, притисни на копчето „Внеси“ за да го добиеш твојот резултат. П.С. Кај трисложните и повеќесложните зборови акцентот стои на третиот слог од крајот на зборот."

    const options = [
        {
            tabIndex: 1,
            displayText: "Општо",
            iconClass: "fas fa-bell",
        },
        {
            tabIndex: 2,
            displayText: "Животни",
            iconClass: "fas fa-paw",
        },
    ];

    let activeTab = 1;
    let activeWord = {};
    let showResults = false;
    let answers = {};
    let disableButton = true;
    let correctAnswers = 0;

    $: activeWords = activeTab === 1 ? data.general : data.animals;
    $: activeWords, initializeActiveWord(), initializeAnswersObj();
    $: {
        let ans = Object.keys(answers).map((item) => {
            return answers[item];
        });

        disableButton = ans.some((el) => el.value === null);
    }
    $: activeTab, reset();

    function reset() {
        showResults = false;
        initializeAnswersObj();
    }

    function initializeAnswersObj() {
        answers = {};

        activeWords.forEach((item) => {
            answers = {
                [item.pos]: {
                    value: null,
                    recognition: item.value,
                },
                ...answers,
            };
        });
    }

    function initializeActiveWord() {
        activeWord = activeWords[0];
    }

    function navigate(where) {
        if (where === "prev") {
            if (activeWord.pos !== 1) {
                activeWord = activeWords.find(
                    (word) => word.pos === activeWord.pos - 1
                );
            }
        }

        if (where === "next") {
            if (activeWord.pos !== 3) {
                activeWord = activeWords.find(
                    (word) => word.pos === activeWord.pos + 1
                );
            }
        }
    }

    function handleQuizAnswerClick(pos, value, text) {
        answers[pos] = {
            value,
            recognition: text,
        };
    }

    function submit(e) {
        e.preventDefault();

        correctAnswers = Object.keys(answers)
            .map((item) => answers[item])
            .reduce((acc, currVal) => acc + currVal.value, 0);

        showResults = true;
    }
</script>

<style>
    .accent-and-pronounce {
        height: 85%;
    }

    .accent-and-pronounce-actions {
        margin-top: 10%;
        margin-left: 8%;
    }

    .content {
        height: 500px;
        margin-top: 5%;
    }

    .navigation {
        /* background-color: white; */
        background-color: transparent;
        /* color: grey; */
        height: 100%;
        text-align: center;
        cursor: pointer;
        transition: box-shadow .3s;
    }

    .container {
        height: 100%;
    }

    .navigation:hover {
        /* background-color: rgb(235, 235, 235);
        color: black; */
        box-shadow: 0 0 11px black;
    }

    .content .navigation i {
        font-size: 50px;
    }

    .quiz-answer:hover {
        background-color: #007bff;
        color: white;
        border-radius: 5px;
        cursor: pointer;
    }
    .quiz-answer-dark:hover {
        background-color: #f8f9fa;
        color: black;
        border-radius: 5px;
        cursor: pointer;
    }
    .quiz-answer-light2:hover {
        background-color: #868e96;
        color: white;
        border-radius: 5px;
        cursor: pointer;
    }

    .submit-btn {
        margin-top: 30px;
    }

    li {
        cursor: pointer;
    }

    .quiz-info {
        color: red;
    }
    /* .list-grp-dark {
        background-color: #1d3040;
    } */
    /* .list-grp-light2 {
        background-color: #114B5F;
    } */
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

<div class="accent-and-pronounce">
    <div class="row">
        <div class="col-4">
            <div class="accent-and-pronounce-actions">
                <ul class="list-group list-group-flush">
                    {#each options as option (option)}
                        <li
                            class="list-group-item list-group-item-action" class:list-grp-dark={$darkTheme2} class:list-grp-light2={$lightTheme2}
                            class:active={activeTab === option.tabIndex}
                            on:click={() => (activeTab = option.tabIndex)}>
                            <span><i class={option.iconClass} /></span>
                            <span>{option.displayText}</span>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
        <div class="col-8">
            <div class="content">
                {#if showResults}
                    <div class="row">
                        <div class="col">
                            <div class="jumbotron">
                                <h1 class="display-7" style="color:black;">
                                    Честитки,
                                    {$userStore}
                                </h1>
                                <p class="lead" style="color:black;">
                                    Одговоривте точно на
                                    <span
                                        class="quiz-info">{correctAnswers}</span>
                                    прашања од
                                    <span class="quiz-info">3</span>
                                </p>

                                <hr class="my-4" />

                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Збор</th>
                                            <th scope="col">Решение</th>
                                            <th scope="col">Одговор</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {#each activeWords as word, i (word)}
                                            <tr>
                                                <th scope="row">{i + 1}</th>
                                                <td>{word.display}</td>
                                                <td>
                                                    {word.options.filter((item) => item.value === true)[0].text}
                                                </td>
                                                <td>
                                                    {answers[word.pos].recognition}
                                                </td>
                                            </tr>
                                        {/each}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="w-100" />
                        <div class="col">
                            <button
                                class="btn btn-primary" class:btn-light={$darkTheme2} class:btn-secondary={$lightTheme2}
                                type="button"
                                on:click={reset}><i class="fas fa-redo" />
                                &nbsp;Започни одново</button>
                        </div>
                    </div>
                {:else}
                    <div class="row" style="height: inherit">
                        <div class="col-2">
                            <div
                                class="navigation"
                                on:click={() => navigate('prev')}>
                                <div class="container">
                                    <i class="fas fa-caret-left" />
                                </div>
                            </div>
                        </div>
                        <div class="col-8">
                            <div class="container">
                                <div class="row">
                                    <div class="col">
                                        <div class="container">
                                            <h1 class="display-2">
                                                {activeWord.display}
                                            </h1>
                                        </div>
                                    </div>
                                    <div class="w-100" />
                                    <div class="col">
                                        <div
                                            class="container"
                                            style="margin-top: 3%">
                                            <div class="row">
                                                {#each activeWord.options as option (option)}
                                                    <div
                                                        class="col"
                                                        style="text-align: center;">
                                                        <p
                                                            style={answers[activeWord.pos].recognition === option.text && answers[activeWord.pos].value !== null ? 'background-color: #007bff; border-radius: 5px; color: white; cursor: pointer;' : ''}
                                                            class:quiz-answer={$lightTheme} class:quiz-answer-dark={$darkTheme2} class:quiz-answer-light2={$lightTheme2}
                                                            on:click={() => handleQuizAnswerClick(activeWord.pos, option.value, option.text)}>
                                                            {option.text.toUpperCase()}
                                                        </p>
                                                    </div>
                                                {/each}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-100" />
                                    <div class="col">
                                        <div class="container">
                                            <button
                                                disabled={disableButton}
                                                on:click={(e) => submit(e)}
                                                class="btn btn-primary submit-btn" class:btn-light={$darkTheme2} class:btn-secondary={$lightTheme2}
                                                type="button">Внеси</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div
                                class="navigation"
                                on:click={() => navigate('next')}>
                                <div class="container">
                                    <i class="fas fa-caret-right" />                                  
                                </div>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>
