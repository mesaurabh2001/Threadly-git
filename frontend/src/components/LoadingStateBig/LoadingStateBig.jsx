import styles from "./LoadingStateBig.module.css";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* =========================================================
   POSTS
   ========================================================= */

const POSTS = [
  {
    id: 1,
    subthread: "t/RoommateLife",
    text: "roommate labeled my leftovers 'DO NOT TOUCH' and ate them anyway 🍕🚫",
    score: 1240,
    comments: 342,
  },
  {
    id: 2,
    subthread: "t/GroupChatChaos",
    text: "the group chat has 847 unread messages and I'm scared to open it 📱👀",
    score: 3820,
    comments: 1200,
  },
  {
    id: 3,
    subthread: "t/CookingFails",
    text: "bro tried to make maggi and somehow set off the fire alarm 🔥🍜",
    score: 214,
    comments: 41,
  },
  {
    id: 4,
    subthread: "t/AuxCordCrimes",
    text: "who let @rahul near the aux cord again, we're all suffering 🎧😭",
    score: 905,
    comments: 96,
  },
  {
    id: 5,
    subthread: "t/WifiWoes",
    text: "wifi died exactly when it was my turn to present, coincidence? 📶💀",
    score: 581,
    comments: 73,
  },
  {
    id: 6,
    subthread: "t/WeekendPlans",
    text: "we planned a whole hike and ended up ordering pizza at the trailhead 🍕⛰️",
    score: 721,
    comments: 183,
  },
  {
    id: 7,
    subthread: "t/CardGameDrama",
    text: "someone please explain how we lost at UNO to a 9 year old 🃏😭",
    score: 318,
    comments: 89,
  },
  {
    id: 8,
    subthread: "t/BudgetFails",
    text: "we agreed on 'no spending this month'... anyway here's what I bought 🛍️😅",
    score: 2140,
    comments: 418,
  },
  {
    id: 9,
    subthread: "t/PetChaos",
    text: "the cat knocked over my entire setup 5 minutes before the call 🐱💻",
    score: 462,
    comments: 58,
  },
  {
    id: 10,
    subthread: "t/StudyGrind",
    text: "someone brought a full karaoke machine to a 'quiet study session' 🎤📚",
    score: 1580,
    comments: 231,
  },
];

/* =========================================================
   STATUS
   ========================================================= */

const STATUS_MESSAGES = [
  "reading",
  "sorting by new",
  "catching up",
  "scrolling",
  "loading comments",
  "ranking is shifting",
];

/* =========================================================
   COMMUNITY TICKER
   ========================================================= */

const TICKER_MESSAGES = [
  "u/quietfox42 joined r/popular",
  "u/lurker_88 upvoted r/formula1",
  "3 new comments in r/askreddit",
  "u/nightowl just subscribed",
  "someone found this mildly interesting",
  "u/dataviz_fan is commenting",
  "someone just upvoted this",
  "new reply in the thread",
];

/* =========================================================
   BACKGROUND COMMUNITY ACTIVITY
   ========================================================= */

const NETWORK_MESSAGES = [
  "someone joined the conversation",
  "new reply",
  "someone is typing...",
  "🔥 24 people reacted",
  "new post discovered",
  "u/nightowl is here",
  "someone shared this",
  "3 people are reading",
  "new connection",
  "that post is blowing up",
  "someone just upvoted",
  "👀 people are watching",
  "new comment",
  "someone found this",
  "u/quietfox42 joined",
  "💬 conversation growing",
];

const NETWORK_EMOJIS = [
  "🔥",
  "😂",
  "👀",
  "💬",
  "❤️",
  "😭",
  "🚀",
  "✨",
  "📈",
  "🍕",
  "🎧",
  "🐱",
  "💀",
  "👏",
];

const NETWORK_COLORS = [
  "#ff5700",
  "#ff7043",
  "#6d78d8",
  "#8f7bea",
  "#22c7a9",
  "#42a5f5",
  "#f2c94c",
  "#e76f9b",
  "#72d572",
];

/* =========================================================
   HELPERS
   ========================================================= */

function formatScore(score) {
  if (score >= 1000) {
    const k = score / 1000;

    return k % 1 === 0
      ? k.toFixed(0) + "k"
      : k.toFixed(1) + "k";
  }

  return String(score);
}

/* =========================================================
   COMPONENT
   ========================================================= */

