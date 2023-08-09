<script>
    import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

    export let value = '';
    let editorElement;
    let toolbarElement;

    DecoupledEditor
        .create(value , {
            toolbar: ['bold', 'italic', 'strikethrough', 'underline', 'fontColor', 'fontBackgroundColor', 'fontFamily', 'fontSize', '|', 'numberedList', 'bulletedList', '|', 'outdent', 'indent', 'blockQuote', '|', 'link', '|', 'uploadImage', 'imageUpload', 'insertTable', '|', 'undo', 'redo']
        })
        .then(newEditor => {
            toolbarElement.appendChild(newEditor.ui.view.toolbar.element);
            editorElement.appendChild(newEditor.ui.view.editable.element);
            newEditor.model.document.on('change:data', () => {
                value = newEditor.getData();
            })
        })
        .catch(err => {
            console.error(err.stack);
        });
</script>

<div bind:this={toolbarElement}/>
<div bind:this={editorElement}/>