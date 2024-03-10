/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { debounce } from "lodash";
import InputNavbar from "./PlaygrounNavbar";
import Editor from "@monaco-editor/react";
import { useState, useEffect, useCallback, useContext, useRef } from "react";
import { FaJava } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
import axios from "axios";
import { useLocalStorage } from "../../../Common/Hooks/useLocalStorage";
import { BASE_URL } from "../../../../config";
import { inputValuesContext } from "../WorkSpace";
import { useDropzone } from "react-dropzone";
import moment from "moment";

type FileEntry = {
  name: string;
  language: string;
  value: string;
};

type InputBoxProps = {
  onRunButtonClick: (newOutputValue: any, newExecutionTime: any) => void;
  input: string;
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

if (!localStorage.getItem("codeFile")) {
  localStorage.setItem("codeFile", JSON.stringify(files));
}

async function getCode(fileName: string) {
  // console.log(fileName);
  const codeFile = JSON.parse(localStorage.getItem("codeFile") || "");
  return codeFile[fileName].value;
}
async function getCodeLang(fileName: string) {
  const codeFile = JSON.parse(localStorage.getItem("codeFile") || "");
  return codeFile[fileName].language;
}

export const Playground: React.FC<InputBoxProps> = ({ onRunButtonClick }) => {
  const [fontSize] = useLocalStorage("Remote-Code-Executor-FontSize", 16);
  const [settings, setSettings] = useState<IsSettings>({
    fontSize: fontSize,
    settingsModalIsOpen: false,
    dropDownIsOpen: false,
  });
  const fileName1 =
    (localStorage.getItem("fileName")
      ? localStorage.getItem("fileName")
      : "main.cpp") || "";
  const code1 =
    (localStorage.getItem("codeFile")
      ? JSON.parse(localStorage.getItem("codeFile") || "")
      : files) || "";
  const [fileName, setFileName] = useState(fileName1);
  const [code, setCode] = useState(code1[fileName1].value);
  const { inputValue } = useContext(inputValuesContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleEditorMount() {
    if (localStorage.getItem("fileName")) {
      setFileName(localStorage.getItem("fileName") || "");
      setCode(await getCode(localStorage.getItem("fileName") || ""));
    }
    if (localStorage.getItem("codeFile")) {
      setCode(
        await getCode(
          localStorage.getItem("fileName") || files["main.cpp"].value
        )
      );
    }
  }

  const getFileEntryByExtension = async (extension: string): Promise<any> => {
    switch (extension) {
      case "js":
        return "script.js";
      case "py":
        return "script.py";
      case "c":
        return "main.c";
      case "cpp":
        return "main.cpp";
      case "java":
        return "Main.java";
      default:
        return "undefined"; // Return undefined if extension does not match any predefined file
    }
  };

  function handleEditorChange(value: string | undefined) {
    const codeFile = JSON.parse(localStorage.getItem("codeFile") || "");
    const f = localStorage.getItem("fileName") || "";

    codeFile[f].value = value;
    console.log(codeFile[f].value);
    localStorage.setItem("codeFile", JSON.stringify(codeFile));
    console.log(codeFile);
  }

  useEffect(() => {
    localStorage.setItem("fileName", fileName);
    setFileName(localStorage.getItem("fileName") || "");

    const fetchData = async () => {
      try {
        const codeValue = await getCode(
          localStorage.getItem("fileName") || files["main.cpp"].value
        );
        setCode(codeValue);
      } catch (error) {
        console.error("Error fetching code:", error);
      }
    };

    fetchData();
  }, [fileName]);

  const fetch = async () => {
    setLoading(true);
    const payload = {
      codeLang: await getCodeLang(fileName),
      code: await getCode(fileName),
      inputValues: inputValue,
    };
    console.log(payload);
    try {
      onRunButtonClick("", "");
      const output = await axios.post(`${BASE_URL}/code`, payload);
      console.log(output.data.data);

      let intervalID: number | undefined;

      intervalID = setInterval(async () => {
        const res = await axios.get(
          `${BASE_URL}/status?id=${output.data.data.jobID}`
        );
        console.log(res);

        const { success, data } = res.data;
        if (success) {
          const { status: jobStatus, output: jobOutput } = data;
          setJobDetails(data);
          if (jobStatus === "running") return;
          onRunButtonClick(jobOutput, renderTimeDetails());
          setLoading(false); // Move setLoading(false) here
          clearInterval(intervalID);
        } else {
          setLoading(false); // And here
          clearInterval(intervalID);
          onRunButtonClick("Error in fetching output", "");
        }
      }, 1000);
    } catch (error) {
      setLoading(false); // Also set loading to false in the catch block
      console.log(error);
    }
  };

  const renderTimeDetails = () => {
    if (jobDetails) {
      const { StartedAt, completedAt } = jobDetails;
      let result = "";
      const start = moment(StartedAt);
      const end = moment(completedAt);
      const duration = moment.duration(end.diff(start));

      result += `Execution Time: ${duration.asSeconds()}s`;
      return result;
    }
    return "";
  };

  async function onDrop(acceptedFiles: File[]) {
    const file = acceptedFiles[0];
    console.log(acceptedFiles[0]);
    const reader = new FileReader();
    const fileExtension = acceptedFiles[0].name.split(".").pop();
    console.log(fileExtension);
    if (file) {
      reader.readAsText(file);
      reader.onload = async function (e) {
        const text = e.target?.result;
        console.log(text);
        if (text) {
          const g = await getFileEntryByExtension(fileExtension || "");
          await setFileName(g); // Set the file name first
          localStorage.setItem("fileName", g); // Update file name in local storage
          const codeFile = JSON.parse(localStorage.getItem("codeFile") || "{}");
          const fileName = localStorage.getItem("fileName") || "";

          codeFile[fileName].value = text; // Update content using the new file name
          localStorage.setItem("codeFile", JSON.stringify(codeFile));
          setCode(text.toString());
        }
      };
    }
  }

  const { getInputProps, getRootProps } = useDropzone({
    accept: {
      "text/*": [".js", ".py", ".java", ".c", ".cpp"],
    },
    maxFiles: 1,
    onDrop,
  });

  const handler = useCallback(debounce(handleEditorChange, 500), []);

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
          loading={loading}
        />
        <div {...getRootProps()}>
          <input
            {...getInputProps({ readOnly: true })}
            disabled
            ref={inputRef}
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
            defaultLanguage={files[fileName].language}
            value={code}
            onMount={handleEditorMount}
          />
        </div>
      </div>
    </div>
  );
};
