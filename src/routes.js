import Home from "./Home.svelte";
import Activities from "./Activities.svelte";
import ReadAndWrite from "./activities/ReadAndWrite.svelte";

export const routes = {
    "/": Home,
    "/activities": Activities,
    "/activities/readAndWrite": ReadAndWrite
}