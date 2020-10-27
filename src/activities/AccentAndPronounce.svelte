<script>
    import data from "./static/accentAndPronounce";
    import { userStore } from "../store";

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
        background-color: white;
        color: grey;
        height: 100%;
        text-align: center;
        cursor: pointer;
    }

    .container {
        height: 100%;
    }

    .navigation:hover {
        background-color: rgb(235, 235, 235);
        color: black;
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

    .submit-btn {
        margin-top: 30px;
    }

    li {
        cursor: pointer;
    }

    .quiz-info {
        color: red;
    }
</style>

<div class="accent-and-pronounce">
    <div class="row">
        <div class="col-4">
            <div class="accent-and-pronounce-actions">
                <ul class="list-group list-group-flush">
                    {#each options as option (option)}
                        <li
                            class="list-group-item"
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
                                <h1 class="display-7">
                                    Честитки,
                                    {$userStore}
                                </h1>
                                <p class="lead">
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
                                class="btn btn-primary"
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
                                                            class="quiz-answer"
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
                                                class="btn btn-primary submit-btn"
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
