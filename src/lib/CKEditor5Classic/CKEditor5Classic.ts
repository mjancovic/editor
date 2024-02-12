import {ClassicEditor} from '@ckeditor/ckeditor5-editor-classic';
import {Alignment} from '@ckeditor/ckeditor5-alignment';
import {Autoformat} from '@ckeditor/ckeditor5-autoformat';
import {Bold, Code, Italic, Strikethrough, Underline} from '@ckeditor/ckeditor5-basic-styles';
import {BlockQuote} from '@ckeditor/ckeditor5-block-quote';
import {Essentials} from '@ckeditor/ckeditor5-essentials';
import {Heading} from '@ckeditor/ckeditor5-heading';
import {Image, ImageCaption, ImageResize, ImageStyle, ImageToolbar, ImageUpload} from '@ckeditor/ckeditor5-image';
import {Indent, IndentBlock} from '@ckeditor/ckeditor5-indent';
import {AutoLink, Link} from '@ckeditor/ckeditor5-link';
import {List, ListProperties} from '@ckeditor/ckeditor5-list';
import {Paragraph} from '@ckeditor/ckeditor5-paragraph';
import {Table, TableToolbar} from '@ckeditor/ckeditor5-table';
import {SourceEditing} from '@ckeditor/ckeditor5-source-editing';
import {GeneralHtmlSupport} from '@ckeditor/ckeditor5-html-support';
import {Font} from '@ckeditor/ckeditor5-font';
import {Style} from '@ckeditor/ckeditor5-style';
import {CodeBlock} from '@ckeditor/ckeditor5-code-block';
import {HorizontalLine} from '@ckeditor/ckeditor5-horizontal-line';
import {RemoveFormat} from '@ckeditor/ckeditor5-remove-format';
import {SpecialCharacters, SpecialCharactersEssentials} from '@ckeditor/ckeditor5-special-characters';
import {MediaEmbed} from '@ckeditor/ckeditor5-media-embed';
import {UploadAdapter} from '@ckeditor/ckeditor5-adapter-ckfinder';

export default class CKEditor5Classic extends ClassicEditor {
    public static override builtinPlugins = [
        Heading,
        Alignment,
        Autoformat,
        BlockQuote,
        Bold,
        Essentials,
        Image,
        ImageCaption,
        ImageResize,
        ImageStyle,
        ImageToolbar,
        ImageUpload,
        Indent,
        IndentBlock,
        Italic,
        Link,
        AutoLink,
        List,
        ListProperties,
        Paragraph,
        Table,
        TableToolbar,
        SourceEditing,
        GeneralHtmlSupport,
        Font,
        Strikethrough,
        Underline,
        Code,
        Style,
        CodeBlock,
        HorizontalLine,
        RemoveFormat,
        SpecialCharacters,
        SpecialCharactersEssentials,
        MediaEmbed,
        UploadAdapter
    ];

    public static override defaultConfig = {
        toolbar: {
            items: [
                'undo',
                'redo',
                '|',
                'heading',
                'bold',
                'italic',
                'strikethrough',
                'underline',
                'fontColor',
                'fontBackgroundColor',
                'fontFamily',
                'fontSize',
                '|',
                'numberedList',
                'bulletedList',
                '|',
                'outdent',
                'indent',
                'blockQuote',
                '|',
                'alignment',
                '|',
                'link',
                'imageUpload',
                'mediaEmbed',
                'horizontalLine',
                'specialCharacters',
                'code',
                'codeBlock',
                'insertTable',
                '|',
                'style',
                '|',
                'removeFormat',
                'selectAll',
                '|',
                'sourceEditing'
            ]
        },
        style: {
            definitions: [
                {
                    name: 'Source code',
                    element: 'pre',
                    classes: ['SourceCode']
                },
                {
                    name: 'Error',
                    element: 'p',
                    classes: ['Error']
                },
                {
                    name: 'Path',
                    element: 'p',
                    classes: ['Path']
                }
            ]
        },
        codeBlock: {
            languages: [
                {language: 'plaintext', label: 'Plain text'},
                {language: 'html', label: 'HTML'},
                {language: 'javascript', label: 'JavaScript'},
                {language: 'php', label: 'PHP'},
                {language: 'css', label: 'CSS'}
            ]
        },
        heading: {
            options: [
                {model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph'},
                {model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1'},
                {model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2'},
                {model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3'}
            ]
        },
        image: {
            resizeOptions: [
                {
                    name: 'resizeImage:25',
                    value: '25',
                    icon: 'small'
                },
                {
                    name: 'resizeImage:50',
                    value: '50',
                    icon: 'medium'
                },
                {
                    name: 'resizeImage:75',
                    value: '75',
                    icon: 'large'
                },
                {
                    name: 'resizeImage:original',
                    value: null,
                    icon: 'original'
                },
            ],
            toolbar: ['toggleImageCaption', 'imageTextAlternative', '|', 'imageStyle:inline', 'imageStyle:block', 'imageStyle:side', '|', 'imageStyle:wrapText', 'imageStyle:breakText', '|', 'resizeImage:25', 'resizeImage:50', 'resizeImage:75', 'resizeImage:original']
        },
        language: 'en'
    };
}