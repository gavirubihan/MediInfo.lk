'use client';

import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Heading from '@tiptap/extension-heading';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  Strikethrough, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Image as ImageIcon,
  Quote,
  Undo,
  Redo
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // We configure it manually below
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-xl max-w-full my-4 shadow-sm border border-light-gray',
        },
      }),
      Placeholder.configure({
        placeholder: 'Start writing your amazing article here...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none min-h-[400px] py-4',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt('URL of the image:');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({ 
    onClick, 
    isActive, 
    disabled, 
    children, 
    title 
  }: { 
    onClick: () => void; 
    isActive?: boolean; 
    disabled?: boolean; 
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-lg flex items-center justify-center transition-all ${
        isActive 
          ? 'bg-blue text-white shadow-sm shadow-blue/20' 
          : 'text-dark-gray hover:bg-off-white hover:text-near-black'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-col h-full relative">
      {/* Sticky Toolbar */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-light-gray/60 p-2 flex items-center gap-1 flex-wrap rounded-t-[24px]">
        <div className="flex items-center gap-1 border-r border-light-gray pr-2 mr-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive('heading', { level: 1 })}
            title="Heading 1"
          >
            <Heading1 size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            title="Heading 2"
          >
            <Heading2 size={18} />
          </ToolbarButton>
        </div>

        <div className="flex items-center gap-1 border-r border-light-gray pr-2 mr-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Bold"
          >
            <Bold size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italic"
          >
            <Italic size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title="Underline"
          >
            <UnderlineIcon size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </ToolbarButton>
        </div>

        <div className="flex items-center gap-1 border-r border-light-gray pr-2 mr-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <List size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="Numbered List"
          >
            <ListOrdered size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            title="Blockquote"
          >
            <Quote size={18} />
          </ToolbarButton>
        </div>

        <div className="flex items-center gap-1 border-r border-light-gray pr-2 mr-1">
          <ToolbarButton onClick={addImage} title="Insert Image">
            <ImageIcon size={18} />
          </ToolbarButton>
        </div>

        <div className="flex items-center gap-1 ml-auto">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            title="Undo"
          >
            <Undo size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            title="Redo"
          >
            <Redo size={18} />
          </ToolbarButton>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 p-6 sm:p-10 bg-white rounded-b-[24px]">
        <EditorContent editor={editor} />
      </div>

      {/* Custom Styles for Tiptap */}
      <style dangerouslySetInnerHTML={{__html: `
        .ProseMirror p.is-editor-empty:first-child::before {
          color: #adb5bd;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        .ProseMirror h1 { font-size: 2.25rem; font-weight: 800; line-height: 1.2; margin-bottom: 1rem; color: #1f2937; }
        .ProseMirror h2 { font-size: 1.875rem; font-weight: 700; line-height: 1.3; margin-top: 2rem; margin-bottom: 1rem; color: #1f2937; }
        .ProseMirror p { margin-bottom: 1.25rem; line-height: 1.7; color: #4b5563; }
        .ProseMirror ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; color: #4b5563; }
        .ProseMirror ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.25rem; color: #4b5563; }
        .ProseMirror blockquote { border-left: 4px solid #1a6fbf; padding-left: 1rem; font-style: italic; color: #6b7280; background: #f7f9fc; padding: 1rem; border-radius: 0 0.5rem 0.5rem 0; margin-bottom: 1.25rem; }
        .ProseMirror a { color: #1a6fbf; text-decoration: underline; cursor: pointer; }
        .ProseMirror img { max-width: 100%; height: auto; display: block; border-radius: 0.75rem; margin: 1.5rem 0; }
      `}} />
    </div>
  );
}
