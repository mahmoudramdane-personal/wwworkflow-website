import Head from 'next/head';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact — Afterwork Workflow</title>
        <meta name="description" content="Contactez Afterwork Workflow pour une formation en entreprise ou un cours en ligne." />
      </Head>

      <main className="min-h-screen bg-[#FAFAF7] py-16 px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-eb font-bold text-black mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg text-neutral-600 font-alt">
            Une question sur nos formations ? Un besoin en entreprise ?
            <br />
            Écrivez-nous ou appelez-nous directement.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row justify-center gap-8 text-center mb-12">
            <a
              href="mailto:mahmoud@wwworkflows.com"
              className="text-black hover:underline font-medium"
            >
              mahmoud@wwworkflows.com
            </a>
            <a
              href="tel:+212****3222"
              className="text-black hover:underline font-medium"
            >
              +212 6 23 63 32 22
            </a>
          </div>
        </div>

        <ContactForm />
      </main>
    </>
  );
}
