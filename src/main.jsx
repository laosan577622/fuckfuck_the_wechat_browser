import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";


class BrowserCheck {
  constructor(userAgent = navigator.userAgent || "") {
    const ua = userAgent;
    const isTouchMac =
      navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

    this.userAgent = ua;
    this.Android = /Android|Linux/i.test(ua) && !isTouchMac;
    this.IPhone = /iPhone/i.test(ua);
    this.Ipad = /iPad/i.test(ua) || isTouchMac;
    this.Ios = /iPhone|iPod/i.test(ua) || this.Ipad;
    this.Opera = /Opera|OPR\//i.test(ua);
    this.IE = /compatible/i.test(ua) && /MSIE/i.test(ua) && !this.Opera;
    this.Edge = /Edg|Edge/i.test(ua);
    this.FireFox = /Firefox/i.test(ua);
    this.Safari = /Safari/i.test(ua) && !/Chrome|CriOS|Edg|Edge/i.test(ua);
    this.Chrome =
      !this.Edge && /Chrome|CriOS/i.test(ua) && /Safari/i.test(ua);
    this.IE11 = /Trident/i.test(ua) && /rv:11\.0/i.test(ua);
    this.Wechat = /MicroMessenger/i.test(ua);
    this.Weibo = /Weibo/i.test(ua);
    this.UCBrowser = /UCBrowser/i.test(ua);
    this.QQ = /QQ\//i.test(ua) || /V1_AND_SQ_/i.test(ua);
    this.QQBrowser = /MQQBrowser/i.test(ua) && !this.QQ;
    this.BlockedMessenger = this.Wechat || this.QQ;
  }
}


function ShieldIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="shield-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#8bb5ff" />
          <stop offset="100%" stopColor="#0a59f7" />
        </linearGradient>
      </defs>
      <path
        d="M32 6 50 13c2 .8 3.3 2.7 3.3 4.9v11.7c0 12.8-8.4 24.2-20.7 28l-.6.2-.6-.2C19.1 53.8 10.7 42.4 10.7 29.6V17.9c0-2.2 1.3-4.1 3.3-4.9L32 6Z"
        fill="url(#shield-gradient)"
      />
      <path
        d="m24.6 32.5 5 5.2 10.8-12"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4.5"
      />
    </svg>
  );
}


function LinkIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="28" fill="#e8f0ff" />
      <path
        d="M23.5 38.5 38.5 23.5m-7-2.2h9.2v9.2m-6.7 11.2h-10a7 7 0 0 1 0-14h3.5"
        fill="none"
        stroke="#0a59f7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.8"
      />
    </svg>
  );
}


function CompassIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="28" fill="#e8f0ff" />
      <circle cx="32" cy="32" r="18" fill="#fff" stroke="#b9cffd" strokeWidth="2" />
      <path
        d="m41.7 22.3-6.6 15-15 6.6 6.6-15 15-6.6Z"
        fill="#0a59f7"
      />
      <circle cx="32" cy="32" r="2.4" fill="#fff" />
    </svg>
  );
}


function StepsIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="10" y="10" width="44" height="44" rx="16" fill="#e8f0ff" />
      <path
        d="M22 24h20M22 32h20M22 40h13"
        fill="none"
        stroke="#0a59f7"
        strokeLinecap="round"
        strokeWidth="4"
      />
      <circle cx="45.5" cy="40" r="4.5" fill="#0a59f7" />
    </svg>
  );
}


function EnvironmentBadge({ browser }) {
  let label = "外部浏览器";

  if (browser.Wechat) {
    label = "微信内打开";
  } else if (browser.QQ) {
    label = "QQ 内打开";
  } else if (browser.QQBrowser) {
    label = "QQ 浏览器";
  } else if (browser.Safari) {
    label = "Safari";
  } else if (browser.Chrome) {
    label = "Chrome";
  }

  return <span className="environment-badge">{label}</span>;
}


function DetectionItem({ label, active }) {
  return (
    <div className={`detection-item ${active ? "is-active" : ""}`}>
      <span>{label}</span>
      <strong>{active ? "已命中" : "未命中"}</strong>
    </div>
  );
}


function StepCard({ index, step }) {
  const icons = [
    <StepsIcon key="steps" />,
    <LinkIcon key="link" />,
    <CompassIcon key="compass" />,
    <ShieldIcon key="shield" />,
  ];

  return (
    <article className="step-card">
      <div className="step-card-top">
        <div className="step-icon">{icons[index - 1] || <StepsIcon />}</div>
        <span className="step-index">0{index}</span>
      </div>
      <h3>{step.title}</h3>
      <p>{step.description}</p>
    </article>
  );
}


function getHelpSteps(browser) {
  const sourceName = browser.Wechat ? "微信聊天页" : browser.QQ ? "QQ 聊天页" : "聊天页面";

  return [
    {
      title: "返回聊天页面",
      description: `先回到${sourceName}，重新找到刚才打开的原始链接。`,
    },
    {
      title: "复制原有地址",
      description: "长按消息中的链接，或用聊天菜单复制链接地址，不要继续在内置浏览器里操作。",
    },
    {
      title: "切换系统浏览器",
      description: "打开 Safari、Chrome，或你的系统默认浏览器，准备重新访问。",
    },
    {
      title: "粘贴后重新打开",
      description: "把刚才复制的地址粘贴到浏览器地址栏，再访问一次即可获得完整体验。",
    },
  ];
}


