<svelte:options customElement={{tag: 'switchable-editor',shadow: 'none'}} />

<script lang="ts">
    import CKEditor from './lib/CKEditor.svelte'
    import Buttons from "./lib/Buttons.svelte";

    export let value = '';
    let html = true;

    function handleHtml() {
        if (html) return;
        html = true;
    }

    function handlePlain() {
        if (!html) return;
        value = value.replace(/<[^>]*>?/gm, '');
        html = false;
    }
</script>

<main>
    <div class="Editor">
        {#if html}
            <CKEditor bind:value/>
        {:else}
            <textarea bind:value/>
        {/if}
    </div>
    <Buttons on:html={handleHtml} on:plain={handlePlain}/>
</main>