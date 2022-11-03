import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './RichTextEditor.css';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'code-block'],
  ],
};

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
};

export const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  return (
    <ReactQuill
      theme='snow'
      modules={modules}
      placeholder='Add a note....'
      value={value}
      onChange={onChange}
      className='text-white'
    />
  );
};
