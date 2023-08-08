<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

    export let value = '';
    let element;

    ClassicEditor
        .create(value)
        .then(newEditor => {
            element.appendChild(newEditor.ui.element);
            newEditor.model.document.on('change:data', () => {
                value = newEditor.getData();
                console.log(value);
            })
        })
        .catch(err => {
            console.error(err.stack);
        });
</script>

<div bind:this={element}/>