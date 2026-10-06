import rateLimit from 'express-rate-limit'
import { clientIp } from './client-ip'

function limiter(windowMinutes: number, limit: number, message: string) {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    limit,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    keyGenerator: clientIp,
    // The key comes from X-Forwarded-For on purpose (see client-ip.ts), so the
    // library's check that `trust proxy` is configured does not apply.
    validate: { xForwardedForHeader: false },
    message: { error: message },
  })
}

/** Contact, booking, careers and estimator forms: generous for people, tight for scripts. */
export const formLimiter = limiter(10, 8, 'Too many submissions from your connection. Please try again in a few minutes.')

/** Every login endpoint, against password guessing. */
export const loginLimiter = limiter(15, 10, 'Too many sign-in attempts. Please wait 15 minutes and try again.')

/** Endpoints that send an email, so they can't be used to flood someone's inbox. */
export const emailLimiter = limiter(60, 5, 'Too many requests. Please try again in an hour.')

/** The sales chatbot, which calls a paid AI model on every message. */
export const chatLimiter = limiter(5, 30, 'You are sending messages too quickly. Please wait a moment.')

/** Store checkout and payment verification. */
export const checkoutLimiter = limiter(10, 20, 'Too many checkout attempts. Please try again in a few minutes.')
