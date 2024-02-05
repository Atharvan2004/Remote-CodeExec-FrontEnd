/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { debounce, values } from "lodash";
import InputNavbar from "./PlaygrounNavbar";
import Editor from "@monaco-editor/react";
import { useState, useRef, useEffect, useCallback } from "react";
import { FaJava } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
import axios from "axios";
import {useLocalStorage} from "../../Hooks/useLocalStorage";
import { BASE_URL } from "../../../config";

type FileEntry = {
  name: string;
  language: string;
  value: string;
};

type MyEditorType = {
  getValue: () => string;
  // Adjust the type according to your actual editor type
  // Other properties/methods of your editor
};

type InputBoxProps = {
  onRunButtonClick: (newOutputValue: any) => void;
  input:string
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

if(!localStorage.getItem("codeFile")){
  localStorage.setItem("codeFile",JSON.stringify(files));
}

async function getCode(fileName:string) {
  const codeFile = JSON.parse(localStorage.getItem("codeFile")||"");
  return codeFile[fileName].value;
}
async function getCodeLang(fileName:string) {
  const codeFile = JSON.parse(localStorage.getItem("codeFile")||"");
  return codeFile[fileName].language;
}


export const InputBox: React.FC<InputBoxProps> =  ({ onRunButtonClick,input }) => {

  const [fontSize] = useLocalStorage("Remote-Code-Executor-FontSize", 16);
  const [settings, setSettings] = useState<IsSettings>({
    fontSize: fontSize,
    settingsModalIsOpen: false,
    dropDownIsOpen: false,
  });
  
  const fileName1 = (localStorage.getItem("fileName")?localStorage.getItem("fileName"):"main.cpp")||""
  const code1 = (localStorage.getItem("codeFile")?JSON.parse(localStorage.getItem("codeFile")||""):files)||""
  const [fileName,setFileName] = useState(fileName1);
  const [code,setCode] = useState(code1[fileName1].value);
  const [inputValue,setInputValue] = useState("0");

  async function handleEditorMount(){
    if(localStorage.getItem("fileName")) {
      setFileName(localStorage.getItem("fileName")||"");
      setCode(await getCode(localStorage.getItem("fileName")||""));
    }
    if(localStorage.getItem("codeFile")) {

      setCode(await getCode(localStorage.getItem("fileName")||files["main.cpp"].value));
    }
  }

  function handleEditorChange(value:string|undefined){
    const codeFile =JSON.parse(localStorage.getItem("codeFile")||"");
    codeFile[fileName].value = value;
    console.log(codeFile[fileName].value)
    localStorage.setItem("codeFile",JSON.stringify(codeFile));
    console.log(codeFile)
  }

  useEffect(()=>{
    localStorage.setItem("fileName",fileName);
    // setFileName(localStorage.getItem("fileName")||"");

    const fetchData = async () => {
      try {
        const codeValue = await getCode(localStorage.getItem("fileName")||files["main.cpp"].value);
        setCode(codeValue);
      } catch (error) {
        console.error("Error fetching code:", error);
      }
    };
  
    fetchData();
    
  },[fileName])
  

  const handler = useCallback(debounce(handleEditorChange, 500), []);

  const fetch = async () => {
   
    const payload = {
        codeLang:await getCodeLang(fileName),
        code:await getCode(fileName),
        inputValues: inputValue,
      };
      console.log(payload);
      try {
        const output = await axios.post(`${BASE_URL}/code`, payload);
        onRunButtonClick(output.data.data.output)
        console.log(output.data.data);
      } catch (error) {
        console.log(error);
      }
    };

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
          // path={file.name}
          // defaultLanguage={file.language}
          value={code}
          onMount={handleEditorMount}
        />
      </div>
    </div>
  );
}