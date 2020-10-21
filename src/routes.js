import Home from "./Home.svelte";
import Activities from "./Activities.svelte";
import ReadAndWrite from "./activities/ReadAndWrite.svelte";
import AccentAndPronounce from "./activities/AccentAndPronounce.svelte";
import GrammaticsAndVocabulary from "./activities/grammaticsAndVocabulary.svelte";
import ListenAndWatch from "./activities/listenAndWatch.svelte";

export const routes = {
    "/": Home,
    
    "/activities": Activities,
    "/activities/readAndWrite": ReadAndWrite,
    "/activities/accentAndPronounce": AccentAndPronounce,
    "/activities/grammaticsAndVocabulary": GrammaticsAndVocabulary,
    "/activities/listenAndWatch": ListenAndWatch
}