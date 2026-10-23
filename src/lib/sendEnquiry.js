// Emails a form submission to the company inbox through FormSubmit (no server of our own needed).
export const SEND_TO = 'website@alphabetasolution.com';
const ENDPOINT = 'https://formsubmit.co/ajax/' + SEND_TO;

export async function sendEnquiry(fields, subject) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...fields, _subject: subject, _template: 'table', _replyto: fields.email }),
  });
  const out = await res.json().catch(() => ({}));
  if (!res.ok || String(out.success) === 'false') throw new Error(out.message || 'Request failed');
  return out;
}
