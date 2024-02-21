<svelte:options customElement={{tag: 'switchable-editor'}} />

<script lang="ts">
    import CKEditor from '../CKEditor5Classic/CKEditor5Classic.svelte'
    import Buttons from "../SwitchableEditor/Buttons.svelte";

    export let value = '';
    export let buttons: any[] = [];
    export let html = true;

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
    <Buttons on:html={handleHtml} on:plain={handlePlain} bind:buttons/>
</main>