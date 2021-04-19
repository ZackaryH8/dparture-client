<h3 style="color: {color};">{currentTime}</h3>


<script lang="ts">
    import { onMount } from 'svelte';
    let currentTime: string = new Date().toLocaleTimeString('en-GB');

    export let color = "#fff";

    onMount(() => {
        /* Update clock time*/
        const currentTimeInterval = setInterval(() => {
            currentTime = new Date().toLocaleTimeString('en-GB');
        }, 1000);

        return () => {
            clearInterval(currentTimeInterval);
        };
    });
</script>