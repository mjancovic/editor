<svelte:options customElement={{tag: 'ckeditor5-classic',shadow: 'none'}}/>

<script>
    import CKEditor5Classic from './CKEditor5Classic.ts';
    import ImageUploadAdapter from './CKEditor5ImageUploadAdapter.ts';

    export let insertImageServiceUrl = '';
    export let getImageServiceUrl = '';
    export let items = ['undo', 'redo', '|', 'heading', 'bold', 'italic', 'strikethrough', 'underline', 'fontColor', 'fontBackgroundColor', 'fontFamily', 'fontSize', '|', 'numberedList', 'bulletedList', '|', 'outdent', 'indent', 'blockQuote', '|', 'alignment', '|', 'link', 'imageUpload', 'mediaEmbed', 'horizontalLine', 'specialCharacters', 'code', 'codeBlock', 'insertTable', '|', 'style', '|', 'removeFormat', 'selectAll', '|', 'sourceEditing']
    export let allowHtmlSupport = false;
    export let value = '';
    export let placeHolder = '';
    export let lang = 'en';
    export let valueChange = (evt, data) => {
    };
    export let stateChange = (evt, data) => {
    };
    export let editor = null;
    let editorElement;

    function ImageUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new ImageUploadAdapter(loader, insertImageServiceUrl, getImageServiceUrl);
        };
    }

    function getCursor(placeholder, writer, root) {
        const range = writer.createRangeIn(root);
        for (const value of range.getWalker()) {
            const node = value.item;
            if (node.is('$textProxy') && node.data != '' && node.data.includes(placeholder)) {
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
            const cursor = getCursor(placeholder, writer, editor.model.document.getRoot());
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

    export function setCursorPositionFromJSONString(positionJSONString) {
        if (editor == null) {
            return;
        }
        editor.focus();
        editor.model.change(writer => {
            let positionJSONObject = JSON.parse(positionJSONString);
            if (positionJSONObject.root == null || positionJSONObject.path == null || positionJSONObject.stickiness == null) {
                return;
            }
            let root = editor.model.document.getRoot(positionJSONObject.root);
            if (root == null) {
                return;
            }
            writer.setSelection(writer.createPositionFromPath(root, positionJSONObject.path, positionJSONObject.stickiness));
        });
    }

    $: if (editor != null && editor.editing.view.document.getRoot( 'main' ).placeholder != placeHolder) {
        editor.editing.view.document.getRoot( 'main' ).placeholder = placeHolder;
    }

    CKEditor5Classic
        .create(value, {
            placeholder: placeHolder,
            toolbar: items,
            extraPlugins: [ImageUploadAdapterPlugin],
            htmlSupport: {
                allow: allowHtmlSupport ? [
                    {
                        name: /.*/,
                        attributes: true,
                        classes: true,
                        styles: true
                    }
                ] : []
            },
            language: {
                ui: lang
            }
        })
        .then(newEditor => {
            editor = newEditor;
            editorElement.appendChild(newEditor.ui.view.element);
            newEditor.model.document.on('change:data', (evt, batch) => {
                value = newEditor.getData();
                valueChange(evt, batch);
            });
            newEditor.on('change:state', (evt, name, value, oldValue) => {
                stateChange(evt, value);
            });
            stateChange(null, 'ready');
        })
        .catch(err => {
            console.error(err.stack);
        });
</script>

<div bind:this={editorElement}/>
