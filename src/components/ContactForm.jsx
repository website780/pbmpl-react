import { useState } from 'react';
import { sendEnquiry } from '../lib/sendEnquiry';

const EMPTY = { first_name: '', last_name: '', company: '', job_title: '', email: '', phone: '', inquiry_type: '', message: '', _honey: '' };

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState({ state: 'idle', text: '' });

  const set = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    if (values._honey) return; // bots fill the hidden field
    setStatus({ state: 'sending', text: '' });
    const { _honey, ...data } = values;
    const name = (data.first_name + ' ' + data.last_name).trim();
    try {
      await sendEnquiry({ ...data, name }, 'New website enquiry from ' + name);
      setValues(EMPTY);
      setStatus({ state: 'ok', text: 'Thank you. Your message has been sent and we will get back to you soon.' });
    } catch (err) {
      setStatus({ state: 'error', text: 'Sorry, we could not send your message. Please try again or email info@pbmpl.com.' });
    }
  }

  return (
    <form className="cform" onSubmit={submit} noValidate={false}>
      <div className="cform__row">
        <input name="first_name" type="text" placeholder="First name *" aria-label="First name" autoComplete="given-name" required value={values.first_name} onChange={set} />
        <input name="last_name" type="text" placeholder="Last name" aria-label="Last name" autoComplete="family-name" value={values.last_name} onChange={set} />
      </div>
      <div className="cform__row">
        <input name="company" type="text" placeholder="Company name" aria-label="Company name" autoComplete="organization" value={values.company} onChange={set} />
        <input name="job_title" type="text" placeholder="Job title" aria-label="Job title" autoComplete="organization-title" value={values.job_title} onChange={set} />
      </div>
      <div className="cform__row cform__row--stack">
        <input name="email" type="email" placeholder="Email *" aria-label="Email" autoComplete="email" required value={values.email} onChange={set} />
        <input name="phone" type="tel" placeholder="Phone (+91)" aria-label="Phone" autoComplete="tel" value={values.phone} onChange={set} />
      </div>
      <select name="inquiry_type" aria-label="Inquiry type" required value={values.inquiry_type} onChange={set}>
        <option value="" disabled>Select inquiry *</option>
        <option value="General Inquiry">General Inquiry</option>
        <option value="Technical Support">Technical Support</option>
        <option value="Sales & Pricing">Sales &amp; Pricing</option>
      </select>
      <textarea name="message" rows="3" placeholder="How can we help you? *" aria-label="Your message" required value={values.message} onChange={set} />
      <input className="cform__trap" name="_honey" type="text" tabIndex="-1" autoComplete="off" aria-hidden="true" value={values._honey} onChange={set} />
      <div className="cform__foot">
        <button type="submit" className="cform__btn" disabled={status.state === 'sending'}>
          {status.state === 'sending' ? 'Sending…' : 'Send Message'} <span aria-hidden="true">→</span>
        </button>
        {status.text ? (
          <p className={'cform__msg cform__msg--' + status.state} role="status">{status.text}</p>
        ) : null}
      </div>
    </form>
  );
}
