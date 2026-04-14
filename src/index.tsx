declare var SteamUIStore: any;
import {
  ButtonItem,
  PanelSection,
  PanelSectionRow,
  TextField,
  staticClasses
} from "@decky/ui";
import {
  callable,
  definePlugin,
} from "@decky/api"
import { useState, useEffect } from "react";
import { FaLanguage } from "react-icons/fa";

const translate = callable<[text: string, target_lang: string], string>("translate");
const saveWord = callable<[game_id: string, game_name: string, word: string, translation: string], any>("save_word");
const getWords = callable<[game_id: string], any>("get_words");
const toggleStar = callable<[game_id: string, word_id: number], void>("toggle_star");

function Content() {
  const [view, setView] = useState<"input" | "wordlist" | "review">("input");
  const [inputText, setInputText] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");
  const [targetLang, setTargetLang] = useState<string>("ZH");
  const [loading, setLoading] = useState<boolean>(false);
  const [words, setWords] = useState<any[]>([]);
  const [gameId, setGameId] = useState<string | null>(null);
  const [gameName, setGameName] = useState<string>("")

  useEffect(() => {
    const runningApps = SteamUIStore.RunningApps;
    if (runningApps && runningApps.length > 0) {
        const app = runningApps[0];
        setGameId(app.appid.toString());
        setGameName(app.display_name || "Unknown");
        loadWords(app.appid.toString());
    }
}, []);

  const loadWords = async (id?: string) => {
    const targetId = id || gameId;
    if (!targetId) return;
    const result = await getWords(targetId);
    setWords(result || []);
  };

  const handleTranslate = async () => {
    if (!inputText) return;
    setLoading(true);
    const result = await translate(inputText, targetLang);
    setTranslation(result);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!inputText || !translation || !gameId) return;
    await saveWord(gameId, gameName,inputText, translation);
    await loadWords(gameId);
    setInputText("");
    setTranslation("");
  };

  const handleToggleStar = async (wordId: number) => {
    if (!gameId) return;
    await toggleStar(gameId, wordId);
    await loadWords(gameId);
  };

  const toggleLang = () => {
    setTargetLang(targetLang === "EN" ? "ZH" : "EN");
  };

  // INPUT VIEW
  if (view === "input") {
    return (
      <PanelSection title="DeckLingo">

        {!gameId ? (
          <PanelSectionRow>
            <div style={{ padding: "8px", color: "gray", fontSize: "13px" }}>
              No active applications are playing right now.
            </div>
          </PanelSectionRow>
        ) : (
          <PanelSectionRow>
            <div style={{ padding: "8px", color: "gray", fontSize: "13px" }}>
              Game: {gameName}
            </div>
          </PanelSectionRow>
        )}

        <PanelSectionRow>
          <TextField
            label="Enter word or phrase"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </PanelSectionRow>

        <PanelSectionRow>
          <ButtonItem layout="below" onClick={toggleLang}>
            {targetLang === "EN" ? "CN → EN" : "EN → CN"}
          </ButtonItem>
        </PanelSectionRow>

        <PanelSectionRow>
          <ButtonItem layout="below" onClick={handleTranslate}>
            {loading ? "Translating..." : "Translate"}
          </ButtonItem>
        </PanelSectionRow>

        {translation ? (
          <>
            <PanelSectionRow>
              <div style={{ padding: "8px", color: "white", fontSize: "14px" }}>
                {translation}
              </div>
            </PanelSectionRow>
            <PanelSectionRow>
              <ButtonItem
                layout="below"
                onClick={handleSave}
                disabled={!gameId}
              >
                Save Word
              </ButtonItem>
            </PanelSectionRow>
          </>
        ) : null}

        <PanelSectionRow>
          <ButtonItem layout="below" onClick={() => setView("wordlist")}>
            Word List
          </ButtonItem>
        </PanelSectionRow>

        <PanelSectionRow>
          <ButtonItem layout="below" onClick={() => setView("review")}>
            Review Starred
          </ButtonItem>
        </PanelSectionRow>

      </PanelSection>
    );
  }

  // WORD LIST VIEW
  if (view === "wordlist") {
    return (
      <PanelSection title="Word List">
        <PanelSectionRow>
          <ButtonItem layout="below" onClick={() => setView("input")}>
            ← Back
          </ButtonItem>
        </PanelSectionRow>

        {!gameId ? (
          <PanelSectionRow>
            <div style={{ padding: "8px", color: "gray", fontSize: "13px" }}>
              No game detected. Launch a game first.
            </div>
          </PanelSectionRow>
        ) : words.length === 0 ? (
          <PanelSectionRow>
            <div style={{ padding: "8px", color: "gray", fontSize: "13px" }}>
              No words saved yet.
            </div>
          </PanelSectionRow>
        ) : (
          words.map((word) => (
            <PanelSectionRow key={word.id}>
              <ButtonItem
                layout="below"
                onClick={() => handleToggleStar(word.id)}
              >
                {word.starred ? "★ " : "☆ "}{word.word} — {word.translation}
              </ButtonItem>
            </PanelSectionRow>
          ))
        )}
      </PanelSection>
    );
  }

  // REVIEW VIEW
  if (view === "review") {
    const starred = words.filter((w) => w.starred);
    return (
      <PanelSection title="Starred Words">
        <PanelSectionRow>
          <ButtonItem layout="below" onClick={() => setView("input")}>
            ← Back
          </ButtonItem>
        </PanelSectionRow>

        {starred.length === 0 ? (
          <PanelSectionRow>
            <div style={{ padding: "8px", color: "gray", fontSize: "13px" }}>
              No starred words yet. Star words in the Word List.
            </div>
          </PanelSectionRow>
        ) : (
          starred.map((word) => (
            <PanelSectionRow key={word.id}>
              <ButtonItem layout="below">
                ★ {word.word} — {word.translation}
              </ButtonItem>
            </PanelSectionRow>
          ))
        )}
      </PanelSection>
    );
  }

  return null;
}

export default definePlugin(() => {
  return {
    name: "DeckLingo",
    titleView: <div className={staticClasses.Title}>DeckLingo</div>,
    content: <Content />,
    icon: <FaLanguage />,
    onDismount() {},
  };
});
