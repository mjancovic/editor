<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    export let buttons: any[]  = [];

    function onHtml() {
        dispatch('html', {});
    }
    function onPlain() {
        dispatch('plain', {});
    }
</script>

<div>
    <button class="HTMLEditor" on:click={onHtml}>HTML</button>
    <button class="PlainEditor" on:click={onPlain}>Plain</button>
    {#each buttons as button}
        <button class={button.style} title={button.text} on:click={button.handler}>{button.text}</button>
    {/each}
</div>