function getQuickTips(browser) {
  const tips = [];

  if (browser.Wechat || browser.QQ) {
    tips.push("当前环境可能限制下载、跳转、登录或支付唤起，建议改用系统浏览器。");
    tips.push("如果聊天页里还能看到链接，优先直接复制原始地址，这样最稳妥。");

    if (browser.Wechat) {
      tips.push("部分机型支持从右上角菜单选择“在浏览器打开”，但复制原链接通常兼容性更高。");
    }

    if (browser.QQ) {
      tips.push("若你在 QQ 菜单里看到了“浏览器打开”入口，也可以直接用它跳到系统浏览器。");
    }
  } else {
    tips.push("当前已不在微信 / QQ 内置浏览器中，可以继续正常访问。");
    tips.push("如果你需要把这套提示发给别人，可以直接截图或复制当前链接。");
  }

  return tips;
}


async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "readonly");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const success = document.execCommand("copy");
  document.body.removeChild(textarea);
  return success;
}


function App() {
  const [browser] = React.useState(() => new BrowserCheck());
  const [copyState, setCopyState] = React.useState("idle");

  const helpSteps = getHelpSteps(browser);
  const quickTips = getQuickTips(browser);
  const currentLink = window.location.href;

  const handleCopy = async () => {
    try {
      await copyText(currentLink);
      setCopyState("success");
    } catch (error) {
      setCopyState("error");
    }

    window.setTimeout(() => {
      setCopyState("idle");
    }, 2200);
  };

  const isBlocked = browser.BlockedMessenger;
  const title = isBlocked
    ? "请返回聊天页面，复制原有地址到浏览器打开"
    : "当前已经不在微信 / QQ 内置浏览器";
  const description = isBlocked
    ? "为了避免跳转、登录、下载和唤起能力被内置浏览器拦截，建议回到聊天窗口复制原始链接，再用系统浏览器重新打开。"
    : "检测结果显示你当前已经在外部浏览器环境中，这个页面可以正常继续访问。";

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">
            <ShieldIcon />
          </div>
          <div className="brand-copy">
            <strong>UA 守门员</strong>
            <span>微信 / QQ 内置浏览器检测页</span>
          </div>
        </div>
        <a
          className="capsule-button capsule-button-secondary"
          href="https://www.577622.xyz"
          target="_blank"
          rel="noreferrer"
        >
          老三 · www.577622.xyz
        </a>
      </header>

      <main className="page-main">
        <section className="hero-grid">
          <div className="hero-panel">
            <div className="hero-meta">
              <EnvironmentBadge browser={browser} />
              <span className="signal-dot" />
              <span className="hero-meta-text">
                {isBlocked ? "建议切换系统浏览器" : "当前环境可继续访问"}
              </span>
            </div>

            <h1>{title}</h1>
            <p className="hero-description">{description}</p>

            <div className="hero-actions">
              <button className="capsule-button capsule-button-primary" onClick={handleCopy}>
                {copyState === "success"
                  ? "链接已复制"
                  : copyState === "error"
                    ? "复制失败，请手动复制"
                    : "复制当前地址"}
              </button>
              <a className="capsule-button capsule-button-secondary" href="#steps">
                查看操作步骤
              </a>
            </div>

            <div className="tip-stack">
              {quickTips.map((tip) => (
                <div className="tip-row" key={tip}>
                  <span className="tip-bullet" />
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="status-panel">
            <div className="status-header">
              <div className="status-icon">
                <ShieldIcon />
              </div>
              <div>
                <h2>检测结果</h2>
                <p>把 `navigator.userAgent` 解析后存进 class，页面会基于结果给出提示。</p>
              </div>
            </div>

            <div className="detection-grid">
              <DetectionItem label="微信 UA" active={browser.Wechat} />
              <DetectionItem label="QQ UA" active={browser.QQ} />
              <DetectionItem label="QQ 浏览器" active={browser.QQBrowser} />
              <DetectionItem label="Safari" active={browser.Safari} />
              <DetectionItem label="Chrome" active={browser.Chrome} />
              <DetectionItem label="iOS 设备" active={browser.Ios} />
            </div>

            <div className="ua-block">
              <span className="ua-label">当前 UA</span>
              <code>{browser.userAgent}</code>
            </div>
          </aside>
        </section>

        <section className="steps-section" id="steps">
          <div className="section-heading">
            <span className="section-kicker">操作教学</span>
            <h2>四步切回正常浏览器</h2>
            <p>无论是微信还是 QQ 内打开，都可以按下面这套顺序处理。</p>
          </div>

          <div className="steps-grid">
            {helpSteps.map((step, index) => (
              <StepCard index={index + 1} key={step.title} step={step} />
            ))}
          </div>
        </section>

        <section className="reason-strip">
          <article className="reason-card">
            <h3>为什么要返回聊天页复制原链接</h3>
            <p>因为很多分享链路会在内置浏览器里被重写、截断，或者无法完整暴露浏览器能力。直接复制原始地址最稳。</p>
          </article>
          <article className="reason-card">
            <h3>为什么不建议继续在微信 / QQ 内打开</h3>
            <p>登录跳转、下载文件、支付唤起和跨应用拉起都可能被限制，容易出现“页面看起来正常，但功能不完整”的情况。</p>
          </article>
          <article className="reason-card">
            <h3>什么时候可以继续停留在当前页</h3>
            <p>只有当页面已经在 Safari、Chrome 或系统默认浏览器中打开时，才建议继续向后操作。</p>
          </article>
        </section>
      </main>
    </div>
  );
}


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
