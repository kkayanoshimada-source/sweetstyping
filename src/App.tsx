import React, { useState, useEffect, useRef, useMemo } from 'react';
import './App.css';

interface SweetItem {
  name: string;
  kana: string;
  category: '洋菓子' | '和菓子';
}

const SWEETS_DATA: SweetItem[] = [
  // 洋菓子 (50種)
  { name: 'ショートケーキ', kana: 'しょーとけーき', category: '洋菓子' },
  { name: 'ミルフィーユ', kana: 'みるふぃーゆ', category: '洋菓子' },
  { name: 'ティラミス', kana: 'てぃらみす', category: '洋菓子' },
  { name: 'シュークリーム', kana: 'しゅーくりーむ', category: '洋菓子' },
  { name: 'モンブラン', kana: 'もんぶらん', category: '洋菓子' },
  { name: 'ガトーショコラ', kana: 'がとーしょこら', category: '洋菓子' },
  { name: 'チーズケーキ', kana: 'ちーずけーき', category: '洋菓子' },
  { name: 'アップルパイ', kana: 'あっぷるぱい', category: '洋菓子' },
  { name: 'マカロン', kana: 'まかろん', category: '洋菓子' },
  { name: 'エクレア', kana: 'えくれあ', category: '洋菓子' },
  { name: 'タルトタタン', kana: 'たるとたたん', category: '洋菓子' },
  { name: 'パンナコッタ', kana: 'ぱんなこった', category: '洋菓子' },
  { name: 'クレームブリュレ', kana: 'くれーむぶりゅれ', category: '洋菓子' },
  { name: 'フィナンシェ', kana: 'ふぃなんしぇ', category: '洋菓子' },
  { name: 'マドレーヌ', kana: 'まどれーぬ', category: '洋菓子' },
  { name: 'カヌレ', kana: 'かぬれ', category: '洋菓子' },
  { name: 'バウムクーヘン', kana: 'ばうむくーへん', category: '洋菓子' },
  { name: 'ロールケーキ', kana: 'ろーるけーき', category: '洋菓子' },
  { name: 'シフォンケーキ', kana: 'しふぉんけーき', category: '洋菓子' },
  { name: 'オペラ', kana: 'おぺら', category: '洋菓子' },
  { name: 'ザッハトルテ', kana: 'ざっはとるて', category: '洋菓子' },
  { name: 'フォンダンショコラ', kana: 'ふぉんだんしょこら', category: '洋菓子' },
  { name: 'スフレ', kana: 'すふれ', category: '洋菓子' },
  { name: 'ブランマンジェ', kana: 'ぶらんまんじぇ', category: '洋菓子' },
  { name: 'サバラン', kana: 'さばらん', category: '洋菓子' },
  { name: 'パリブレスト', kana: 'ぱりぶれすと', category: '洋菓子' },
  { name: 'カスタードプリン', kana: 'かすたーどぷりん', category: '洋菓子' },
  { name: 'フルーツタルト', kana: 'ふるーつたると', category: '洋菓子' },
  { name: 'レモンパイ', kana: 'れもんぱい', category: '洋菓子' },
  { name: 'ブラウニー', kana: 'ぶらうにー', category: '洋菓子' },
  { name: 'ワッフル', kana: 'わっふる', category: '洋菓子' },
  { name: 'パンケーキ', kana: 'ぱんけーき', category: '洋菓子' },
  { name: 'クレープ', kana: 'くれーぷ', category: '洋菓子' },
  { name: 'ドーナツ', kana: 'どーなつ', category: '洋菓子' },
  { name: 'チュロス', kana: 'ちゅろす', category: '洋菓子' },
  { name: 'スコーン', kana: 'すこーん', category: '洋菓子' },
  { name: 'ダックワーズ', kana: 'だっくわーず', category: '洋菓子' },
  { name: 'フロランタン', kana: 'ふろらんたん', category: '洋菓子' },
  { name: 'ガレット', kana: 'がれっと', category: '洋菓子' },
  { name: 'ラングドシャ', kana: 'らんぐどしゃ', category: '洋菓子' },
  { name: 'パートドフリュイ', kana: 'ぱーとどふりゅい', category: '洋菓子' },
  { name: 'ギモーヴ', kana: 'ぎもーゔ', category: '洋菓子' },
  { name: 'ヌガー', kana: 'ぬがー', category: '洋菓子' },
  { name: 'トリュフチョコ', kana: 'とりゅふちょこ', category: '洋菓子' },
  { name: '生チョコレート', kana: 'なまちょこれーと', category: '洋菓子' },
  { name: 'ジェラート', kana: 'じぇらーと', category: '洋菓子' },
  { name: 'ソフトクリーム', kana: 'そふとくりーむ', category: '洋菓子' },
  { name: 'パフェ', kana: 'ぱふぇ', category: '洋菓子' },
  { name: 'アフォガート', kana: 'あふぉがーと', category: '洋菓子' },
  { name: 'マリトッツォ', kana: 'まりとっつぉ', category: '洋菓子' },

  // 和菓子 (50種)
  { name: 'どら焼き', kana: 'どらやき', category: '和菓子' },
  { name: 'おはぎ', kana: 'おはぎ', category: '和菓子' },
  { name: '栗羊羹', kana: 'くりようかん', category: '和菓子' },
  { name: 'いちご大福', kana: 'いちごだいふく', category: '和菓子' },
  { name: '豆大福', kana: 'まめだいふく', category: '和菓子' },
  { name: 'みたらし団子', kana: 'みたらしだんご', category: '和菓子' },
  { name: '三色団子', kana: 'さんしょくだんご', category: '和菓子' },
  { name: '草餅', kana: 'くさもち', category: '和菓子' },
  { name: '桜餅', kana: 'さくらもち', category: '和菓子' },
  { name: '柏餅', kana: 'かしわもち', category: '和菓子' },
  { name: 'わらび餅', kana: 'わらびもち', category: '和菓子' },
  { name: 'くず餅', kana: 'くずもち', category: '和菓子' },
  { name: '水羊羹', kana: 'みずようかん', category: '和菓子' },
  { name: '練り切り', kana: 'ねりきり', category: '和菓子' },
  { name: '最中', kana: 'もなか', category: '和菓子' },
  { name: 'たい焼き', kana: 'たいやき', category: '和菓子' },
  { name: '今川焼き', kana: 'いまがわやき', category: '和菓子' },
  { name: 'カステラ', kana: 'かすてら', category: '和菓子' },
  { name: 'きんつば', kana: 'きんつば', category: '和菓子' },
  { name: 'かりんとう', kana: 'かりんとう', category: '和菓子' },
  { name: 'せんべい', kana: 'せんべい', category: '和菓子' },
  { name: 'おかき', kana: 'おかき', category: '和菓子' },
  { name: 'あられ', kana: 'あられ', category: '和菓子' },
  { name: '八ッ橋', kana: 'やつはし', category: '和菓子' },
  { name: '生八ッ橋', kana: 'なまやつはし', category: '和菓子' },
  { name: 'ういろう', kana: 'ういろう', category: '和菓子' },
  { name: 'かるかん', kana: 'かるかん', category: '和菓子' },
  { name: 'まんじゅう', kana: 'まんじゅう', category: '和菓子' },
  { name: '温泉まんじゅう', kana: 'おんせんまんじゅう', category: '和菓子' },
  { name: '水まんじゅう', kana: 'みずまんじゅう', category: '和菓子' },
  { name: '酒まんじゅう', kana: 'さけまんじゅう', category: '和菓子' },
  { name: 'あんみつ', kana: 'あんみつ', category: '和菓子' },
  { name: 'クリームあんみつ', kana: 'くりーむあんみつ', category: '和菓子' },
  { name: 'ぜんざい', kana: 'ぜんざい', category: '和菓子' },
  { name: 'おしるこ', kana: 'おしるこ', category: '和菓子' },
  { name: 'かき氷', kana: 'かきごおり', category: '和菓子' },
  { name: '宇治金時', kana: 'うじきんとき', category: '和菓子' },
  { name: '落雁', kana: 'らくがん', category: '和菓子' },
  { name: '金平糖', kana: 'こんぺいとう', category: '和菓子' },
  { name: 'すあま', kana: 'すあま', category: '和菓子' },
  { name: 'べこ餅', kana: 'べこもち', category: '和菓子' },
  { name: 'ずんだ餅', kana: 'ずんだもち', category: '和菓子' },
  { name: 'くるみ餅', kana: 'くるみもち', category: '和菓子' },
  { name: 'きなこ餅', kana: 'きなこもち', category: '和菓子' },
  { name: 'あべかわ餅', kana: 'あべかわもち', category: '和菓子' },
  { name: 'ちまき', kana: 'ちまき', category: '和菓子' },
  { name: '月餅', kana: 'げっぺい', category: '和菓子' },
  { name: '胡麻団子', kana: 'ごまだんご', category: '和菓子' },
  { name: '芋ようかん', kana: 'いもようかん', category: '和菓子' },
  { name: 'スイートポテト', kana: 'すいーとぽてと', category: '和菓子' },
];

