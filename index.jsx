import "./styles.scss";

import { TextStyleKit } from "@tiptap/extension-text-style";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Columns,
  FilePlus,
  Grid,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Merge,
  Printer,
  Rows,
  Settings,
  Split,
  Strikethrough,
  Table as TableIcon,
  Underline,
} from "lucide-react";
import { useState } from "react";
import { PaginationPlus } from "tiptap-pagination-plus";

function PagesDemo() {
  const [error] = useState(null);

  const editor = useEditor({
    content: `
      <h1>Modern Document Editor</h1>
      <p>Welcome to your new aesthetic document editor. This editor supports advanced features like <strong>real-time pagination</strong> and <strong>table handling</strong>.</p>
      
      <table>
        <tbody>
          <tr>
            <th>Feature</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
          <tr>
            <td>Pagination</td>
            <td>Real-time A4 page breaks</td>
            <td>Active</td>
          </tr>
          <tr>
            <td>Tables</td>
            <td>Advanced table management</td>
            <td>Active</td>
          </tr>
        </tbody>
      </table>

      <h2>Key Features</h2>
      <ul>
        <li><strong>Beautiful Typography:</strong> Using the Inter font family.</li>
        <li><strong>Page Breaks:</strong> Automatic and manual page breaks.</li>
        <li><strong>Print Ready:</strong> High-quality print output.</li>
      </ul>
      <p>Feel free to edit this content and try the <em>Print Document</em> button in the toolbar!</p>
    `,
    extensions: [
      StarterKit,
      PaginationPlus.configure({
        pageHeight: 1123,
        pageWidth: 794,
        pageGap: 50,
        pageGapBorderSize: 1,
        pageGapBorderColor: "#e5e5e5",
        pageBreakBackground: "#f8fafc",
        headerLeft: "",
        headerRight: "",
        footerLeft: "",
        footerRight: "",
        marginTop: 40,
        marginBottom: 40,
        marginLeft: 50,
        marginRight: 50,
      }),
      TextStyleKit,
      Table.configure({
        resizable: false,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
  });

  const {
    isBoldActive,
    isHeading1Active,
    isHeading2Active,
    isHeading3Active,
    isItalicActive,
    isStrikeActive,
    isUnderlineActive,
    isTableActive,
  } = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => {
      return {
        isHeading1Active: currentEditor.isActive("heading", { level: 1 }),
        isHeading2Active: currentEditor.isActive("heading", { level: 2 }),
        isHeading3Active: currentEditor.isActive("heading", { level: 3 }),
        isBoldActive: currentEditor.isActive("bold"),
        isItalicActive: currentEditor.isActive("italic"),
        isUnderlineActive: currentEditor.isActive("underline"),
        isStrikeActive: currentEditor.isActive("strike"),
        isTableActive: currentEditor.isActive("table"),
      };
    },
  });

  if (!editor) return null;

  return (
    <>
      <div className="control-group no-print">
        <div className="toolbar-row">
          <div className="toolbar-main">
            <div className="button-group">
              <button
                data-active={isHeading1Active}
                className={isHeading1Active ? "is-active" : ""}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                title="Heading 1"
              >
                <Heading1 />
              </button>
              <button
                data-active={isHeading2Active}
                className={isHeading2Active ? "is-active" : ""}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                title="Heading 2"
              >
                <Heading2 />
              </button>
              <button
                data-active={isHeading3Active}
                className={isHeading3Active ? "is-active" : ""}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                title="Heading 3"
              >
                <Heading3 />
              </button>
            </div>

            <div className="button-group">
              <button
                data-active={isBoldActive}
                className={isBoldActive ? "is-active" : ""}
                onClick={() => editor.chain().focus().toggleBold().run()}
                title="Bold"
              >
                <Bold />
              </button>
              <button
                data-active={isItalicActive}
                className={isItalicActive ? "is-active" : ""}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                title="Italic"
              >
                <Italic />
              </button>
              <button
                data-active={isUnderlineActive}
                className={isUnderlineActive ? "is-active" : ""}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                title="Underline"
              >
                <Underline />
              </button>
              <button
                data-active={isStrikeActive}
                className={isStrikeActive ? "is-active" : ""}
                onClick={() => editor.chain().focus().toggleStrike().run()}
                title="Strike"
              >
                <Strikethrough />
              </button>
            </div>

            <div className="button-group">
              <button
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                    .run()
                }
                title="Insert Table"
              >
                <TableIcon />
              </button>
              {isTableActive && (
                <>
                  <button
                    onClick={() =>
                      editor.chain().focus().addColumnAfter().run()
                    }
                    title="Add Column"
                  >
                    <Columns />
                  </button>
                  <button
                    onClick={() => editor.chain().focus().deleteColumn().run()}
                    title="Delete Column"
                  >
                    <Columns style={{ opacity: 0.5 }} />
                  </button>
                  <button
                    onClick={() => editor.chain().focus().addRowAfter().run()}
                    title="Add Row"
                  >
                    <Rows />
                  </button>
                  <button
                    onClick={() => editor.chain().focus().deleteRow().run()}
                    title="Delete Row"
                  >
                    <Rows style={{ opacity: 0.5 }} />
                  </button>
                  <button
                    onClick={() => editor.chain().focus().deleteTable().run()}
                    title="Delete Table"
                    className="btn-danger"
                  >
                    <TableIcon style={{ color: "var(--red-500)" }} />
                  </button>
                </>
              )}
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={() => window.print()}
            title="Print Document"
          >
            <Printer style={{ marginRight: "6px" }} /> Print Document
          </button>
        </div>
      </div>
      <div className="editor-container">
        <EditorContent editor={editor} />
      </div>
    </>
  );
}

export default PagesDemo;
