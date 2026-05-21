<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import ScrollReveal from '../components/ScrollReveal.vue'

const { t } = useI18n()

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL
const contactPhone = import.meta.env.VITE_CONTACT_PHONE

const form = reactive({ name: '', email: '', message: '' })
const submitted = ref(false)
const sendError = ref(false)
const sending = ref(false)
const shaking = ref(false)
const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const NAME_RE = /^[一-龥a-zA-Z0-9_\s]{2,30}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate() {
  let valid = true

  if (!form.name.trim()) {
    errors.name = 'name_error'
    valid = false
  } else if (!NAME_RE.test(form.name.trim())) {
    errors.name = 'name_format_error'
    valid = false
  } else {
    errors.name = ''
  }

  if (!form.email.trim()) {
    errors.email = 'email_error'
    valid = false
  } else if (!EMAIL_RE.test(form.email.trim())) {
    errors.email = 'email_format_error'
    valid = false
  } else {
    errors.email = ''
  }

  if (!form.message.trim()) {
    errors.message = 'message_error'
    valid = false
  } else if (form.message.trim().length < 10) {
    errors.message = 'message_format_error'
    valid = false
  } else {
    errors.message = ''
  }

  return valid
}

async function handleSubmit() {
  sendError.value = false

  if (!validate()) {
    shaking.value = true
    setTimeout(() => { shaking.value = false }, 600)
    return
  }

  sending.value = true
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        _subject: `来自个人网站的留言 - ${form.name.trim()}`,
        _template: 'table',
        _captcha: 'false'
      })
    })

    if (res.ok) {
      submitted.value = true
      form.name = ''
      form.email = ''
      form.message = ''
      errors.name = ''
      errors.email = ''
      errors.message = ''
      setTimeout(() => { submitted.value = false }, 5000)
    } else {
      const errText = await res.text().catch(() => '')
      console.warn(`[FormSubmit] HTTP ${res.status}: ${errText}`)
      sendError.value = true
    }
  } catch (e) {
    console.warn('[FormSubmit] Network error:', e.message)
    sendError.value = true
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <div class="contact-page">
    <section class="section">
      <div class="container">
        <p class="section-label">{{ t('contact.label') }}</p>
        <h2 class="section-title">{{ t('contact.title') }}</h2>
        <p class="section-description">{{ t('contact.description') }}</p>

        <div class="contact-layout">
          <ScrollReveal>
            <form class="contact-form" :class="{ shake: shaking }" @submit.prevent="handleSubmit" novalidate>
              <div class="form-group" :class="{ error: errors.name }">
                <label class="form-label" for="name">{{ t('contact.name') }}</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  :placeholder="t('contact.name_placeholder')"
                  class="form-input"
                  @input="errors.name = ''"
                />
                <span class="form-error-msg" v-if="errors.name">{{ t('contact.' + errors.name) }}</span>
              </div>
              <div class="form-group" :class="{ error: errors.email }">
                <label class="form-label" for="email">{{ t('contact.email') }}</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="text"
                  :placeholder="t('contact.email_placeholder')"
                  class="form-input"
                  @input="errors.email = ''"
                />
                <span class="form-error-msg" v-if="errors.email">{{ t('contact.' + errors.email) }}</span>
              </div>
              <div class="form-group" :class="{ error: errors.message }">
                <label class="form-label" for="message">{{ t('contact.message') }}</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  :placeholder="t('contact.message_placeholder')"
                  class="form-input form-textarea"
                  @input="errors.message = ''"
                ></textarea>
                <span class="form-error-msg" v-if="errors.message">{{ t('contact.' + errors.message) }}</span>
              </div>
              <button type="submit" class="btn-submit" :disabled="sending">
                <span class="btn-submit-text">{{ sending ? t('contact.sending') : t('contact.submit') }}</span>
                <svg v-if="!sending" class="btn-submit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
                <svg v-else class="btn-submit-icon spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round"/>
                </svg>
              </button>

              <!-- Send error -->
              <transition name="toast">
                <div v-if="sendError" class="form-error-toast">
                  <div class="form-error-toast-inner">
                    <svg class="form-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
                    </svg>
                    <span>{{ t('contact.send_error') }}</span>
                  </div>
                  <a class="form-error-mailto" :href="`mailto:${contactEmail}?subject=来自个人网站的留言 - ${encodeURIComponent(form.name || '访客')}&body=${encodeURIComponent(form.message || '')}`">
                    {{ t('contact.send_error_fallback') }}
                  </a>
                  <p class="form-error-tips">{{ t('contact.send_fail_reasons') }}</p>
                </div>
              </transition>

              <!-- Success -->
              <transition name="toast">
                <div v-if="submitted" class="form-success-toast">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span>{{ t('contact.success') }}</span>
                </div>
              </transition>
            </form>
          </ScrollReveal>

          <ScrollReveal :delay="0.2">
            <div class="contact-info">
              <div class="info-card contact-detail-card">
                <h3 class="info-title">{{ t('contact.info_title') }}</h3>
                <div class="info-item">
                  <div class="info-icon-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span>{{ contactEmail }}</span>
                </div>
                <div class="info-item">
                  <div class="info-icon-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span>{{ t('contact.location') }}</span>
                </div>
                <div class="info-item">
                  <div class="info-icon-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <span>{{ contactPhone }}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-page { padding-top: var(--nav-height); }

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: var(--space-2xl);
  margin-top: var(--space-2xl);
}

