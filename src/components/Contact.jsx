import { useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { motion, useInView } from "framer-motion";
import {
  HiOutlineExclamationCircle,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { IoLogoLinkedin } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Update to your public LinkedIn profile URL */
const LINKEDIN_PROFILE_URL =
  "https://www.linkedin.com/in/roshani-bhuva-0ba035277/";

function isValidOptionalUrl(s) {
  const t = s.trim();
  if (!t) return true;
  try {
    const u = /^https?:\/\//i.test(t) ? t : `https://${t}`;
    new URL(u);
    return true;
  } catch {
    return false;
  }
}

function validateFields(values) {
  const err = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();
  const website = values.website.trim();

  if (!name) err.name = "Please add your name.";
  if (!email) err.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email)) err.email = "Use a valid email address.";
  if (!message) err.message = "Tell me how I can help.";
  if (!isValidOptionalUrl(website))
    err.website = "Use a full link (e.g. https://yoursite.com).";

  return err;
}

function FieldError({ id, message }) {
  return message ? (
    <p
      id={id}
      role="alert"
      className="mt-2 flex items-start gap-2.5 rounded-xl border border-amber-200/80 bg-amber-50/90 px-3 py-2 text-[0.8125rem] font-medium leading-snug text-amber-900 shadow-sm dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-100"
    >
      <span
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-amber-500 text-white shadow-sm"
        aria-hidden
      >
        <HiOutlineExclamationCircle className="h-3.5 w-3.5" strokeWidth={2} />
      </span>
      <span>{message}</span>
    </p>
  ) : null;
}

FieldError.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.string,
};

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [values, setValues] = useState({
    name: "",
    email: "",
    website: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const inputBase =
    "w-full rounded-2xl border bg-surface px-5 py-3.5 text-sm text-foreground placeholder:text-muted outline-none transition focus:ring-1";

  const inputNormal = `${inputBase} border-foreground/10 focus:border-accent focus:ring-accent/40`;
  const inputError = `${inputBase} border-amber-400/80 bg-amber-50/50 focus:border-amber-500 focus:ring-amber-400/30 dark:border-amber-500/45 dark:bg-amber-950/25`;

  const clearError = useCallback((key) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const handleChange = (key) => (e) => {
    const v = e.target.value;
    setValues((prev) => ({ ...prev, [key]: v }));
    clearError(key);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validateFields(values);
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    // Hook up real submit / API later
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="section-inset my-8 lg:my-12"
    >
      <div
        id="contact"
        className="page-container rounded-4xl border border-foreground/5 bg-surface/50 px-6 py-10 lg:px-12 lg:py-14"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent text-center mb-3">
          Get in touch
        </p>
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl lg:text-4xl text-center font-bold tracking-tight text-foreground"
        >
          Contact <span className="text-accent">Me</span>
        </motion.h2>

        <div className="flex justify-between items-start mt-10 lg:mt-16 gap-12 flex-col lg:flex-row">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-[42%] w-full"
          >
            <form
              className="w-full space-y-4 lg:space-y-5"
              onSubmit={handleSubmit}
              noValidate
            >
              <div>
                <input
                  className={errors.name ? inputError : inputNormal}
                  type="text"
                  name="name"
                  placeholder="Your name"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange("name")}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name ? "contact-name-error" : undefined
                  }
                />
                <FieldError id="contact-name-error" message={errors.name} />
              </div>
              <div>
                <input
                  className={errors.email ? inputError : inputNormal}
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="email"
                  inputMode="email"
                  value={values.email}
                  onChange={handleChange("email")}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                />
                <FieldError id="contact-email-error" message={errors.email} />
              </div>
              <div>
                <input
                  className={errors.website ? inputError : inputNormal}
                  type="text"
                  name="website"
                  placeholder="Your website (if any)"
                  autoComplete="url"
                  value={values.website}
                  onChange={handleChange("website")}
                  aria-invalid={Boolean(errors.website)}
                  aria-describedby={
                    errors.website ? "contact-website-error" : undefined
                  }
                />
                <FieldError
                  id="contact-website-error"
                  message={errors.website}
                />
              </div>
              <div>
                <textarea
                  className={`${
                    errors.message ? inputError : inputNormal
                  } resize-none h-32`}
                  name="message"
                  placeholder="How can I help? *"
                  value={values.message}
                  onChange={handleChange("message")}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                />
                <FieldError
                  id="contact-message-error"
                  message={errors.message}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="flex justify-between gap-4 lg:gap-5 flex-col lg:flex-row lg:items-center pt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-[#0D0D0D] shadow-glow-sm hover:bg-accent-bright transition-colors w-fit lg:flex-1 lg:max-w-xs"
                >
                  Get In Touch
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="font-bold text-2xl lg:text-5xl mt-2 lg:mt-0 space-y-1 lg:space-y-2 tracking-tight">
              <h2 className="text-foreground">
                Let&apos;s <span className="text-accent">talk</span> for
              </h2>
              <h2 className="text-foreground">something special</h2>
            </div>

            <p className="text-muted text-sm/7 lg:text-base/7 mt-5 lg:mt-6 max-w-lg">
              I seek to push the limits of creativity to create high-engaging,
              user-friendly, and memorable interactive experiences.
            </p>

            <div className="font-medium text-sm lg:text-lg flex flex-col mt-8 gap-4">
              <motion.a
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-foreground group"
                href="mailto:roshanibhuva2203@gmail.com"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent border border-accent/30 transition group-hover:bg-accent/25">
                  <IoMdMail className="w-5 h-5" />
                </span>
                roshanibhuva2203@gmail.com
              </motion.a>

              <motion.a
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-foreground group"
                href={LINKEDIN_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent border border-accent/30 transition group-hover:bg-accent/25">
                  <IoLogoLinkedin className="w-5 h-5" aria-hidden />
                </span>
                Roshani Bhuva
              </motion.a>

              <motion.a
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-foreground group"
                href="tel:+918849542563"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent border border-accent/30 transition group-hover:bg-accent/25">
                  <FaPhone className="w-4 h-4" />
                </span>
                +91 8849542563
              </motion.a>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-foreground"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent border border-accent/30">
                  <HiOutlineLocationMarker className="w-5 h-5" aria-hidden />
                </span>
                Ahmedabad, Gujarat
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
