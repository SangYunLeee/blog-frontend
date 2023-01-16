import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import css from './TextEditor.module.scss';
const TextEditor = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const log = () => {
    if (editorRef.current) {
      //콘솔로 띄워줌
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <div className={css.container}>
      <Editor
        tinymceScriptSrc={
          process.env.REACT_APP_PUBLIC_URL + '/tinymce/tinymce.min.js'
        }
        onInit={(evt, editor) => (editorRef.current = editor)}
        // initialValue="<p></p>"
        init={{
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
      <button onClick={log}>버튼</button>
    </div>
  );
};
export default TextEditor;
