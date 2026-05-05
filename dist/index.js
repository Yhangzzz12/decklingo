const manifest = {"name":"Decklingo"};
const API_VERSION = 2;
const internalAPIConnection = window.__DECKY_SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_deckyLoaderAPIInit;
if (!internalAPIConnection) {
    throw new Error('[@decky/api]: Failed to connect to the loader as as the loader API was not initialized. This is likely a bug in Decky Loader.');
}
let api;
try {
    api = internalAPIConnection.connect(API_VERSION, manifest.name);
}
catch {
    api = internalAPIConnection.connect(1, manifest.name);
    console.warn(`[@decky/api] Requested API version ${API_VERSION} but the running loader only supports version 1. Some features may not work.`);
}
if (api._version != API_VERSION) {
    console.warn(`[@decky/api] Requested API version ${API_VERSION} but the running loader only supports version ${api._version}. Some features may not work.`);
}
const callable = api.callable;
const definePlugin = (fn) => {
    return (...args) => {
        return fn(...args);
    };
};

var DefaultContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined
};
var IconContext = SP_REACT.createContext && /*#__PURE__*/SP_REACT.createContext(DefaultContext);

var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function Tree2Element(tree) {
  return tree && tree.map((node, i) => /*#__PURE__*/SP_REACT.createElement(node.tag, _objectSpread({
    key: i
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return props => /*#__PURE__*/SP_REACT.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = conf => {
    var {
        attr,
        size,
        title
      } = props,
      svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return /*#__PURE__*/SP_REACT.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className: className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /*#__PURE__*/SP_REACT.createElement("title", null, title), props.children);
  };
  return IconContext !== undefined ? /*#__PURE__*/SP_REACT.createElement(IconContext.Consumer, null, conf => elem(conf)) : elem(DefaultContext);
}

// THIS FILE IS AUTO GENERATED
function FaLanguage (props) {
  return GenIcon({"attr":{"viewBox":"0 0 640 512"},"child":[{"tag":"path","attr":{"d":"M152.1 236.2c-3.5-12.1-7.8-33.2-7.8-33.2h-.5s-4.3 21.1-7.8 33.2l-11.1 37.5H163zM616 96H336v320h280c13.3 0 24-10.7 24-24V120c0-13.3-10.7-24-24-24zm-24 120c0 6.6-5.4 12-12 12h-11.4c-6.9 23.6-21.7 47.4-42.7 69.9 8.4 6.4 17.1 12.5 26.1 18 5.5 3.4 7.3 10.5 4.1 16.2l-7.9 13.9c-3.4 5.9-10.9 7.8-16.7 4.3-12.6-7.8-24.5-16.1-35.4-24.9-10.9 8.7-22.7 17.1-35.4 24.9-5.8 3.5-13.3 1.6-16.7-4.3l-7.9-13.9c-3.2-5.6-1.4-12.8 4.2-16.2 9.3-5.7 18-11.7 26.1-18-7.9-8.4-14.9-17-21-25.7-4-5.7-2.2-13.6 3.7-17.1l6.5-3.9 7.3-4.3c5.4-3.2 12.4-1.7 16 3.4 5 7 10.8 14 17.4 20.9 13.5-14.2 23.8-28.9 30-43.2H412c-6.6 0-12-5.4-12-12v-16c0-6.6 5.4-12 12-12h64v-16c0-6.6 5.4-12 12-12h16c6.6 0 12 5.4 12 12v16h64c6.6 0 12 5.4 12 12zM0 120v272c0 13.3 10.7 24 24 24h280V96H24c-13.3 0-24 10.7-24 24zm58.9 216.1L116.4 167c1.7-4.9 6.2-8.1 11.4-8.1h32.5c5.1 0 9.7 3.3 11.4 8.1l57.5 169.1c2.6 7.8-3.1 15.9-11.4 15.9h-22.9a12 12 0 0 1-11.5-8.6l-9.4-31.9h-60.2l-9.1 31.8c-1.5 5.1-6.2 8.7-11.5 8.7H70.3c-8.2 0-14-8.1-11.4-15.9z"},"child":[]}]})(props);
}

const translate = callable("translate");
const saveWord = callable("save_word");
const getWords = callable("get_words");
const toggleStar = callable("toggle_star");
const C = {
    accent: "#7C3AED",
    accentSoft: "rgba(124,58,237,0.12)",
    star: "#F59E0B",
    starSoft: "rgba(245,158,11,0.12)",
    success: "#22C55E",
    successSoft: "rgba(34,197,94,0.12)",
    error: "#F43F5E",
    errorSoft: "rgba(244,63,94,0.12)",
    textPrimary: "#E2E8F0",
    textMuted: "#94A3B8",
};
function Content() {
    const [view, setView] = SP_REACT.useState("input");
    const [inputText, setInputText] = SP_REACT.useState("");
    const [translation, setTranslation] = SP_REACT.useState("");
    const [targetLang, setTargetLang] = SP_REACT.useState("ZH");
    const [loading, setLoading] = SP_REACT.useState(false);
    const [words, setWords] = SP_REACT.useState([]);
    const [gameId, setGameId] = SP_REACT.useState(null);
    const [gameName, setGameName] = SP_REACT.useState("");
    const [savedFeedback, setSavedFeedback] = SP_REACT.useState(false);
    const [error, setError] = SP_REACT.useState(null);
    SP_REACT.useEffect(() => {
        const runningApps = SteamUIStore.RunningApps;
        if (runningApps && runningApps.length > 0) {
            const app = runningApps[0];
            setGameId(app.appid.toString());
            setGameName(app.display_name || "Unknown");
            loadWords(app.appid.toString());
        }
    }, []);
    const loadWords = async (id) => {
        const targetId = id || gameId;
        if (!targetId)
            return;
        const result = await getWords(targetId);
        setWords(result || []);
    };
    const handleTranslate = async () => {
        if (!inputText)
            return;
        setLoading(true);
        setError(null);
        try {
            const result = await translate(inputText, targetLang);
            setTranslation(result);
        }
        catch (e) {
            setError("Translation failed. Check your connection.");
        }
        finally {
            setLoading(false);
        }
    };
    const handleSave = async () => {
        if (!inputText || !translation || !gameId)
            return;
        await saveWord(gameId, gameName, inputText, translation);
        await loadWords(gameId);
        setInputText("");
        setTranslation("");
        setSavedFeedback(true);
        setTimeout(() => setSavedFeedback(false), 1500);
    };
    const handleToggleStar = async (wordId) => {
        if (!gameId)
            return;
        await toggleStar(gameId, wordId);
        await loadWords(gameId);
    };
    const toggleLang = () => {
        setTargetLang(targetLang === "EN" ? "ZH" : "EN");
    };
    const starredCount = words.filter((w) => w.starred).length;
    // INPUT VIEW
    if (view === "input") {
        return (SP_JSX.jsxs(DFL.PanelSection, { title: "DeckLingo", children: [SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsxs("div", { style: {
                            display: "flex", alignItems: "center", gap: 8,
                            padding: "6px 10px", borderRadius: 8,
                            background: gameId ? C.successSoft : C.errorSoft,
                            border: `1px solid ${gameId ? C.success : C.error}33`,
                            fontSize: 12, color: gameId ? C.success : C.error,
                        }, children: [SP_JSX.jsx("span", { style: {
                                    width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                                    background: gameId ? C.success : C.error,
                                } }), gameId ? gameName : "No game detected — launch a game first"] }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.TextField, { label: "Enter word or phrase", value: inputText, onChange: (e) => setInputText(e.target.value) }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: toggleLang, children: SP_JSX.jsxs("span", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [SP_JSX.jsx("span", { style: {
                                        padding: "2px 8px", borderRadius: 4,
                                        background: C.accentSoft, color: C.accent, fontSize: 11,
                                    }, children: targetLang === "EN" ? "CN" : "EN" }), "\u2192", SP_JSX.jsx("span", { style: {
                                        padding: "2px 8px", borderRadius: 4,
                                        background: C.accentSoft, color: C.accent, fontSize: 11,
                                    }, children: targetLang })] }) }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: handleTranslate, disabled: loading || !inputText, children: SP_JSX.jsx("span", { style: { opacity: loading ? 0.6 : 1 }, children: loading ? "Translating…" : "Translate" }) }) }), error && (SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx("div", { style: {
                            borderLeft: `3px solid ${C.error}`,
                            background: C.errorSoft,
                            borderRadius: "0 8px 8px 0",
                            padding: "8px 12px",
                            fontSize: 12, color: C.error,
                        }, children: error }) })), translation && (SP_JSX.jsxs(SP_JSX.Fragment, { children: [SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsxs("div", { style: {
                                    borderLeft: `3px solid ${C.accent}`,
                                    background: C.accentSoft,
                                    borderRadius: "0 8px 8px 0",
                                    padding: "10px 12px",
                                }, children: [SP_JSX.jsx("div", { style: {
                                            fontSize: 10, color: C.textMuted, marginBottom: 4,
                                            letterSpacing: "0.08em", textTransform: "uppercase",
                                        }, children: "Translation" }), SP_JSX.jsx("div", { style: { fontSize: 16, color: C.textPrimary, fontWeight: 500 }, children: translation })] }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: handleSave, disabled: !gameId, children: "Save Word" }) })] })), savedFeedback && (SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsxs("div", { style: {
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "6px 10px", borderRadius: 8,
                            background: C.successSoft, color: C.success, fontSize: 12,
                        }, children: [SP_JSX.jsx("span", { children: "\u2713" }), " Word saved!"] }) })), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: () => setView("wordlist"), children: SP_JSX.jsxs("span", { style: { display: "flex", alignItems: "center", gap: 6 }, children: ["Word List", words.length > 0 && (SP_JSX.jsx("span", { style: {
                                        padding: "1px 7px", borderRadius: 999,
                                        background: C.accentSoft, color: C.accent, fontSize: 11,
                                    }, children: words.length }))] }) }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: () => setView("review"), children: SP_JSX.jsxs("span", { style: { display: "flex", alignItems: "center", gap: 6 }, children: ["Review Starred", starredCount > 0 && (SP_JSX.jsx("span", { style: {
                                        padding: "1px 7px", borderRadius: 999,
                                        background: C.starSoft, color: C.star, fontSize: 11,
                                    }, children: starredCount }))] }) }) })] }));
    }
    // WORD LIST VIEW
    if (view === "wordlist") {
        return (SP_JSX.jsxs(DFL.PanelSection, { title: `Word List (${words.length})`, children: [SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: () => setView("input"), children: "\u2190 Back" }) }), !gameId ? (SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsxs("div", { style: { textAlign: "center", padding: "16px 8px" }, children: [SP_JSX.jsx("div", { style: { fontSize: 13, color: C.textMuted }, children: "No game detected" }), SP_JSX.jsx("div", { style: { fontSize: 11, color: C.textMuted, marginTop: 4, opacity: 0.6 }, children: "Launch a game and reopen DeckLingo" })] }) })) : words.length === 0 ? (SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsxs("div", { style: { textAlign: "center", padding: "16px 8px" }, children: [SP_JSX.jsx("div", { style: { fontSize: 13, color: C.textMuted }, children: "No words saved yet" }), SP_JSX.jsx("div", { style: { fontSize: 11, color: C.textMuted, marginTop: 4, opacity: 0.6 }, children: "Go back and translate a word to get started" })] }) })) : (words.map((word) => (SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: () => handleToggleStar(word.id), children: SP_JSX.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [SP_JSX.jsx("span", { style: {
                                        color: word.starred ? C.star : C.textMuted,
                                        fontSize: 16, flexShrink: 0,
                                    }, children: word.starred ? "★" : "☆" }), SP_JSX.jsxs("div", { children: [SP_JSX.jsx("div", { style: { fontSize: 13, color: C.textPrimary }, children: word.word }), SP_JSX.jsx("div", { style: { fontSize: 11, color: C.textMuted }, children: word.translation })] })] }) }) }, word.id))))] }));
    }
    // REVIEW VIEW
    if (view === "review") {
        const starred = words.filter((w) => w.starred);
        return (SP_JSX.jsxs(DFL.PanelSection, { title: `Starred Words (${starred.length})`, children: [SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: () => setView("input"), children: "\u2190 Back" }) }), starred.length === 0 ? (SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsxs("div", { style: { textAlign: "center", padding: "16px 8px" }, children: [SP_JSX.jsx("div", { style: { fontSize: 13, color: C.textMuted }, children: "No starred words yet" }), SP_JSX.jsx("div", { style: { fontSize: 11, color: C.textMuted, marginTop: 4, opacity: 0.6 }, children: "Tap the star on any word in the Word List" })] }) })) : (starred.map((word) => (SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: () => handleToggleStar(word.id), children: SP_JSX.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [SP_JSX.jsx("span", { style: { color: C.star, fontSize: 16, flexShrink: 0 }, children: "\u2605" }), SP_JSX.jsxs("div", { children: [SP_JSX.jsx("div", { style: { fontSize: 13, color: C.textPrimary }, children: word.word }), SP_JSX.jsx("div", { style: { fontSize: 11, color: C.textMuted }, children: word.translation })] })] }) }) }, word.id))))] }));
    }
    return null;
}
var index = definePlugin(() => {
    return {
        name: "DeckLingo",
        titleView: SP_JSX.jsx("div", { className: DFL.staticClasses.Title, children: "DeckLingo" }),
        content: SP_JSX.jsx(Content, {}),
        icon: SP_JSX.jsx(FaLanguage, {}),
        onDismount() { },
    };
});

export { index as default };
//# sourceMappingURL=index.js.map
