'use client'

import { useState } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const organizationTypes = [
  'Please Select',
  'Corporation / Large Business',
  'Small / Medium Business',
  'Non-Profit Organization',
  'Government / Public Sector',
  'Individual / Freelancer',
  'Media / Press',
  'Agency / PR Firm',
  'Other',
]

const subjectOptions = [
  'Please Select',
  'General Enquiry',
  'Press Release Submission',
  'Editorial Question',
  'Partnership Opportunity',
  'Correction Request',
  'Technical Support',
  'Billing / Account',
  'Other',
]

export function ContactPageOverride() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    orgType: 'Please Select',
    subject: 'Please Select',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Contact name is required.'
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (form.orgType === 'Please Select') e.orgType = 'Please select an organisation type.'
    if (form.subject === 'Please Select') e.subject = 'Please select a subject.'
    if (!form.message.trim()) e.message = 'Message is required.'
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#fbf6ee] text-[#241711]">
      <NavbarShell />
      <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">

        {/* Page heading */}
        <h1 className="text-center font-display text-4xl font-semibold tracking-[-0.04em] text-[#241711] sm:text-5xl">
          Contact Us
        </h1>

        <div className="mt-10">
          {submitted ? (
            <div className="mx-auto max-w-2xl rounded-[2rem] border border-[#dcc8b7] bg-[#fffdfa] p-10 text-center shadow-[0_24px_60px_rgba(77,47,27,0.08)]">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#241711] text-[#fff1e2] text-2xl font-bold">✓</div>
              <h2 className="mt-5 text-2xl font-semibold text-[#241711]">Message sent</h2>
              <p className="mt-3 text-sm leading-7 text-[#6e5547]">
                Thank you for reaching out. We'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', orgType: 'Please Select', subject: 'Please Select', message: '' }) }}
                className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-[#241711] px-7 text-sm font-semibold text-[#fff1e2] transition hover:bg-[#3a241b]"
              >
                Send another message
              </button>
            </div>
          ) : (
            <div className="rounded-[2rem] border border-[#dcc8b7] bg-[#fffdfa] p-7 shadow-[0_24px_60px_rgba(77,47,27,0.08)] sm:p-10">

              <form onSubmit={handleSubmit} noValidate className="space-y-6">

                {/* Row 1: Name + Phone */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#241711]">
                      Contact Name <span className="text-[#b94040]">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-[#241711] placeholder:text-[#b0a090] focus:outline-none focus:ring-2 focus:ring-[#241711]/20 ${errors.name ? 'border-[#b94040]' : 'border-[#dcc8b7]'}`}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="mt-1 text-xs text-[#b94040]">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#241711]">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="h-11 w-full rounded-xl border border-[#dcc8b7] bg-white px-4 text-sm text-[#241711] placeholder:text-[#b0a090] focus:outline-none focus:ring-2 focus:ring-[#241711]/20"
                      placeholder="e.g. +1 888 000 0000"
                    />
                  </div>
                </div>

                {/* Row 2: Email */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#241711]">
                    Email <span className="text-[#b94040]">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-[#241711] placeholder:text-[#b0a090] focus:outline-none focus:ring-2 focus:ring-[#241711]/20 ${errors.email ? 'border-[#b94040]' : 'border-[#dcc8b7]'}`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-[#b94040]">{errors.email}</p>}
                </div>

                {/* Divider label */}
                <p className="text-sm font-medium text-[#6e5547]">Help us understand your needs a little more.</p>

                {/* Row 3: Org type + Subject */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#241711]">
                      What type of organisation are you? <span className="text-[#b94040]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={form.orgType}
                        onChange={(e) => setForm({ ...form, orgType: e.target.value })}
                        className={`h-11 w-full appearance-none rounded-xl border bg-white px-4 pr-9 text-sm text-[#241711] focus:outline-none focus:ring-2 focus:ring-[#241711]/20 ${errors.orgType ? 'border-[#b94040]' : 'border-[#dcc8b7]'}`}
                      >
                        {organizationTypes.map((o) => (
                          <option key={o} value={o} disabled={o === 'Please Select'}>{o}</option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6e5547]">▾</span>
                    </div>
                    {errors.orgType && <p className="mt-1 text-xs text-[#b94040]">{errors.orgType}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#241711]">
                      Subject: How may we help you? <span className="text-[#b94040]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className={`h-11 w-full appearance-none rounded-xl border bg-white px-4 pr-9 text-sm text-[#241711] focus:outline-none focus:ring-2 focus:ring-[#241711]/20 ${errors.subject ? 'border-[#b94040]' : 'border-[#dcc8b7]'}`}
                      >
                        {subjectOptions.map((s) => (
                          <option key={s} value={s} disabled={s === 'Please Select'}>{s}</option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6e5547]">▾</span>
                    </div>
                    {errors.subject && <p className="mt-1 text-xs text-[#b94040]">{errors.subject}</p>}
                  </div>
                </div>

                {/* Row 4: Message */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#241711]">
                    Message / Comment <span className="text-[#b94040]">*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-[#241711] placeholder:text-[#b0a090] focus:outline-none focus:ring-2 focus:ring-[#241711]/20 resize-none ${errors.message ? 'border-[#b94040]' : 'border-[#dcc8b7]'}`}
                    placeholder="Share the full context so we can respond with the right next step."
                  />
                  {errors.message && <p className="mt-1 text-xs text-[#b94040]">{errors.message}</p>}
                </div>

                {/* Submit */}
                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-[#241711] px-10 text-sm font-semibold text-[#fff1e2] transition hover:bg-[#3a241b] focus:outline-none focus:ring-2 focus:ring-[#241711]/40"
                  >
                    Submit Now
                  </button>
                </div>

              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
