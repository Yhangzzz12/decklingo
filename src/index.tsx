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

const C = {
  accent:      "#7C3AED",
  accentSoft:  "rgba(124,58,237,0.12)",
  star:        "#F59E0B",
  starSoft:    "rgba(245,158,11,0.12)",
  success:     "#22C55E",
  successSoft: "rgba(34,197,94,0.12)",
  error:       "#F43F5E",
  errorSoft:   "rgba(244,63,94,0.12)",
  textPrimary: "#E2E8F0",
  textMuted:   "#94A3B8",
};

function Content() {
  const [view, setView] = useState<"input" | "wordlist" | "review">("input");
  const [inputText, setInputText] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");
  const [targetLang, setTargetLang] = useState<string>("ZH");
  const [loading, setLoading] = useState<boolean>(false);
  const [words, setWords] = useState<any[]>([]);
  const [gameId, setGameId] = useState<string | null>(null);
  const [gameName, setGameName] = useState<string>("");
  const [savedFeedback, setSavedFeedback] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
    setError(null);
    try {
      const result = await translate(inputText, targetLang);
      setTranslation(result);
    } catch (e) {
      setError("Translation failed. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!inputText || !translation || !gameId) return;
    await saveWord(gameId, gameName, inputText, translation);
    await loadWords(gameId);
    setInputText("");
    setTranslation("");
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 1500);
  };

  const handleToggleStar = async (wordId: number) => {
    if (!gameId) return;
    await toggleStar(gameId, wordId);
    await loadWords(gameId);
  };

  const toggleLang = () => {
    setTargetLang(targetLang === "EN" ? "ZH" : "EN");
  };

  const starredCount = words.filter((w) => w.starred).length;

  // INPUT VIEW
  if (view === "input") {
    return (
      <PanelSection title="DeckLingo">

        {/* Game status banner */}
        <PanelSectionRow>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "6px 10px", borderRadius: 8,
            background: gameId ? C.successSoft : C.errorSoft,
            border: `1px solid ${gameId ? C.success : C.error}33`,
            fontSize: 12, color: gameId ? C.success : C.error,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
              background: gameId ? C.success : C.error,
            }} />
            {gameId ? gameName : "No game detected — launch a game first"}
          </div>
        </PanelSectionRow>

        {/* Text input */}
        <PanelSectionRow>
          <TextField
            label="Enter word or phrase"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </PanelSectionRow>

        {/* Language toggle */}
        <PanelSectionRow>
          <ButtonItem layout="below" onClick={toggleLang}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{
                padding: "2px 8px", borderRadius: 4,
                background: C.accentSoft, color: C.accent, fontSize: 11,
              }}>
                {targetLang === "EN" ? "CN" : "EN"}
              </span>
              →
              <span style={{
                padding: "2px 8px", borderRadius: 4,
                background: C.accentSoft, color: C.accent, fontSize: 11,
              }}>
                {targetLang}
              </span>
            </span>
          </ButtonItem>
        </PanelSectionRow>

        {/* Translate button */}
        <PanelSectionRow>
          <ButtonItem
            layout="below"
            onClick={handleTranslate}
            disabled={loading || !inputText}
          >
            <span style={{ opacity: loading ? 0.6 : 1 }}>
              {loading ? "Translating…" : "Translate"}
            </span>
          </ButtonItem>
        </PanelSectionRow>

        {/* Error state */}
        {error && (
          <PanelSectionRow>
            <div style={{
              borderLeft: `3px solid ${C.error}`,
              background: C.errorSoft,
              borderRadius: "0 8px 8px 0",
              padding: "8px 12px",
              fontSize: 12, color: C.error,
            }}>
              {error}
            </div>
          </PanelSectionRow>
        )}

        {/* Translation result card */}
        {translation && (
          <>
            <PanelSectionRow>
              <div style={{
                borderLeft: `3px solid ${C.accent}`,
                background: C.accentSoft,
                borderRadius: "0 8px 8px 0",
                padding: "10px 12px",
              }}>
                <div style={{
                  fontSize: 10, color: C.textMuted, marginBottom: 4,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                  Translation
                </div>
                <div style={{ fontSize: 16, color: C.textPrimary, fontWeight: 500 }}>
                  {translation}
                </div>
              </div>
            </PanelSectionRow>

            <PanelSectionRow>
              <ButtonItem layout="below" onClick={handleSave} disabled={!gameId}>
                Save Word
              </ButtonItem>
            </PanelSectionRow>
          </>
        )}

        {/* Save confirmation flash */}
        {savedFeedback && (
          <PanelSectionRow>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "6px 10px", borderRadius: 8,
              background: C.successSoft, color: C.success, fontSize: 12,
            }}>
              <span>✓</span> Word saved!
            </div>
          </PanelSectionRow>
        )}

        {/* Navigation buttons with count badges */}
        <PanelSectionRow>
          <ButtonItem layout="below" onClick={() => setView("wordlist")}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              Word List
              {words.length > 0 && (
                <span style={{
                  padding: "1px 7px", borderRadius: 999,
                  background: C.accentSoft, color: C.accent, fontSize: 11,
                }}>
                  {words.length}
                </span>
              )}
            </span>
          </ButtonItem>
        </PanelSectionRow>

        <PanelSectionRow>
          <ButtonItem layout="below" onClick={() => setView("review")}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              Review Starred
              {starredCount > 0 && (
                <span style={{
                  padding: "1px 7px", borderRadius: 999,
                  background: C.starSoft, color: C.star, fontSize: 11,
                }}>
                  {starredCount}
                </span>
              )}
            </span>
          </ButtonItem>
        </PanelSectionRow>

      </PanelSection>
    );
  }

  // WORD LIST VIEW
  if (view === "wordlist") {
    return (
      <PanelSection title={`Word List (${words.length})`}>
        <PanelSectionRow>
          <ButtonItem layout="below" onClick={() => setView("input")}>
            ← Back
          </ButtonItem>
        </PanelSectionRow>

        {!gameId ? (
          <PanelSectionRow>
            <div style={{ textAlign: "center", padding: "16px 8px" }}>
              <div style={{ fontSize: 13, color: C.textMuted }}>No game detected</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4, opacity: 0.6 }}>
                Launch a game and reopen DeckLingo
              </div>
            </div>
          </PanelSectionRow>
        ) : words.length === 0 ? (
          <PanelSectionRow>
            <div style={{ textAlign: "center", padding: "16px 8px" }}>
              <div style={{ fontSize: 13, color: C.textMuted }}>No words saved yet</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4, opacity: 0.6 }}>
                Go back and translate a word to get started
              </div>
            </div>
          </PanelSectionRow>
        ) : (
          words.map((word) => (
            <PanelSectionRow key={word.id}>
              <ButtonItem layout="below" onClick={() => handleToggleStar(word.id)}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    color: word.starred ? C.star : C.textMuted,
                    fontSize: 16, flexShrink: 0,
                  }}>
                    {word.starred ? "★" : "☆"}
                  </span>
                  <div>
                    <div style={{ fontSize: 13, color: C.textPrimary }}>{word.word}</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>{word.translation}</div>
                  </div>
                </div>
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
      <PanelSection title={`Starred Words (${starred.length})`}>
        <PanelSectionRow>
          <ButtonItem layout="below" onClick={() => setView("input")}>
            ← Back
          </ButtonItem>
        </PanelSectionRow>

        {starred.length === 0 ? (
          <PanelSectionRow>
            <div style={{ textAlign: "center", padding: "16px 8px" }}>
              <div style={{ fontSize: 13, color: C.textMuted }}>No starred words yet</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4, opacity: 0.6 }}>
                Tap the star on any word in the Word List
              </div>
            </div>
          </PanelSectionRow>
        ) : (
          starred.map((word) => (
            <PanelSectionRow key={word.id}>
              <ButtonItem layout="below" onClick={() => handleToggleStar(word.id)}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: C.star, fontSize: 16, flexShrink: 0 }}>★</span>
                  <div>
                    <div style={{ fontSize: 13, color: C.textPrimary }}>{word.word}</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>{word.translation}</div>
                  </div>
                </div>
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
