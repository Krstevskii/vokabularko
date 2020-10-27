<script>
    // router
    import Router from "svelte-spa-router";
    import Navbar from "./Navbar.svelte";
    import Footer from "./Footer.svelte";
    import { routes } from "./routes";
</script>

<style>
</style>

<Navbar />
<Router {routes} />
<!-- <Footer /> -->
