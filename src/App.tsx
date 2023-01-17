import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import TestComp from "TestComp.js";
import scss from "./App.module.scss";
import classes from "utils/classNames.js";

import viteSvg from "./public/vite.svg";
import tauriSvg from "./public/tauri.svg";
import reactSvg from "./public/react.svg";

function App() {
    const [greetMsg, setGreetMsg] = useState("");
    const [name, setName] = useState("");

    async function greet() {
        // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
        setGreetMsg(await invoke("greet", { name }));
    }

    return (
        <div className={scss.container}>
            <TestComp />
            <h1>Welcome to Tauri!</h1>

            <div className={scss.row}>
                <a href="https://vitejs.dev" target="_blank">
                    <img
                        src={viteSvg}
                        className={classes(scss.logo, scss.vite)}
                        alt="Vite logo"
                    />
                </a>
                <a href="https://tauri.app" target="_blank">
                    <img
                        src={tauriSvg}
                        className={classes(scss.logo, scss.tauri)}
                        alt="Tauri logo"
                    />
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <img
                        src={reactSvg}
                        className={classes(scss.logo, scss.react)}
                        alt="React logo"
                    />
                </a>
            </div>

            <p>Click on the Tauri, Vite, and React logos to learn more.</p>

            <div className={classes(scss.row)}>
                <div>
                    <input
                        id="greet-input"
                        onChange={(e) => setName(e.currentTarget.value)}
                        placeholder="Enter a name..."
                    />
                    <button type="button" onClick={() => void greet()}>
                        Greet
                    </button>
                </div>
            </div>
            <p>{greetMsg}</p>
        </div>
    );
}

export default App;
