import React, { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Delta from 'quill-delta';

interface TextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<ReactQuill>(null);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
      ]
    },
    clipboard: {
      matchers: [
        ['div', (node: HTMLElement, delta: typeof Delta) => {
          return delta.compose(new Delta().retain(delta.length(), { 
            attributes: { 
              class: node.className,
              style: node.style.cssText
            }
          }));
        }],
        ['p', (node: HTMLElement, delta: typeof Delta) => {
          return delta.compose(new Delta().retain(delta.length(), {
            attributes: {
              style: node.style.cssText
            }
          }));
        }],
        ['span', (node: HTMLElement, delta: typeof Delta) => {
          return delta.compose(new Delta().retain(delta.length(), {
            attributes: {
              style: node.style.cssText
            }
          }));
        }]
      ]
    }
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'align',
    'blockquote', 'code-block',
    'list', 'bullet',
    'script',
    'indent',
    'link', 'image', 'video', 'div', 'span', 'section'
  ];

  

  return (
    <div className="text-editor-container">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="h-[500px]"
        placeholder="Начните писать здесь..."
      />
    </div>
  );
};



export default TextEditor;