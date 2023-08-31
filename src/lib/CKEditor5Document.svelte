<svelte:options customElement={{tag: 'ckeditor5-document',shadow: 'none'}}/>

<script>
    import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
    import ImageUploadAdapter from './CKEditor5ImageUploadAdapter.ts';
    import './CKEditor5Translations.ts';

    export let insertImageServiceUrl = '';
    export let getImageServiceUrl = '';
    export let items = ['bold', 'italic', 'strikethrough', 'underline', 'fontColor', 'fontBackgroundColor', 'fontFamily', 'fontSize', '|', 'numberedList', 'bulletedList', '|', 'outdent', 'indent', 'blockQuote', '|', 'link', '|', 'uploadImage', 'insertTable', '|', 'undo', 'redo'];
    export let value = '';
    export let placeHolder = '';
    export let lang = 'en';
    export let change = (evt, data) => {
    };
    export let ready = (evt, data) => {
    };
    export let editor = null;
    let editorElement;
    let toolbarElement;

    function ImageUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new ImageUploadAdapter(loader, insertImageServiceUrl, getImageServiceUrl);
        };
    }

    function getCursor(writer, root) {
        const range = writer.createRangeIn(root);
        for (const value of range.getWalker()) {
            const node = value.item;
            if (node.is('$textProxy') && node.data != '' && node.data.includes('||msg||')) {
                return node;
            }
        }
        return null;
    }

    export function setCursorPositionAtPlaceholder(placeholder) {
        if (editor == null) {
            return;
        }
        editor.focus();
        editor.model.change(writer => {
            const cursor = getCursor(writer, editor.model.document.getRoot());
            if (cursor != null) {
                writer.setSelection(writer.createPositionBefore(cursor));
                writer.remove(cursor);
                const texts = cursor.data.split(placeholder);
                writer.insertText(texts[0], editor.model.document.selection.getFirstPosition());
                const position = editor.model.document.selection.getFirstPosition();
                writer.insertText(texts[1], editor.model.document.selection.getFirstPosition());
                writer.setSelection(position);
            }
        });
    }

    export function setCursorPosition(jsonString) {
        if (editor == null) {
            return;
        }
        editor.focus();
        editor.model.change(writer => {
            let jsonObject = JSON.parse(jsonString);
            if (jsonObject.root == null || jsonObject.path == null || jsonObject.stickiness == null) {
                return;
            }
            let root = editor.model.document.getRoot(jsonObject.root);
            if (root == null) {
                return;
            }
            writer.setSelection(writer.createPositionFromPath(root, jsonObject.path, jsonObject.stickiness));
        });
    }

    DecoupledEditor
        .create(value, {
            placeholder: placeHolder,
            toolbar: items,
            extraPlugins: [ImageUploadAdapterPlugin],
            language: {
                ui: lang
            }
        })
        .then(newEditor => {
            editor = newEditor;
            toolbarElement.appendChild(editor.ui.view.toolbar.element);
            editorElement.appendChild(newEditor.ui.view.editable.element);
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

<div bind:this={toolbarElement}/>
<div bind:this={editorElement}/>
