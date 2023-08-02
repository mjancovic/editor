<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function onHtml() {
        dispatch('html', {});
    }
    function onPlain() {
        dispatch('plain', {});
    }
</script>

<button class="HTMLEditor" on:click={onHtml}>HTML</button>
<button class="PlainEditor" on:click={onPlain}>Plain</button>