/* ---- Form ---- */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}
.contact-form.shake {
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}
@keyframes shake {
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
  100% { transform: translateX(0); }
}

.form-group { display: flex; flex-direction: column; gap: var(--space-sm); }
.form-label { font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text); }

.form-input {
  padding: 14px 16px;
  background: var(--color-card);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-size: var(--font-size-base);
  transition: all var(--transition-fast);
  outline: none;
}
.form-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-light);
}
.form-group.error .form-input {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12);
}
.form-error-msg {
  font-size: var(--font-size-xs);
  color: #ef4444;
  font-weight: 500;
}

.form-textarea { resize: vertical; min-height: 130px; }

.btn-submit {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: var(--color-accent);
  color: #fff;
  font-size: var(--font-size-base);
  font-weight: 600;
  border-radius: 50px;
  align-self: flex-start;
  transition: all var(--transition-fast);
}
.btn-submit:hover {
  background: var(--color-accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(224, 104, 40, 0.35);
}
.btn-submit:hover .btn-submit-icon { transform: translateX(3px) translateY(-1px); }
.btn-submit-icon { width: 16px; height: 16px; transition: transform var(--transition-fast); }
.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}
.btn-submit:disabled:hover {
  box-shadow: none;
  transform: none !important;
}

.spinner {
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ---- Success toast ---- */
.form-success-toast {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  background: var(--color-accent-light);
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-md);
  color: var(--color-accent);
  font-weight: 500;
  font-size: var(--font-size-sm);
}
.form-success-toast svg { width: 20px; height: 20px; flex-shrink: 0; }

/* ---- Error toast ---- */
.form-error-toast {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: 16px 20px;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid #ef4444;
  border-radius: var(--radius-md);
  color: #ef4444;
  font-weight: 500;
  font-size: var(--font-size-sm);
}
.form-error-toast-inner {
  display: flex;
  align-items: center;
  gap: 10px;
}
.form-error-icon { width: 20px; height: 20px; flex-shrink: 0; }
.form-error-mailto {
  display: inline-block;
  color: var(--color-accent);
  text-decoration: underline;
  font-weight: 600;
  transition: color var(--transition-fast);
  cursor: pointer;
}
.form-error-mailto:hover { color: var(--color-accent-hover); }
.form-error-tips {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  font-weight: 400;
  line-height: 1.6;
  margin: 0;
}

.toast-enter-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.toast-leave-active { transition: all 0.3s ease-in; }
.toast-enter-from { opacity: 0; transform: translateY(-12px); }
.toast-leave-to { opacity: 0; transform: translateY(-8px); }

/* ---- Info cards ---- */
.contact-info { display: flex; flex-direction: column; }
.info-card {
  padding: var(--space-xl);
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
}
.info-card:hover {
  box-shadow: 0 12px 36px var(--color-card-shadow);
  border-color: var(--color-accent);
}

.info-title { font-size: var(--font-size-lg); font-weight: 600; margin-bottom: var(--space-lg); }

.info-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-md);
}
.info-item:last-child { margin-bottom: 0; }

.info-icon-circle {
  width: 36px; height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-light);
  border-radius: 50%;
  color: var(--color-accent);
  flex-shrink: 0;
}
.info-icon-circle svg { width: 16px; height: 16px; }

@media (max-width: 768px) {
  .contact-layout { grid-template-columns: 1fr; gap: var(--space-xl); }
  .btn-submit { width: 100%; justify-content: center; }
}
</style>
