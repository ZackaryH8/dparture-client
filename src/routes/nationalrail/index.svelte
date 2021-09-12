<script context="module" lang="ts">
    export async function preload(page, session) {
        const { slug } = page.params;
        const res = await this.fetch(`nationalrail/${slug}.json`);
        const data = await res.json();
        return { data };
    }
</script>

<script lang="ts">
    export let data;
</script>

<style>
</style>

<svelte:head>
    <title></title>
</svelte:head>

<h1>Recent posts</h1>

<p>{data}</p>
