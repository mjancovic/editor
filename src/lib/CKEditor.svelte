<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

    export let value = '';

    ClassicEditor
        .create(value)
        .then(newEditor => {
            document.querySelector('#ckeditor').appendChild(newEditor.ui.element);
            newEditor.model.document.on('change:data', () => {
                value = newEditor.getData();
            })
        })
        .catch(err => {
            console.error(err.stack);
        });
</script>

<div id="ckeditor"/>