const normalizeKana = (str: string): string => {
  return str
    .trim()
    .replace(/[\u30a1-\u30f6]/g, (match) =>
      String.fromCharCode(match.charCodeAt(0) - 0x60)
    )
    .replace(/[ー－―‐]/g, 'ー')
    .toLowerCase();
};

const GAME_DURATION = 60;
const POINTS_PER_WORD = 10;

export default function App() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(GAME_DURATION);
  const [score, setScore] = useState<number>(0);
  const [solvedCount, setSolvedCount] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [deck, setDeck] = useState<SweetItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [popScore, setPopScore] = useState<boolean>(false);
  const [shakeCard, setShakeCard] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isComposingRef = useRef<boolean>(false); // IME変換中かどうかを追跡

  const currentSweet = deck[currentIndex] || SWEETS_DATA[0];

  useEffect(() => {
    document.documentElement.lang = 'ja';
  }, []);

  const playSuccessSound = () => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.setValueAtTime(880.0, now + 0.08);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // ignore
    }
  };

  const createShuffledDeck = () => {
    const copy = [...SWEETS_DATA];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const startGame = () => {
    const newDeck = createShuffledDeck();
    setDeck(newDeck);
    setCurrentIndex(0);
    setScore(0);
    setSolvedCount(0);
    setTimeLeft(GAME_DURATION);
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setGameState('playing');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('finished');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // 入力クリアと次問への移行を確実に行う共通関数
  const advanceWord = () => {
    playSuccessSound();
    setScore((prev) => prev + POINTS_PER_WORD);
    setSolvedCount((prev) => prev + 1);
    
    // StateとDOM要素の値を強制的に完全リセット（IMEバッファの残骸を残さない）
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }

    setPopScore(true);
    setTimeout(() => setPopScore(false), 350);

    setCurrentIndex((prev) => {
      if (prev + 1 >= deck.length) {
        setDeck(createShuffledDeck());
        return 0;
      }
      return prev + 1;
    });

    // 入力欄へのフォーカスを維持
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  // 正誤チェックと自動進行の判定
  const checkAndAdvance = (val: string) => {
    if (gameState !== 'playing') return;
    if (isComposingRef.current) return; // IME変換確定前は何もしない

    const normalizedInput = normalizeKana(val);
    const normalizedTargetKana = normalizeKana(currentSweet.kana);
    const normalizedTargetName = normalizeKana(currentSweet.name);

    if (
      normalizedInput === normalizedTargetKana ||
      normalizedInput === normalizedTargetName
    ) {
      advanceWord();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    checkAndAdvance(val);
  };

  // IME変換の開始・終了イベントの監視
  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    isComposingRef.current = false;
    const val = (e.target as HTMLInputElement).value;
    setInputValue(val);
    checkAndAdvance(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (gameState !== 'playing') return;
    if (e.key === 'Enter' && !isComposingRef.current) {
      const val = inputRef.current ? inputRef.current.value : inputValue;
      const normalizedInput = normalizeKana(val);
      const normalizedTargetKana = normalizeKana(currentSweet.kana);
      const normalizedTargetName = normalizeKana(currentSweet.name);

      if (
        normalizedInput === normalizedTargetKana ||
        normalizedInput === normalizedTargetName
      ) {
        e.preventDefault();
        advanceWord();
      }
    }
  };

  const handleSkip = () => {
    if (gameState !== 'playing') return;
    setShakeCard(true);
    setTimeout(() => setShakeCard(false), 300);
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setCurrentIndex((prev) => (prev + 1) % deck.length);
    inputRef.current?.focus();
  };

  const matchedLength = useMemo(() => {
    const normIn = normalizeKana(inputValue);
    const normTarget = normalizeKana(currentSweet.kana);
    let count = 0;
    for (let i = 0; i < Math.min(normIn.length, normTarget.length); i++) {
      if (normIn[i] === normTarget[i]) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }, [inputValue, currentSweet]);

  const getRank = (finalScore: number) => {
    if (finalScore >= 250) return { title: '伝説のパティシエ', badge: '👑' };
    if (finalScore >= 180) return { title: '三ツ星スイーツ職人', badge: '🍰' };
    if (finalScore >= 120) return { title: '甘味処の看板職人', badge: '🍡' };
    if (finalScore >= 60) return { title: '見習いパティシエ', badge: '🧁' };
    return { title: 'スイーツ大好き初心者', badge: '🍪' };
  };

  return (
    <div className="app-container cream-stripe-bg">
      <header className="app-header">
        <div className="brand">
          <h1 className="brand-title">タイピング・<br />フリック入力ゲーム！</h1>
        </div>
        <button
          type="button"
          className="sound-toggle-btn"
          onClick={() => setSoundEnabled((prev) => !prev)}
          aria-label={soundEnabled ? '効果音をオフにする' : '効果音をオンにする'}
          title={soundEnabled ? '効果音ON' : '効果音OFF'}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
      </header>

      <main className="main-content">
        {gameState === 'idle' && (
          <section className="card start-card">
            <div className="hero-badge">洋菓子・和菓子 全100種類収録</div>
            <div className="hero-icons" aria-hidden="true">
              <span>🍓</span>
              <span>🍮</span>
              <span>🍡</span>
              <span>🍵</span>
            </div>
            <h2 className="start-title">60秒タイピング・<br />フリック入力ゲーム！</h2>
            <p className="start-desc">
              次々と現れるスイーツの名前を<br />PCのキーボードやスマホの<br />フリック入力で素早く入力しよう！
            </p>
            <ul className="rule-list">
              <li>⏱ 制限時間：<strong>60秒</strong></li>
              <li>✨ 1フレーズ完成：<strong>+10点</strong></li>
              <li>💻 PC /📱 iPhone / Android対応 </li>
            </ul>
            <button type="button" className="primary-btn start-btn" onClick={startGame}>
              ゲームスタート！
            </button>
          </section>
        )}

        {gameState === 'playing' && (
          <section className="play-wrapper">
            <div className="status-bar">
              <div className={`status-box ${timeLeft <= 10 ? 'timer-danger' : ''}`}>
                <span className="status-label">のこり時間</span>
                <span className="status-value">
                  {timeLeft}
                  <small>秒</small>
                </span>
              </div>

              <div className={`status-box ${popScore ? 'score-pop' : ''}`}>
                <span className="status-label">スコア</span>
                <span className="status-value score-text">
                  {score}
                  <small>点</small>
                </span>
              </div>
            </div>

            <div className="progress-track">
              <div
                className={`progress-fill ${timeLeft <= 10 ? 'danger' : ''}`}
                style={{ width: `${(timeLeft / GAME_DURATION) * 100}%` }}
              />
            </div>

            <div
              className={`card prompt-card ${shakeCard ? 'card-shake' : ''}`}
              onClick={() => inputRef.current?.focus()}
            >
              <span
                className={`category-tag ${
                  currentSweet.category === '和菓子' ? 'tag-wagashi' : 'tag-yogashi'
                }`}
              >
                {currentSweet.category}
              </span>

              <div className="sweet-name">{currentSweet.name}</div>

              <div className="sweet-kana" aria-label={`よみがな: ${currentSweet.kana}`}>
                {currentSweet.kana.split('').map((char, idx) => (
                  <span
                    key={idx}
                    className={idx < matchedLength ? 'kana-matched' : 'kana-unmatched'}
                  >
                    {char}
                  </span>
                ))}
              </div>

              <div className="input-area">
                <input
                  ref={inputRef}
                  type="text"
                  className="flick-input"
                  defaultValue={inputValue}
                  onChange={handleInputChange}
                  onCompositionStart={handleCompositionStart}
                  onCompositionEnd={handleCompositionEnd}
                  onKeyDown={handleKeyDown}
                  placeholder="ここに入力（フリック）"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  enterKeyHint="next"
                />
              </div>

              <div className="card-footer-actions">
                <button type="button" className="skip-btn" onClick={handleSkip}>
                  パスする ⏭
                </button>
              </div>
            </div>
          </section>
        )}

        {gameState === 'finished' && (
          <section className="card result-card">
            <div className="result-badge">{getRank(score).badge}</div>
            <p className="result-subtitle">タイムアップ！あなたの称号は…</p>
            <h2 className="result-rank">{getRank(score).title}</h2>

            <div className="result-stats">
              <div className="result-stat-item">
                <span className="stat-name">最終スコア</span>
                <span className="stat-num highlight">
                  {score}
                  <small>点</small>
                </span>
              </div>
              <div className="result-stat-divider" />
              <div className="result-stat-item">
                <span className="stat-name">完成スイーツ数</span>
                <span className="stat-num">
                  {solvedCount}
                  <small>個</small>
                </span>
              </div>
            </div>

            <button type="button" className="primary-btn retry-btn" onClick={startGame}>
              もう一度遊ぶ ↻
            </button>
          </section>
        )}
      </main>
    </div>
  );
}