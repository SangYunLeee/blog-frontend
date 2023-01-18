import React, { Dispatch, SetStateAction } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import css from './TextEditor.module.scss';

interface Props {
  setContent: Dispatch<SetStateAction<string>>;
}

const TextEditor = ({ setContent }: Props) => {
  function OnChangeHandler(inst: any) {
    setContent(inst.getBody().innerHTML);
  }

  return (
    <div className={css.container}>
      <Editor
        tinymceScriptSrc={
          process.env.REACT_APP_PUBLIC_URL + '/tinymce/tinymce.min.js'
        }
        id="flag"
        init={{
          setup: function (ed: any) {
            ed.on('keyup', function () {
              OnChangeHandler(ed);
            });
          },
          height: 980,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'preview',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }',
        }}
      />
    </div>
  );
};
export default TextEditor;
