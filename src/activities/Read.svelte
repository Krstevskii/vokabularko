<script>
    export let title = "";
    export let content = "";
    export let doRead;
    import { popOverTxt } from "../store";

    $popOverTxt = "Избери некој од понудените текстови или напиши свој."
</script>

<div class="read">
    <div class="container">
        <div class="row">
            <div class="col">
                <h1 class="display-2">{title}</h1>
            </div>
            <div class="w-100" />
            <div class="col">
                <p>{content}</p>
            </div>
            <div class="w-100"></div>
            <div class="col">
            <button class="btn btn-primary" style="padding-left: 15px;" on:click={() => doRead = false}><span><i class="fas fa-chevron-left"></i></span>&nbsp;<span>Назад</span></button>
        </div>
        </div>
    </div>
</div>
