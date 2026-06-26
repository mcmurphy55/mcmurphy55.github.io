import './App.css'
import type { CSSProperties } from 'react'

type AppProfile = {
  name: string
  url: string
  accent: string
  shadow: string
  summary: string
  description: string
  highlights: string[]
  stack: string[]
  images: {
    src: string
    alt: string
  }[]
}

type AccentStyle = CSSProperties & {
  '--accent': string
  '--accent-shadow': string
}

const appProfiles: AppProfile[] = [
  {
    name: 'Cinemagora',
    url: 'https://apps.apple.com/jp/app/cinemagora/id6759182517',
    accent: '#e65f2a',
    shadow: 'rgba(230, 95, 42, 0.22)',
    summary: '映画を観た直後の熱量を、少人数の会話へつなぐ。',
    description:
      '日本で上映中の映画を評価・記録し、2〜4人の安全なセッションで感想を語り合えるiOSアプリ。映画ごとの待機列、レビュー、フレンド、通報・ブロックまで含めて設計しています。',
    highlights: ['上映中映画の一覧と評価記録', '映画単位のマッチング', 'UGC安全機能と審査用デモ'],
    stack: ['SwiftUI', 'Firebase', 'Cloud Functions', 'App Store Review'],
    images: [
      {
        src: '/apps/cinemagora/talk.png',
        alt: 'Cinemagoraの討論セッション紹介スクリーンショット',
      },
      {
        src: '/apps/cinemagora/match.png',
        alt: 'Cinemagoraのランダムマッチ紹介スクリーンショット',
      },
    ],
  },
  {
    name: 'Attention',
    url: 'https://apps.apple.com/jp/app/attention-moon-study-timer/id6767784989',
    accent: '#1f4f8f',
    shadow: 'rgba(31, 79, 143, 0.22)',
    summary: '月が欠けるまで、スマホの誘惑を閉じる集中タイマー。',
    description:
      '勉強時間を予約し、その間だけ選んだアプリやWebサイトをブロックするiOS向けフォーカスアプリ。月のビジュアルタイマー、ホーホー、Apple Watch連携、StoreKitの買い切り導線まで作り込んでいます。',
    highlights: ['Screen Time API連携', '月のビジュアルタイマー', 'Watch / Live Activity対応'],
    stack: ['SwiftUI', 'Screen Time API', 'WidgetKit', 'StoreKit 2'],
    images: [
      {
        src: '/apps/attention/home.png',
        alt: 'Attentionのホーム画面スクリーンショット',
      },
      {
        src: '/apps/attention/timer.png',
        alt: 'Attentionの月タイマー画面スクリーンショット',
      },
    ],
  },
  {
    name: 'Uchinalingo',
    url: 'https://apps.apple.com/jp/app/uchinalingo/id6753190366',
    accent: '#008f8c',
    shadow: 'rgba(0, 143, 140, 0.22)',
    summary: 'うちなーぐちを、レッスンとクイズで続けられる形に。',
    description:
      '沖縄語・沖縄文化を学ぶためのiOSアプリ。日常会話、地名、苗字、歴史テーマなどを、日英対応のレッスン・復習・チェックポイントとして体験できるようにしています。',
    highlights: ['日英対応レッスン', 'クイズと復習フロー', '文化テーマ別コンテンツ'],
    stack: ['SwiftUI', 'Localization', 'XCTest', 'App Store Assets'],
    images: [
      {
        src: '/apps/uchinalingo/home.png',
        alt: 'Uchinalingoのホーム画面スクリーンショット',
      },
      {
        src: '/apps/uchinalingo/lesson.png',
        alt: 'Uchinalingoのレッスン画面スクリーンショット',
      },
    ],
  },
]

const githubIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="buttonIcon">
    <path
      fill="currentColor"
      d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.35 1.08 2.92.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.01c.85 0 1.7.11 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
    />
  </svg>
)

const appStoreIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="buttonIcon">
    <path
      fill="currentColor"
      d="M16.36 12.7c-.02-2.07 1.69-3.06 1.77-3.11-.96-1.41-2.46-1.6-3-1.62-1.27-.13-2.49.75-3.14.75-.65 0-1.65-.73-2.72-.71-1.4.02-2.69.81-3.41 2.07-1.45 2.52-.37 6.25 1.04 8.29.69 1 1.51 2.12 2.58 2.08 1.04-.04 1.43-.67 2.69-.67 1.25 0 1.6.67 2.69.65 1.11-.02 1.82-1.02 2.5-2.02.79-1.16 1.11-2.28 1.13-2.34-.03-.01-2.17-.83-2.19-3.29ZM14.3 6.58c.57-.69.96-1.65.85-2.6-.82.03-1.82.55-2.41 1.24-.53.6-1 1.58-.87 2.51.91.07 1.85-.46 2.43-1.15Z"
    />
  </svg>
)

function PhoneMockup({ image, offset = false }: { image: AppProfile['images'][number]; offset?: boolean }) {
  return (
    <figure className={`phone ${offset ? 'phoneOffset' : ''}`}>
      <img src={image.src} alt={image.alt} />
    </figure>
  )
}

function AppSection({ app, index }: { app: AppProfile; index: number }) {
  const accentStyle: AccentStyle = {
    '--accent': app.accent,
    '--accent-shadow': app.shadow,
  }

  return (
    <article className="appPanel" style={accentStyle}>
      <div className="appCopy">
        <p className="sectionNumber">{String(index + 1).padStart(2, '0')}</p>
        <h2>{app.name}</h2>
        <p className="appSummary">{app.summary}</p>
        <p className="appDescription">{app.description}</p>
        <ul className="highlights" aria-label={`${app.name}の主要機能`}>
          {app.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <div className="stackList" aria-label={`${app.name}の技術スタック`}>
          {app.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <a className="githubButton" href={app.url} target="_blank" rel="noreferrer">
          {appStoreIcon}
          App Storeで見る
        </a>
      </div>
      <div className="appScreens" aria-label={`${app.name}のスクリーンショット`}>
        {app.images.map((image, imageIndex) => (
          <PhoneMockup key={image.src} image={image} offset={imageIndex === 1} />
        ))}
      </div>
    </article>
  )
}

function App() {
  return (
    <main>
      <header className="siteHeader">
        <a href="#top" className="brandLink" aria-label="ページ先頭へ">
          mc
        </a>
        <nav aria-label="アプリ紹介">
          {appProfiles.map((app) => (
            <a key={app.name} href={`#${app.name.toLowerCase()}`}>
              {app.name}
            </a>
          ))}
        </nav>
      </header>

      <section className="heroSection" id="top">
        <div className="heroCopy">
          <h1>iOS Apps</h1>
          <p>
            映画、集中、沖縄語学習。日常の熱量を扱う3つのiOSアプリを、企画から実装、App Store提出準備まで一貫して作っています。
          </p>
          <div className="heroActions">
            <a href="#apps" className="primaryAction">
              3つのアプリを見る
            </a>
            <a href="https://github.com/mcmurphy55" className="secondaryAction" target="_blank" rel="noreferrer">
              {githubIcon}
              GitHub Profile
            </a>
          </div>
        </div>
        <div className="heroVisual" aria-label="3つのiOSアプリのスクリーンショット">
          <PhoneMockup image={appProfiles[0].images[0]} />
          <PhoneMockup image={appProfiles[1].images[1]} offset />
          <PhoneMockup image={appProfiles[2].images[0]} />
        </div>
      </section>

      <section className="introBand" aria-label="開発テーマ">
        <p>SwiftUI apps</p>
        <p>Product design</p>
        <p>App Store assets</p>
        <p>Runtime QA</p>
      </section>

      <section className="appsSection" id="apps" aria-label="iOSアプリ一覧">
        {appProfiles.map((app, index) => (
          <section key={app.name} id={app.name.toLowerCase()} className="appAnchor">
            <AppSection app={app} index={index} />
          </section>
        ))}
      </section>

      <footer className="siteFooter">
        <p>mcmurphy55</p>
        <a href="https://github.com/mcmurphy55" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </footer>
    </main>
  )
}

export default App
