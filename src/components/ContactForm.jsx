import { useState } from "react";
import { instagram, instagramHandle, services, shop } from "../data/site.js";

/** Default: Zoneout Customs build brief. Pass props to reuse for another business. */
const customsSetup = {
  kicker: "Work order",
  subject: "Build brief",
  to: { email: shop.email, whatsapp: shop.whatsapp, handle: instagramHandle(instagram.profile) },
  subjectField: { label: "Bike", placeholder: "Year, make, model", error: "Tell us the bike." },
  optionsLabel: "Work needed",
  options: services.map((service) => service.title),
  jobLabel: "The job",
  jobPlaceholder: "What should be different when it leaves?",
};

const empty = { name: "", phone: "", subject: "", job: "", picks: [] };

export default function ContactForm(props) {
  const setup = { ...customsSetup, ...props };
  const { to } = setup;
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);
  const [copied, setCopied] = useState(false);

  const channels = [to.whatsapp && "whatsapp", to.email && "email", to.handle && "instagram"].filter(Boolean);
  const primary = channels[0];

  function briefText() {
    const lines = [
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `${setup.subjectField.label}: ${form.subject.trim()}`,
    ];
    if (form.picks.length) lines.push(`${setup.optionsLabel}: ${form.picks.join(", ")}`);
    return [...lines, "", form.job.trim()].join("\n");
  }

  function update(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  function toggle(option) {
    setForm((current) => ({
      ...current,
      picks: current.picks.includes(option)
        ? current.picks.filter((item) => item !== option)
        : [...current.picks, option],
    }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Add your name.";
    if (form.phone.replace(/\D/g, "").length < 7) next.phone = "Add a phone number.";
    if (!form.subject.trim()) next.subject = setup.subjectField.error;
    if (form.job.trim().length < 8) next.job = "Tell us a little more.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function send(channel) {
    if (!validate()) return;
    const text = briefText();
    if (channel === "whatsapp") {
      window.open(`https://wa.me/${to.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    } else if (channel === "email") {
      const subject = encodeURIComponent(`${setup.subject} — ${form.subject.trim()}`);
      window.location.href = `mailto:${to.email}?subject=${subject}&body=${encodeURIComponent(text)}`;
    } else {
      navigator.clipboard?.writeText(text).then(() => setCopied(true), () => {});
      window.open(`https://ig.me/m/${to.handle}`, "_blank", "noopener");
    }
    setSent({ channel, text });
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(sent.text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const sentMessage = {
    whatsapp: "WhatsApp should have opened with your message filled in. Press send there to reach us.",
    email: `Your mail app should have opened with the message addressed to ${to.email}. Press send there to reach us.`,
    instagram: `Instagram should have opened a chat with @${to.handle}. Your message is copied, so paste it there and send.`,
  };

  const label = { whatsapp: "Send on WhatsApp", email: "Send by email", instagram: "Send as Instagram DM" };

  if (sent) {
    return (
      <div className="sheet">
        <p className="sheet-kicker">{setup.kicker}</p>
        <div className="sent" role="status">
          <h3>Message is ready.</h3>
          <p>{sentMessage[sent.channel]}</p>
          <p>Nothing opened? Copy it and send it another way:</p>
          <pre className="brief">{sent.text}</pre>
          <div className="sent-actions">
            <button type="button" className="btn btn-ink" onClick={copy}>
              {copied ? "Copied" : "Copy message"}
            </button>
            {to.handle && sent.channel !== "instagram" && (
              <a className="btn btn-line" href={`https://ig.me/m/${to.handle}`} target="_blank" rel="noreferrer">
                DM on Instagram
              </a>
            )}
            <button
              type="button"
              className="btn btn-line"
              onClick={() => {
                setSent(null);
                setCopied(false);
                setForm(empty);
              }}
            >
              Write another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sheet">
      <p className="sheet-kicker">{setup.kicker}</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          send(primary);
        }}
        noValidate
      >
        <div className="field-row">
          <label className="field">
            <span>Name</span>
            <input name="name" autoComplete="name" value={form.name} onChange={update} aria-invalid={Boolean(errors.name)} />
            {errors.name && <small>{errors.name}</small>}
          </label>
          <label className="field">
            <span>Phone</span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={update}
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone && <small>{errors.phone}</small>}
          </label>
        </div>
        <label className="field">
          <span>{setup.subjectField.label}</span>
          <input
            name="subject"
            value={form.subject}
            onChange={update}
            placeholder={setup.subjectField.placeholder}
            aria-invalid={Boolean(errors.subject)}
          />
          {errors.subject && <small>{errors.subject}</small>}
        </label>
        <fieldset className="field chips">
          <legend>
            <span>{setup.optionsLabel}</span>
          </legend>
          {setup.options.map((option) => (
            <label key={option} className="chip">
              <input type="checkbox" checked={form.picks.includes(option)} onChange={() => toggle(option)} />
              <span>{option}</span>
            </label>
          ))}
        </fieldset>
        <label className="field">
          <span>{setup.jobLabel}</span>
          <textarea
            name="job"
            rows="4"
            value={form.job}
            onChange={update}
            placeholder={setup.jobPlaceholder}
            aria-invalid={Boolean(errors.job)}
          />
          {errors.job && <small>{errors.job}</small>}
        </label>
        <div className="sent-actions">
          <button type="submit" className="btn btn-ink">
            {label[primary]}
          </button>
          {channels.slice(1).map((channel) => (
            <button key={channel} type="button" className="btn btn-line" onClick={() => send(channel)}>
              {label[channel]}
            </button>
          ))}
        </div>
        <p className="form-note">
          This opens the app with your message ready. Nothing is sent until you press send there.
        </p>
      </form>
    </div>
  );
}
