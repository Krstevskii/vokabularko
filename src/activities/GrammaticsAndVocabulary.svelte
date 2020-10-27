<script>
    import data from "./static/grammaticsAndVocabulary";
    import { userStore } from "../store";

    const options = [
        {
            tabIndex: 1,
            displayText: "Општо",
            iconClass: "fas fa-bell",
        },
        { tabIndex: 2, displayText: "Животни", iconClass: "fas fa-paw" },
    ];

    let activeTab = 1;

    let activePhoto = {};
    let answers = {};
    let disableButton = true;
    let correctAnswers = 0;
    let showResults = false;

    $: activePhotoSet = activeTab === 1 ? data.general : data.animals;
    $: activePhotoSet, initializeActivePhoto(), initializeAnswersObj();
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

    function initializeActivePhoto() {
        activePhoto = activePhotoSet[0];
    }

    function initializeAnswersObj() {
        answers = {};
        activePhotoSet.forEach((item) => {
            answers = {
                [item.pos]: {
                    value: null,
                    recognition: item.value,
                },
                ...answers,
            };
        });
    }

    function navigate(where) {
        if (where === "prev") {
            if (activePhoto.pos !== 1) {
                activePhoto = activePhotoSet.find(
                    (photo) => photo.pos === activePhoto.pos - 1
                );
            }
        }

        if (where === "next") {
            if (activePhoto.pos !== 3) {
                activePhoto = activePhotoSet.find(
                    (photo) => photo.pos === activePhoto.pos + 1
                );
            }
        }
    }

    function handleQuizAnswerClick(pos, answer, recognition) {
        answers[pos] = {
            value: answer,
            recognition,
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
    .grammatics-and-vocabulary {
        height: 85%;
    }

    .grammatics-vocabulary-actions {
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

    .navigation:hover {
        background-color: rgb(235, 235, 235);
        color: black;
    }

    .content .navigation i {
        font-size: 50px;
    }

    img {
        height: 380px;
    }

    .quiz-option {
        padding: 10%;
    }

    .quiz-option:hover {
        background-color: #007bff;
        border-radius: 5px;
        color: white;
        cursor: pointer;
    }

    .quiz-info {
        color: red;
    }
    .submit-btn {
        margin-top: 30px;
    }

    .list-group-item {
        cursor: pointer;
    }
</style>

<div class="grammatics-and-vocabulary">
    <div class="row">
        <div class="col-4">
            <div class="grammatics-vocabulary-actions">
                <ul class="list-group list-group-flush">
                    {#each options as option (option)}
                        <li
                            class="list-group-item"
                            class:active={activeTab == option.tabIndex}
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
                                            <th scope="col">Решение</th>
                                            <th scope="col">Одговор</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {#each activePhotoSet as photo, i (photo)}
                                            <tr>
                                                <th scope="row">{i + 1}</th>
                                                <td>
                                                    {photo.options.filter((item) => item.true === 1)[0].value}
                                                </td>
                                                <td>
                                                    {answers[photo.pos].recognition}
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
                    <div class="row" style="height: inherit;">
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
                            <div class="row">
                                <div class="col">
                                    <div class="container">
                                        <img
                                            class="quiz-img"
                                            src={activePhoto.url}
                                            alt={activePhoto.name} />
                                    </div>
                                    <div class="w-100" />
                                    <div class="col" style="margin-top: 3%;">
                                        <div class="row">
                                            {#each activePhoto.options as option (option)}
                                                <div
                                                    on:click={() => handleQuizAnswerClick(activePhoto.pos, option.true, option.value)}
                                                    class="col"
                                                    style="text-align: center">
                                                    <span
                                                        class="quiz-option"
                                                        style={answers[activePhoto.pos].recognition === option.value && answers[activePhoto.pos].value !== null ? 'background-color: #007bff; border-radius: 5px; color: white; cursor: pointer;' : ''}>{option.value}</span>
                                                </div>
                                            {/each}
                                        </div>
                                    </div>
                                    <div class="w-100" />
                                    <div class="col">
                                        <div class="container">
                                            <button
                                                on:click={(e) => submit(e)}
                                                disabled={disableButton}
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
