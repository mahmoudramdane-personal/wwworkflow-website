import { useState } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const isConfigured = SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConfigured) {
      setStatus('error');
      setErrorMsg('Le service de messagerie n\'est pas encore configuré.');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          to_email: 'mahmoud@wwworkflows.com',
        },
        PUBLIC_KEY
      );
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setErrorMsg('Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou nous contacter directement par email.');
    }
  };

  if (!isConfigured) {
    return (
      <div className="bg-neutral-100 border border-neutral-300 rounded-lg p-6 text-center">
        <p className="text-neutral-600 mb-2">
          Le formulaire de contact sera bientôt activé.
        </p>
        <p className="text-sm text-neutral-500">
          En attendant, écrivez-nous directement à{' '}
          <a href="mailto:mahmoud@wwworkflows.com" className="underline text-black">
            mahmoud@wwworkflows.com
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">
      {status === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 text-center">
          ✅ Message envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
        </div>
      )}

      {status === 'error' && errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-center">
          ❌ {errorMsg}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">Nom</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-lg border-neutral-300 bg-white px-4 py-3 text-black focus:border-black focus:ring-black"
          placeholder="Votre nom"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg border-neutral-300 bg-white px-4 py-3 text-black focus:border-black focus:ring-black"
          placeholder="vous@exemple.com"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1">Sujet</label>
        <select
          name="subject"
          id="subject"
          required
          value={form.subject}
          onChange={handleChange}
          className="w-full rounded-lg border-neutral-300 bg-white px-4 py-3 text-black focus:border-black focus:ring-black"
        >
          <option value="">Sélectionnez un sujet</option>
          <option value="formation-entreprise">Formation en entreprise</option>
          <option value="cours-en-ligne">Cours en ligne</option>
          <option value="partenariat">Partenariat</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
        <textarea
          name="message"
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="w-full rounded-lg border-neutral-300 bg-white px-4 py-3 text-black focus:border-black focus:ring-black"
          placeholder="Décrivez votre besoin..."
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-lg bg-black px-6 py-3 text-white font-medium hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {status === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>
    </form>
  );
}