export default function LivingRedditLoader({
  ready = false,
  onComplete,
}) {
  const [scores, setScores] = useState(() =>
    Object.fromEntries(
      POSTS.map((post) => [post.id, post.score])
    )
  );

  const [comments, setComments] = useState(() =>
    Object.fromEntries(
      POSTS.map((post) => [post.id, post.comments])
    )
  );

  const [position, setPosition] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [reading, setReading] = useState(128);
  const [scanned, setScanned] = useState(1400);

  const [voteFlash, setVoteFlash] = useState(null);
  const [commentFlash, setCommentFlash] = useState(null);
  const [votePop, setVotePop] = useState({});
  const [phase, setPhase] = useState("reading");
  const [finished, setFinished] = useState(false);
  const [networkActivity, setNetworkActivity] = useState([]);

  const popCounter = useRef(0);
  const networkCounter = useRef(0);

  /* =======================================================
     BACKGROUND COMMUNITY ACTIVITY
     ======================================================= */

  useEffect(() => {
    if (phase !== "reading") return;

    const createActivity = () => {
      const id = ++networkCounter.current;

      const side = Math.random() > 0.5 ? "left" : "right";

      const top = 8 + Math.random() * 84;
      const horizontal = 3 + Math.random() * 31;

      const color =
        NETWORK_COLORS[
          Math.floor(Math.random() * NETWORK_COLORS.length)
        ];

      const emoji =
        NETWORK_EMOJIS[
          Math.floor(Math.random() * NETWORK_EMOJIS.length)
        ];

      const message =
        NETWORK_MESSAGES[
          Math.floor(Math.random() * NETWORK_MESSAGES.length)
        ];

      const type = Math.random() > 0.42 ? "message" : "node";

      const activity = {
        id,
        side,
        top,
        horizontal,
        color,
        emoji,
        message,
        type,
      };

      setNetworkActivity((prev) => [
        ...prev.slice(-11),
        activity,
      ]);

      setTimeout(() => {
        setNetworkActivity((prev) =>
          prev.filter((item) => item.id !== id)
        );
      }, 3600);
    };

    const initial = [];

    for (let i = 0; i < 7; i++) {
      const id = ++networkCounter.current;

      initial.push({
        id,
        side: i % 2 === 0 ? "left" : "right",
        top: 5 + Math.random() * 88,
        horizontal: 4 + Math.random() * 30,
        color:
          NETWORK_COLORS[
            Math.floor(Math.random() * NETWORK_COLORS.length)
          ],
        emoji:
          NETWORK_EMOJIS[
            Math.floor(Math.random() * NETWORK_EMOJIS.length)
          ],
        message:
          NETWORK_MESSAGES[
            Math.floor(Math.random() * NETWORK_MESSAGES.length)
          ],
        type: Math.random() > 0.45 ? "message" : "node",
      });
    }

    setNetworkActivity(initial);

    const timer = setInterval(createActivity, 650);

    return () => clearInterval(timer);
  }, [phase]);

  /* =======================================================
     READER
     ======================================================= */

  useEffect(() => {
    if (phase !== "reading") return;

    const timer = setInterval(() => {
      setPosition((p) => (p + 1) % POSTS.length);

      setScanned(
        (s) => s + Math.floor(Math.random() * 10) + 3
      );
    }, 1400);

    return () => clearInterval(timer);
  }, [phase]);

  /* =======================================================
     VOTES
     ======================================================= */

  useEffect(() => {
    if (phase !== "reading") return;

    const timer = setInterval(() => {
      const post =
        POSTS[Math.floor(Math.random() * POSTS.length)];

      const amount = Math.floor(Math.random() * 35) + 3;
      const uid = ++popCounter.current;

      setScores((prev) => ({
        ...prev,
        [post.id]: prev[post.id] + amount,
      }));

      setVoteFlash(post.id);

      setVotePop((prev) => ({
        ...prev,
        [post.id]: {
          amount,
          uid,
        },
      }));

      setTimeout(() => {
        setVotePop((prev) => {
          if (prev[post.id]?.uid !== uid) {
            return prev;
          }

          const next = { ...prev };
          delete next[post.id];

          return next;
        });
      }, 850);

      setTimeout(() => {
        setVoteFlash((current) =>
          current === post.id ? null : current
        );
      }, 400);
    }, 500);

    return () => clearInterval(timer);
  }, [phase]);

  /* =======================================================
     COMMENTS
     ======================================================= */

  useEffect(() => {
    if (phase !== "reading") return;

    const timer = setInterval(() => {
      const post =
        POSTS[Math.floor(Math.random() * POSTS.length)];

      setComments((prev) => ({
        ...prev,
        [post.id]:
          prev[post.id] +
          Math.floor(Math.random() * 3) +
          1,
      }));

      setCommentFlash(post.id);

      setTimeout(() => {
        setCommentFlash((current) =>
          current === post.id ? null : current
        );
      }, 500);
    }, 1400);

    return () => clearInterval(timer);
  }, [phase]);

  /* =======================================================
     PEOPLE READING
     ======================================================= */

  useEffect(() => {
    if (phase !== "reading") return;

    const timer = setInterval(() => {
      setReading(
        (r) => r + Math.floor(Math.random() * 3)
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  /* =======================================================
     STATUS
     ======================================================= */

  useEffect(() => {
    if (phase !== "reading") return;

    const timer = setInterval(() => {
      setStatusIndex(
        (i) => (i + 1) % STATUS_MESSAGES.length
      );
    }, 2400);

    return () => clearInterval(timer);
  }, [phase]);

  /* =======================================================
     TICKER
     ======================================================= */

  useEffect(() => {
    if (phase !== "reading") return;

    const timer = setInterval(() => {
      setTickerIndex(
        (i) => (i + 1) % TICKER_MESSAGES.length
      );
    }, 2200);

    return () => clearInterval(timer);
  }, [phase]);

  /* =======================================================
     RANKED POSTS
     ======================================================= */

  const ranked = useMemo(() => {
    return POSTS
      .map((post) => ({
        ...post,
        score: scores[post.id],
        comments: comments[post.id],
      }))
      .sort((a, b) => b.score - a.score);
  }, [scores, comments]);

  /* =======================================================
     CURRENT POST
     ======================================================= */

  const currentPost = POSTS[position];

  /* =======================================================
     TOTAL KARMA
     ======================================================= */

  const totalKarma = Object.values(scores).reduce(
    (sum, score) => sum + score,
    0
  );

  /* =======================================================
     EXIT
     ======================================================= */

  useEffect(() => {
    if (!ready || phase !== "reading") {
      return;
    }

    setPhase("pause");

    const t1 = setTimeout(() => {
      setPhase("welcome");

      const t2 = setTimeout(() => {
        setFinished(true);

        const t3 = setTimeout(() => {
          onComplete?.();
        }, 500);

        return () => clearTimeout(t3);
      }, 750);

      return () => clearTimeout(t2);
    }, 500);

    return () => clearTimeout(t1);
  }, [ready, phase, onComplete]);

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div
      className={`${styles.livingLoader} ${
        finished ? styles.finished : ""
      }`}
    >
      {/* =================================================
          COMMUNITY NETWORK BACKGROUND
          ================================================= */}

      <div
        className={styles.communityNetwork}
        aria-hidden="true"
      >
        <div className={styles.networkGrid} />

        <div
          className={`${styles.networkGlow} ${styles.glowOrange}`}
        />

        <div
          className={`${styles.networkGlow} ${styles.glowPurple}`}
        />

        <div
          className={`${styles.networkGlow} ${styles.glowBlue}`}
        />

        {networkActivity.map((activity, index) => {
          if (activity.type === "node") {
            return (
              <div
                key={activity.id}
                className={`${styles.networkNode} ${
                  activity.side === "left"
                    ? styles.networkLeft
                    : styles.networkRight
                }`}
                style={{
                  top: `${activity.top}%`,
                  [activity.side === "left"
                    ? "left"
                    : "right"]: `${activity.horizontal}%`,
                  "--node-color": activity.color,
                  "--delay": `${(index % 5) * 0.12}s`,
                }}
              >
                <span className={styles.nodeCore} />

                <span className={styles.nodeRing} />

                <span className={styles.nodeEmoji}>
                  {activity.emoji}
                </span>
              </div>
            );
          }

          return (
            <div
              key={activity.id}
              className={`${styles.networkMessage} ${
                activity.side === "left"
                  ? styles.networkLeft
                  : styles.networkRight
              }`}
              style={{
                top: `${activity.top}%`,
                [activity.side === "left"
                  ? "left"
                  : "right"]: `${activity.horizontal}%`,
                "--message-color": activity.color,
                "--delay": `${(index % 5) * 0.12}s`,
              }}
            >
              <span className={styles.networkAvatar}>
                <span />
              </span>

              <span className={styles.networkMessageText}>
                {activity.message}
              </span>

              <span
                className={styles.networkMessageEmoji}
              >
                {activity.emoji}
              </span>
            </div>
          );
        })}

        {/* Static ambient people */}

        <div
          className={`${styles.ambientPerson} ${styles.personOne}`}
        >
          <span />
        </div>

        <div
          className={`${styles.ambientPerson} ${styles.personTwo}`}
        >
          <span />
        </div>

        <div
          className={`${styles.ambientPerson} ${styles.personThree}`}
        >
          <span />
        </div>

        <div
          className={`${styles.ambientPerson} ${styles.personFour}`}
        >
          <span />
        </div>

        {/* Connection paths */}

        <div
          className={`${styles.connection} ${styles.connectionOne}`}
        />

        <div
          className={`${styles.connection} ${styles.connectionTwo}`}
        />

        <div
          className={`${styles.connection} ${styles.connectionThree}`}
        />

        <div
          className={`${styles.connection} ${styles.connectionFour}`}
        />
      </div>

      {/* =================================================
          EXISTING CONTENT
          ================================================= */}

      <div className={styles.livingContent}>
        {/* COMMUNITY */}

        <div className={styles.livingCommunity}>
          <span className={styles.communityMark} />

          <span>THE COMMUNITY</span>
        </div>

        {/* LIVE COMMUNITY PULSE */}

        <div className={styles.livingPulse}>
          <div className={styles.pulseAvatars}>
            <span />
            <span />
            <span />
            <span />
          </div>

          <span className={styles.readingCount}>
            {reading.toLocaleString()} reading now
          </span>

          <span className={styles.pulseDivider} />

          <span
            key={tickerIndex}
            className={styles.ticker}
          >
            {TICKER_MESSAGES[tickerIndex]}
          </span>
        </div>

        {/* READING WINDOW */}

        <div className={styles.readingWindow}>
          <div
            className={`${styles.readingLine} ${styles.top}`}
          />

          <div
            className={styles.feedScroll}
            style={{
              transform: `translateY(-${position * 0}px)`,
            }}
          >
            {ranked.map((post, index) => {
              const currentIndex =
                ranked.findIndex(
                  (p) => p.id === currentPost.id
                );

              const distance = index - currentIndex;

              let state = "future";

              if (post.id === currentPost.id) {
                state = "current";
              } else if (distance < 0) {
                state = "past";
              }

              const stateClass =
                state === "current"
                  ? styles.current
                  : state === "past"
                    ? styles.past
                    : styles.future;

              const avatarClass =
                post.id % 2
                  ? styles.avatarOrange
                  : styles.avatarPurple;

              const voteClass =
                voteFlash === post.id
                  ? styles.voteActive
                  : "";

              const commentClass =
                commentFlash === post.id
                  ? styles.commentActive
                  : "";

              return (
                <div
                  key={post.id}
                  className={`${styles.readingPost} ${stateClass}`}
                >
                  <div className={styles.postSub}>
                    <span
                      className={`${styles.postAvatar} ${avatarClass}`}
                    />

                    {post.subthread}
                  </div>

                  <div className={styles.readingTitle}>
                    {post.text}
                  </div>

                  <div className={styles.readingMeta}>
                    <span className={voteClass}>
                      ↑ {formatScore(post.score)}
                    </span>

                    <span className={commentClass}>
                      💬 {post.comments}
                    </span>

                    {votePop[post.id] && (
                      <span
                        key={votePop[post.id].uid}
                        className={styles.votePop}
                      >
                        +{votePop[post.id].amount}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className={`${styles.readingLine} ${styles.bottom}`}
          />
        </div>

        {/* STATUS */}

        <div className={styles.livingStatus}>
          {phase === "reading" && (
            <>
              <span className={styles.statusPulse} />

              <span
                key={statusIndex}
                className={styles.statusText}
              >
                {STATUS_MESSAGES[statusIndex]}
              </span>
            </>
          )}

          {phase === "pause" && (
            <>
              <span className={styles.statusPulse} />

              <span>found something</span>
            </>
          )}

          {phase === "welcome" && (
            <span className={styles.welcome}>
              welcome back.
            </span>
          )}
        </div>

        {/* FOOTER */}

        <div className={styles.livingMeta}>
          <span>LISTENING TO THE INTERNET</span>

          <span>
            {scanned.toLocaleString()} read
          </span>
        </div>

        {/* RANKING META */}

        <div className={styles.rankingMeta}>
          <span>RANKING THE FRONT PAGE</span>

          <span>
            {totalKarma.toLocaleString()} karma
          </span>
        </div>
      </div>
    </div>
  );
}
