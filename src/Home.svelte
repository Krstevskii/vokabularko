<script>
  import { text } from "svelte/internal";
  import App from "./App.svelte";
  let name = "";
</script>

<style>
  .inputName {
    margin: 0 auto;
    text-align: center;
    margin-top: 20%;
    opacity: 40rem;
  }
  .col {
    text-align: center;
  }
  .row {
      margin: 0 auto;
  }

  .container {
    margin: 50px auto;
  }
  .homeButtons {
    margin: auto;
  }

  .btn-group {
      margin: 0 auto;
  }
</style>

<div class="container">
  <div class="row">
    <div class="col"><img src="./logo.png" alt="Logo" width="75px" /></div>
    <div class="col">
      <h1>Вокабуларко</h1>
    </div>
    <div class="col">
      <span><i class="fas fa-question-circle" /></span>
      <p>Помош</p>
    </div>
  </div>
  <div class="inputName"><input bind:value={name} placeholder='Внеси го твоето име' type="text" /></div>
  <div class="homeButtons">
    <div class="row">
      <div class="col-2" />
      <div class="col-8">
        <div
          class="btn-toolbar justify-content-between"
          role="toolbar"
          aria-label="Toolbar with button groups">
          <div class="btn-group" role="group" aria-label="First group">
            <button type="button" class="btn btn-primary-outline">1</button>
            <button type="button" class="btn btn-primary-outline">2</button>
            <button type="button" class="btn btn-primary-outline">3</button>
            <button type="button" class="btn btn-primary-outline">4</button>
          </div>
        </div>
      </div>
      <div class="col-2" />
    </div>
  </div>
</div>
