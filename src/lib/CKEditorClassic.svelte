<svelte:options customElement={{tag: 'ckeditor-classic',shadow: 'none'}}/>

<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

    export let value = '';
    export let placeHolder = '';
    export let change = (evt, data) => {
    };
    export let ready = (evt, data) => {
    };
    export let editor = null;
    let element;

    ClassicEditor
        .create(value, {
            placeholder: placeHolder
        })
        .then(newEditor => {
            editor = newEditor;
            element.appendChild(newEditor.ui.element);
            newEditor.model.document.on('change:data', (evt, batch) => {
                value = newEditor.getData();
                change(evt, batch);
            });
            ready(null, null);
        })
        .catch(err => {
            console.error(err.stack);
        });
</script>

<div bind:this={element}/>