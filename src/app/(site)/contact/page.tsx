import type { Metadata } from 'next'
import { PageHero } from '@/components/blocks/PageHero'
import { ContactForm } from '@/components/blocks/ContactForm'
import { MapPin, Phone, Mail, Printer } from 'lucide-react'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Institute of Quality Malaysia secretariat.',
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        breadcrumbs={[{ label: 'Contact' }]}
      />

      {/* Load Cloudflare Turnstile */}
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12">

          {/* Contact details */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl text-primary font-normal mb-6">
                Get In Touch
              </h2>
              <p className="text-foreground/75 leading-relaxed mb-6">
                For membership enquiries, MRCA registration, or general questions,
                please contact the IQM Secretariat using the details below or by
                submitting the form.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-primary text-sm mb-0.5">Address</p>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    Institute of Quality Malaysia<br />
                    Kuala Lumpur, Malaysia
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-primary text-sm mb-0.5">Phone</p>
                  <a href="tel:+60" className="text-foreground/70 text-sm hover:text-accent transition-colors">
                    Please contact via email
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-primary text-sm mb-0.5">Email</p>
                  <a
                    href="mailto:contact@iqm.org.my"
                    className="text-foreground/70 text-sm hover:text-accent transition-colors"
                  >
                    contact@iqm.org.my
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-lg p-5">
              <p className="text-sm text-foreground/70 leading-relaxed">
                <span className="font-semibold text-primary">MRCA Payments:</span>{' '}
                Cheques payable to <em>"Institute of Quality M'sia (MRCA-Program)"</em>.
                Online transfer to Maybank A/C No. <strong>5141 8721 3265</strong>.
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="font-display text-2xl text-primary font-normal mb-6">
              Send a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  )
}
