<script>
    import { location, push, link } from "svelte-spa-router";
    import active from "svelte-spa-router/active";

    import { isUserLoggedIn, userStore } from "./store";
    import { removeStoredUser } from "./logging";
    import { darkTheme } from "./store";
    import { darkTheme2 } from "./store";
    import { lightTheme } from "./store";
    import { lightTheme2 } from "./store";
    import jQuery from "jquery"
    import { popOverTxt } from "./store";

    // $popOverTxt = "Добредојде во „Вокабуларко“, избери некоја од понудените категории за да прдолжиш."
    let currentLocation;
    let lastToggle = null;
    
    function initTheme(){
        $darkTheme2 = false;
        $lightTheme = true;
        $lightTheme2 = false;
    }
    function toggle() {
        window.document.body.classList.toggle("dark-mode");
        $darkTheme = !$darkTheme;
    }
    function toggle2(lastToggle){
        window.document.body.classList.toggle(lastToggle);
    }
    function resetThemeState(){
        $darkTheme2 = false;
        $lightTheme = false;
        $lightTheme2 = false;
    }
    function setTheme(theme) {
        resetThemeState();
        if(theme == "dark"){
            $darkTheme2 = true;
            if(lastToggle!="dark-mode"){
                if(lastToggle!=null)
                    toggle2(lastToggle);
                toggle2("dark-mode");
                lastToggle = "dark-mode"
            }

        }
        else  if(theme == "light"){
            $lightTheme = true;
            if(lastToggle!=null){
                toggle2(lastToggle);
                lastToggle = null;
            }
        }
        else if(theme == "light2"){
            $lightTheme2 = true;
            if(lastToggle!="light-mode"){
                if(lastToggle!=null)
                    toggle2(lastToggle);
                toggle2("light-mode");
                lastToggle = "light-mode"
            }
        }
        else
            resetThemeState();
    }   

    $: {
        if ($location === "/activities" && !$isUserLoggedIn) {
            push("/");
        }
    }

    $: $location, updateLocation();

    function updateLocation() {
        currentLocation = $location;
    }

    function logOut() {
        $userStore = "";
        removeStoredUser();
        $popOverTxt = "Добредојде во „Вокабуларко“, внеси го твоето име за да продолжиш.";
    }
    jQuery(function () {
        // jQuery('[data-toggle="popover"]').popover()
        // jQuery('.popover-dismiss').popover({
        //     trigger: 'focus'
        // })
        jQuery('[data-toggle="popover"]').popover({
            trigger: 'focus'
        })
    })
    
    initTheme();
</script>

<style>
    .logo {
        width: 50px;
        height: 50px;
    }
    /* button {
		background-color: #f76027;
		color: white;
		border: none;
		border-radius: 3px;
		padding: 0.5rem;
		text-transform: uppercase;
		
	} */
    /* :global(body.dark-mode) button {
        background-color: #0084f6;
        color: white;
    } */
    :global(body) {
        background-color: #f2eee2;
        color: #0084f6;
        transition: background-color 0.3s;
    }
    :global(body.dark-mode) {
        background-color: #1d3040;
        /* background-color: #080705; */
        color: #bfc2c7;
    }
    :global(body.light-mode) {
        /* background-color: #815355; */
        /* background-color: #080705; */
        background-color: #114B5F;
        color: #bfc2c7;
    }
</style>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
        <img class="logo" src="logo.png" alt="logo" />
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon" />
        </button>

        <div
            class="collapse navbar-collapse"
            id="navbarSupportedContent"
            style="margin-left: 1%    ">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a
                        class="nav-link"
                        href="/"
                        use:link
                        use:active={{ path: '/', className: 'active' }}><i class="fas fa-home"></i>&nbsp;Дома</a>
                </li>
                {#if $isUserLoggedIn}
                    <li class="nav-item">
                        <a
                            class="nav-link"
                            href="/activities"
                            use:link
                            use:active={{ path: '/activities.*', className: 'active' }}><i class="fas fa-play"></i>&nbsp;Активности</a>
                    </li>
                {/if}
            </ul>
            <div class="form-inline my-2 my-lg-0">
                <!-- <a
                    tabindex="0"
                    class="btn btn-lg btn-danger"
                    role="button"
                    data-toggle="popover"
                    data-trigger="focus"
                    title="Dismissible popover"
                    data-content="And here's some amazing content. It's very engaging. Right?"> -->
                <div class="dropdown">
                    <button
                        class="btn btn-light dropdown-toggle"
                        type="button"
                        id="dropdownMenu2"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                        <span><i class="fas fa-palette" /></span>&nbsp;<span>Тема</span>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <button
                            class="dropdown-item"
                            type="button"
                            on:click={() => setTheme('light')}>Светла</button>
                        <button
                            class="dropdown-item"
                            type="button"
                            on:click={() => setTheme('dark')}>Темна</button>
                        <button
                            class="dropdown-item"
                            type="button"
                            on:click={() => setTheme('light2')}>Аква</button>
                    </div>
                </div>
                <!-- <button class="btn btn-light" on:click={toggle}>
                    {#if $darkTheme}
                        <span><i
                                class="fas fa-palette" /></span>&nbsp;<span>Светло</span>
                    {:else}
                        <span><i
                                class="fas fa-palette" /></span>&nbsp;<span>Темно</span>
                    {/if}
                </button> -->
                <button type="button" class="btn btn-light" data-toggle="popover" data-content={$popOverTxt}><span><i class="fas fa-info-circle" /></span>&nbsp;<span>Помош</span></button>
                {#if $isUserLoggedIn}
                    <button
                        style="margin-left: 20px;"
                        type="button"
                        class="btn btn-light"
                        on:click={logOut}><span><i class="fas fa-sign-out-alt"></i></span>&nbsp;<span>Одјави се</span></button>
                {/if}
                <!-- </a> -->
            </div>
        </div>
    </div>
</nav>
