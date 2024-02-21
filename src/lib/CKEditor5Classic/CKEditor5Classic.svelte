<svelte:options customElement={{tag: 'ckeditor5-classic'}}/>

<script lang="ts">
    import CKEditor5Classic from './CKEditor5Classic.ts';
    import RootElement from '@ckeditor/ckeditor5-engine/src/model/rootelement';
    import Writer from '@ckeditor/ckeditor5-engine/src/model/writer';
    import RootEditableElement from '@ckeditor/ckeditor5-engine/src/view/rooteditableelement';
    import TextProxy from '@ckeditor/ckeditor5-engine/src/model/textproxy';
    import ImageUploadAdapter from './CKEditor5ImageUploadAdapter.ts';

    export let insertImageServiceUrl = '';
    export let getImageServiceUrl = '';
    export let items = ['undo', 'redo', '|', 'heading', 'bold', 'italic', 'strikethrough', 'underline', 'fontColor', 'fontBackgroundColor', 'fontFamily', 'fontSize', '|', 'numberedList', 'bulletedList', '|', 'outdent', 'indent', 'blockQuote', '|', 'alignment', '|', 'link', 'imageUpload', 'mediaEmbed', 'horizontalLine', 'specialCharacters', 'code', 'codeBlock', 'insertTable', '|', 'style', '|', 'removeFormat', 'selectAll', '|', 'sourceEditing']
    export let allowHtmlSupport = false;
    export let value = '';
    export let placeHolder = '';
    export let lang = 'en';
    export let valueChange = (evt: any, data: any) => {
    };
    export let stateChange = (evt: any, data: string) => {
    };
    export let editor: CKEditor5Classic | null = null;
    let editorElement: HTMLDivElement | null = null;

    function ImageUploadAdapterPlugin(editor: CKEditor5Classic): void {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new ImageUploadAdapter(loader, insertImageServiceUrl, getImageServiceUrl);
        };
    }

    function getCursor(placeholder: string, writer: Writer, root: RootElement): TextProxy | null {
        const range = writer.createRangeIn(root);
        for (const value of range.getWalker()) {
            const node = value.item;
            if (node.is('$textProxy') && node.data != '' && node.data.includes(placeholder)) {
                return node;
            }
        }
        return null;
    }

    export function setCursorPositionAtPlaceholder(placeholder: string): void {
        if (editor == null) {
            return;
        }
        editor.focus();
        editor.model.change(writer => {
            if (editor == null) {
                return;
            }
            let root: RootElement | null = editor.model.document.getRoot();
            if (root == null) {
                return;
            }
            const cursor = getCursor(placeholder, writer, root);
            if (cursor != null) {
                writer.setSelection(writer.createPositionBefore(cursor));
                writer.remove(cursor);
                const texts = cursor.data.split(placeholder);
                writer.insertText(texts[0], editor.model.document.selection.getFirstPosition() ?? undefined);
                const position = editor.model.document.selection.getFirstPosition();
                writer.insertText(texts[1], editor.model.document.selection.getFirstPosition() ?? undefined);
                writer.setSelection(position);
            }
        });
    }

    export function setCursorPositionFromJSONString(positionJSONString: string): void {
        if (editor == null) {
            return;
        }
        editor.focus();
        editor.model.change(writer => {
            if (editor == null) {
                return;
            }
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

    $: {let mainRootEditable: RootEditableElement | null;
        if (editor != null && (mainRootEditable = editor.editing.view.document.getRoot( 'main' )) != null && mainRootEditable.placeholder != placeHolder) {
            mainRootEditable.placeholder = placeHolder;
        }
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
            if (editorElement != null && newEditor.ui.view.element != null) {
                editorElement.appendChild(newEditor.ui.view.element);
            }
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
