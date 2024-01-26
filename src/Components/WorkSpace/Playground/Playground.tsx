import InputNavbar from "./PlaygrounNavbar";
import { debounce } from "lodash";
import Editor from "@monaco-editor/react";
import { useState, useRef, useEffect, useCallback } from "react";
import { FaJava } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
import axios from "axios";
import useLocalStorage from "../../Hooks/useLocalStorage";

type FileEntry = {
  name: string;
  language: string;
  value: string;
};
type Props = {};
type MyEditorType = {
  getValue: () => string;
  // Adjust the type according to your actual editor type
  // Other properties/methods of your editor
};

export type IsSettings = {
  fontSize: number;
  settingsModalIsOpen: boolean;
  dropDownIsOpen: boolean;
};

let files: { [key: string]: FileEntry } = {
  "script.js": {
    name: "script.js",
    language: "js",
    value: `console.log("Welcome to Code X");`,
  },
  "script.py": {
    name: "script.py",
    language: "py",
    value: `print("Welcome to Code X");`,
  },
  "main.c": {
    name: "main.c",
    language: "c",
    value: `#include<stdio.h>\nint main() {\n \tprintf("Welcome to Code X");\n return 0;\n }`,
  },
  "main.cpp": {
    name: "main.cpp",
    language: "cpp",
    value: `#include<iostream>\nusing namespace std;\nint main() {\n\tcout << "Welcome to Code X";\n return 0;\n}`,
  },
  "Main.java": {
    name: "Main.java",
    language: "java",
    value: `class Main{\npublic static void main(String[] args) {\n\tSystem.out.println("Welcome to Code X");\n\t}\n}`,
  },
};

// localStorage.setItem("filesJson", JSON.stringify(files));

let localFile: any;
if (!localStorage.getItem("filesJson")) {
  localStorage.setItem("filesJson", JSON.stringify(files));
  localFile = files;
}

localFile = JSON.parse(localStorage.getItem("filesJson") || "err");

let localFileName: string;
if (!localStorage.getItem("localFileName")) {
  localStorage.setItem("localFileName", "main.cpp");
  localFileName = "main.cpp";
}
localFileName = localStorage.getItem("localFileName") || "err";

function InputBox({}: Props) {
  const [fileName, setFileName] = useState(localFileName);
  const file = localFile[fileName];

  const [fontSize] = useLocalStorage("Remote-Code-Executor-FontSize", 16);
  const [inputVal, setInputVal] = useState("0");
  const editorRef = useRef<MyEditorType | null>(null);
  const [settings, setSettings] = useState<IsSettings>({
    fontSize: fontSize,
    settingsModalIsOpen: false,
    dropDownIsOpen: false,
  });

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
    code = localFile[fileName].value;
  };

  const getEditorValue = () => {
    const editorValue = editorRef.current?.getValue();
    return editorValue;
  };
  let code: string | undefined | null;

  // if (run === 1) {
  useEffect(() => {
    code = getEditorValue();
    localStorage.setItem("localFileName", fileName);
  }, [fileName]);

  const handleChange = () => {
    code = getEditorValue();
    localFile[fileName].value = code;

    localStorage.setItem("filesJson", JSON.stringify(localFile));
    console.log(localFile[fileName].value);
    let b: string;
    b = localStorage.getItem("filesJson") || "err";
    try {
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };
  const handler = useCallback(debounce(handleChange, 500), []);

  const fetch = async () => {
    const payload = {
      codeLang: file.language,
      code,
      inputValues: inputVal,
    };
    console.log(payload);
    try {
      const output = await axios.post("http://localhost:3000/code", payload);
      console.log(output.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // fetch();

  // setRun(0);

  return (
    <div className="flex  ">
      <div className="flex flex-col items-center gap-2 text-sm bg-slate-200">
        <button
          disabled={fileName === "main.cpp" ? true : false}
          onClick={() => {
            setFileName("main.cpp");
          }}
          className="border-2 m-[6px] size-10 disabled:border-green-700"
        >
          <img src="/cpp.png" alt="c++ logo" />
        </button>
        <button
          disabled={fileName === "main.c" ? true : false}
          onClick={() => {
            setFileName("main.c");
          }}
          className="border-2  m-[6px] size-10 disabled:border-green-700"
        >
          <img src="c.png" alt="c logo" />
        </button>
        <button
          disabled={fileName === "Main.java" ? true : false}
          onClick={() => {
            setFileName("Main.java");
          }}
          className="border-2 m-[6px] size-10 disabled:border-green-700"
        >
          <FaJava className="size-9 " />
        </button>
        <button
          disabled={fileName === "script.py" ? true : false}
          onClick={() => {
            setFileName("script.py");
          }}
          className="border-2  m-[6px] size-10 disabled:border-green-700"
        >
          <FaPython className="size-9" />
        </button>
        <button
          disabled={fileName === "script.js" ? true : false}
          onClick={() => {
            setFileName("script.js");
          }}
          className="border-2  m-[6px] size-10 disabled:border-green-700"
        >
          <img src="/javascript.png" alt="javascript logo" />
        </button>
      </div>
      <div className="w-[55vw] border-r-[10px] border-slate-200">
        <button onClick={fetch}>jnnnh</button>
        <InputNavbar
          language={fileName}
          fetchRun={fetch}
          settings={settings}
          setSettings={setSettings}
        />
        <Editor
          onChange={handler}
          height="calc(100vh - 114px)"
          theme="light"
          options={{
            minimap: {
              enabled: false,
            },
            fontSize: settings.fontSize,
            cursorStyle: "line",
            wordWrap: "on",
            scrollbar: {
              vertical: "hidden",
            },
            smoothScrolling: true,
          }}
          path={file.name}
          defaultLanguage={file.language}
          value={file.value}
          onMount={handleEditorMount}
        />
      </div>
    </div>
  );
}

export default InputBox;
