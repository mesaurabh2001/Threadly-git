import "./LoadingStateSmall.css";

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
   HELPERS
   ========================================================= */

function formatScore(score) {
  if (score >= 1000) {
    const k = score / 1000;

    return `${
      k % 1 === 0
        ? k.toFixed(0)
        : k.toFixed(1)
    }k`;
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
      POSTS.map((p) => [
        p.id,
        p.score,
      ])
    )
  );

  const [comments, setComments] =
    useState(() =>
      Object.fromEntries(
        POSTS.map((p) => [
          p.id,
          p.comments,
        ])
      )
    );

  const [position, setPosition] =
    useState(0);

  const [statusIndex, setStatusIndex] =
    useState(0);

  const [tickerIndex, setTickerIndex] =
    useState(0);

  const [reading, setReading] =
    useState(128);

  const [scanned, setScanned] =
    useState(1400);

  const [voteFlash, setVoteFlash] =
    useState(null);

  const [commentFlash, setCommentFlash] =
    useState(null);

  const [votePop, setVotePop] =
    useState({});

  const [phase, setPhase] =
    useState("reading");

  const [finished, setFinished] =
    useState(false);

  const popCounter =
    useRef(0);


  /* =======================================================
     READER

     The reading cursor continuously moves through the feed.
     ======================================================= */

  useEffect(() => {
    if (phase !== "reading") return;

    const timer = setInterval(() => {
      setPosition(
        (p) =>
          (p + 1) % POSTS.length
      );

      setScanned(
        (s) =>
          s +
          Math.floor(
            Math.random() * 10
          ) +
          3
      );

    }, 1400);

    return () =>
      clearInterval(timer);

  }, [phase]);


  /* =======================================================
     VOTES

     The feed is changing while we read it.
     ======================================================= */

  useEffect(() => {
    if (phase !== "reading") return;

    const timer = setInterval(() => {

      const post =
        POSTS[
          Math.floor(
            Math.random() *
              POSTS.length
          )
        ];

      const amount =
        Math.floor(
          Math.random() * 35
        ) + 3;

      const uid =
        ++popCounter.current;

      setScores((prev) => ({
        ...prev,
        [post.id]:
          prev[post.id] + amount,
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

          if (
            prev[post.id]?.uid !== uid
          ) {
            return prev;
          }

          const next = {
            ...prev,
          };

          delete next[post.id];

          return next;

        });

      }, 850);


      setTimeout(() => {

        setVoteFlash(
          (current) =>
            current === post.id
              ? null
              : current
        );

      }, 400);

    }, 850);

    return () =>
      clearInterval(timer);

  }, [phase]);


  /* =======================================================
     COMMENTS

     Comments independently grow.
     ======================================================= */

  useEffect(() => {
    if (phase !== "reading") return;

    const timer = setInterval(() => {

      const post =
        POSTS[
          Math.floor(
            Math.random() *
              POSTS.length
          )
        ];

      setComments((prev) => ({
        ...prev,
        [post.id]:
          prev[post.id] +
          Math.floor(
            Math.random() * 3
          ) +
          1,
      }));

      setCommentFlash(post.id);


      setTimeout(() => {

        setCommentFlash(
          (current) =>
            current === post.id
              ? null
              : current
        );

      }, 500);

    }, 1400);

    return () =>
      clearInterval(timer);

  }, [phase]);


  /* =======================================================
     PEOPLE READING
     ======================================================= */

  useEffect(() => {
    if (phase !== "reading") return;

    const timer = setInterval(() => {

      setReading(
        (r) =>
          r +
          Math.floor(
            Math.random() * 3
          )
      );

    }, 1000);

    return () =>
      clearInterval(timer);

  }, [phase]);


  /* =======================================================
     STATUS
     ======================================================= */

  useEffect(() => {
    if (phase !== "reading") return;

    const timer = setInterval(() => {

      setStatusIndex(
        (i) =>
          (i + 1) %
          STATUS_MESSAGES.length
      );

    }, 2400);

    return () =>
      clearInterval(timer);

  }, [phase]);


  /* =======================================================
     TICKER
     ======================================================= */

  useEffect(() => {
    if (phase !== "reading") return;

    const timer = setInterval(() => {

      setTickerIndex(
        (i) =>
          (i + 1) %
          TICKER_MESSAGES.length
      );

    }, 2200);

    return () =>
      clearInterval(timer);

  }, [phase]);


  /* =======================================================
     RANKED POSTS

     THIS is the important combination.

     The reader moves through posts while their positions
     can change because their scores are changing.
     ======================================================= */

  const ranked = useMemo(() => {

    return POSTS
      .map((post) => ({
        ...post,
        score:
          scores[post.id],
        comments:
          comments[post.id],
      }))
      .sort(
        (a, b) =>
          b.score - a.score
      );

  }, [scores, comments]);


  /* =======================================================
     CURRENT POST

     The reading cursor follows the currently selected
     piece of content.
     ======================================================= */

  const currentPost =
    POSTS[position];


  /* =======================================================
     TOTAL KARMA
     ======================================================= */

  const totalKarma =
    Object.values(scores).reduce(
      (sum, score) =>
        sum + score,
      0
    );


  /* =======================================================
     EXIT

     Parent can still tell it when the real app is ready.
     ======================================================= */

  useEffect(() => {

    if (
      !ready ||
      phase !== "reading"
    ) {
      return;
    }

    setPhase("pause");

    const t1 = setTimeout(() => {

      setPhase("welcome");

      const t2 =
        setTimeout(() => {

          setFinished(true);

          const t3 =
            setTimeout(() => {
              onComplete?.();
            }, 500);

          return () =>
            clearTimeout(t3);

        }, 750);

      return () =>
        clearTimeout(t2);

    }, 500);

    return () =>
      clearTimeout(t1);

  }, [
    ready,
    phase,
    onComplete,
  ]);


  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div
      className={`living-loader ${
        finished
          ? "finished"
          : ""
      }`}
    >

      <div className="living-content">


        {/* =================================================
            COMMUNITY
            ================================================= */}

        <div className="living-community">

          <span className="community-mark" />

          <span>
            THE COMMUNITY
          </span>

        </div>


        {/* =================================================
            LIVE COMMUNITY PULSE

            Directly from loader #2.
            ================================================= */}

        <div className="living-pulse">

          <div className="pulse-avatars">

            <span />
            <span />
            <span />
            <span />

          </div>

          <span className="reading-count">
            {reading.toLocaleString()}
            {" "}
            reading now
          </span>

          <span className="pulse-divider" />

          <span
            key={tickerIndex}
            className="ticker"
          >
            {
              TICKER_MESSAGES[
                tickerIndex
              ]
            }
          </span>

        </div>


        {/* =================================================
            READING WINDOW

            Directly preserves loader #1's concept.
            ================================================= */}

        <div className="reading-window">

          <div className="reading-line top" />


          {/* -----------------------------------------------
              SCROLLING FEED
              ----------------------------------------------- */}

          <div
            className="feed-scroll"
            style={{
              transform:
                `translateY(-${
                  position * 0
                }px)`,
            }}
          >

            {ranked.map(
              (post, index) => {

                const distance =
                  index -
                  (
                    ranked.findIndex(
                      (p) =>
                        p.id ===
                        currentPost.id
                    )
                  );

                let state =
                  "future";

                if (
                  post.id ===
                  currentPost.id
                ) {
                  state =
                    "current";
                } else if (
                  distance < 0
                ) {
                  state =
                    "past";
                }

                return (
                  <div
                    key={post.id}
                    className={`reading-post ${state}`}
                  >

                    {/* SUBREDDIT */}

                    <div className="post-sub">

                      <span
                        className="post-avatar"
                        style={{
                          background:
                            post.id % 2
                              ? "#ff5700"
                              : "#6d78d8",
                        }}
                      />

                      {post.subreddit}

                    </div>


                    {/* TITLE */}

                    <div className="reading-title">

                      {post.text}

                    </div>


                    {/* META */}

                    <div className="reading-meta">

                      <span
                        className={
                          voteFlash ===
                          post.id
                            ? "vote-active"
                            : ""
                        }
                      >
                        ↑{" "}
                        {formatScore(
                          post.score
                        )}
                      </span>


                      <span
                        className={
                          commentFlash ===
                          post.id
                            ? "comment-active"
                            : ""
                        }
                      >
                        💬{" "}
                        {post.comments}
                      </span>


                      {/* +VOTES */}

                      {votePop[
                        post.id
                      ] && (

                        <span
                          key={
                            votePop[
                              post.id
                            ].uid
                          }
                          className="vote-pop"
                        >
                          +
                          {
                            votePop[
                              post.id
                            ].amount
                          }
                        </span>

                      )}

                    </div>

                  </div>
                );
              }
            )}

          </div>


          <div className="reading-line bottom" />

        </div>


        {/* =================================================
            STATUS
            ================================================= */}

        <div className="living-status">

          {phase ===
            "reading" && (
            <>
              <span className="status-pulse" />

              <span
                key={statusIndex}
                className="status-text"
              >
                {
                  STATUS_MESSAGES[
                    statusIndex
                  ]
                }
              </span>
            </>
          )}


          {phase === "pause" && (
            <>
              <span className="status-pulse" />

              <span>
                found something
              </span>
            </>
          )}


          {phase ===
            "welcome" && (
            <span className="welcome">
              welcome back.
            </span>
          )}

        </div>


        {/* =================================================
            FOOTER
            ================================================= */}

        <div className="living-meta">

          <span>
            LISTENING TO THE INTERNET
          </span>

          <span>
            {scanned.toLocaleString()}
            {" "}
            read
          </span>

        </div>


        {/* =================================================
            RANKING META

            Directly from loader #2.
            ================================================= */}

        <div className="ranking-meta">

          <span>
            RANKING THE FRONT PAGE
          </span>

          <span>
            {totalKarma.toLocaleString()}
            {" "}
            karma
          </span>

        </div>

      </div>

    </div>
  );
}