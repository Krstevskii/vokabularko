<script>
    import { location, push, link } from "svelte-spa-router";
    import active from "svelte-spa-router/active";

    import { isUserLoggedIn, userStore } from "./store";
    import { removeStoredUser } from "./logging";
    import { darkTheme } from "./store";

    let currentLocation;

    function toggle() {
        window.document.body.classList.toggle("dark-mode");
        $darkTheme = !$darkTheme;
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
    }
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
    :global(body.dark-mode) button {
        background-color: #0084f6;
        color: white;
    }
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
                        use:active={{ path: '/', className: 'active' }}>Дома</a>
                </li>
                {#if $isUserLoggedIn}
                    <li class="nav-item">
                        <a
                            class="nav-link"
                            href="/activities"
                            use:link
                            use:active={{ path: '/activities.*', className: 'active' }}>Активности</a>
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
                <button class="btn btn-light" on:click={toggle}>
                    {#if $darkTheme}
                        <span><i
                                class="fas fa-palette" /></span>&nbsp;<span>Светло</span>
                    {:else}
                        <span><i
                                class="fas fa-palette" /></span>&nbsp;<span>Темно</span>
                    {/if}
                </button>
                <i class="fas fa-info-circle" />
                {#if $isUserLoggedIn}
                    <button
                        style="margin-left: 20px;"
                        type="button"
                        class="btn btn-light"
                        on:click={logOut}>Log out</button>
                {/if}
                <!-- </a> -->
            </div>
        </div>
    </div>
</nav>
