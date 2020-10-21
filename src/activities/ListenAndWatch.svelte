<script>
    import { push } from "svelte-spa-router";
    const tabIndex = Object.freeze({
        read: 1,
        write: 2,
        myTexts: 3,
    });
    let videos = [
        {
            title: "Звучни и безвучни согласки",
            link: "https://www.youtube.com/embed/gtdpugeC4BY",
            index: 0,
        },
        {
            title: "Главни членови во реченицата",
            link: "https://www.youtube.com/embed/oJj4RzyfGFw",
            index: 1,
        },
        {
            title: "Правопис",
            link: "https://www.youtube.com/embed/x0SYmY2Z5ug",
            index: 2,
        },
    ];
    let activeVid = 0;
    $: video = videos[activeVid];
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
        position: relative;
        width: 100%;
        height: 80%;
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
    .listen-watch-actions {
        margin-top: 10%;
        margin-left: 8%;
    }
    .row-btn {
        height: 1%;
        margin: 1% 33.2%;
    }
</style>

<div class="read-and-write">
    <div class="row-btn">
        <div class="col-4">
            <button
                type="button"
                class="btn btn-primary"
                on:click={() => push('/activities/')}><span><i
                        class="fas fa-chevron-left" /></span>&nbsp;<span>Назад</span></button>
        </div>
    </div>
    <div class="row">
        <div class="col-4">
            <div class="listen-watch-actions">
                <ul class="list-group list-group-flush">
                    {#each videos as video}
                        <li
                            class="list-group-item"
                            class:active={activeVid == video.index}
                            on:click={() => (activeVid = video.index)}>
                            <span><i class="fas fa-school" /></span>&nbsp;
                            <span>{video.title}</span>
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
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="container">
                            <h1 class="display-4">{video.title}</h1>
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
                        <iframe
                            title={video.title}
                            src={video.link}
                            class="vid" />
                        <!-- <div class="videoCont"><iframe title={video.title} src={video.link} class="vid"></iframe></div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
