<script>
    const tabIndex = Object.freeze({
        read: 1,
        write: 2,
        myTexts: 3,
    });
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
</style>

<div class="read-and-write">
    <div class="row">
        <div class="col-4">
            <div class="container">
                <ul class="list-group">
                    <li class="list-group-item">Прочитај</li>
                    <li class="list-group-item">Напиши</li>
                    <li class="list-group-item">Мои текстови</li>
                </ul>
            </div>
        </div>
        <div class="col-8">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="container">
                            <h1 class="display-6">Наслов</h1>
                        </div>
                    </div>
                    <div class="w-100" style="height: 2%" />
                    <div class="col">
                        <div class="form-group">
                            <textarea
                                class="form-control"
                                id="write"
                                rows="20"
                                cols="50" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
