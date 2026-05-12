# Pawgress Password Reset — Web Implementation Handoff

> **Audience:** the Claude/AI agent working in the **Pawgress mobile app repo**.
> **Source repo:** `Pawgressweb` (the marketing site at `https://pawgressapp.com`).
> **Purpose:** describe exactly what the web side now supports so the mobile side can be configured to match.

---

## TL;DR

The marketing site now hosts a `/reset-password` page that:

1. Accepts the Supabase password recovery URL hash (`#access_token=...&refresh_token=...&type=recovery`).
2. Lets the user set a new password via `supabase.auth.updateUser({ password })`.
3. Signs the recovery session out so the user must log into the mobile app fresh.

The site also serves updated Apple **AASA** and Android **assetlinks** files so installed apps can intercept the email link as a Universal Link / App Link.

---

## Supabase project being used

The web client is wired to the **same** Supabase project as the mobile app:

```
NEXT_PUBLIC_SUPABASE_URL  = https://iholadmgukfztcjylayc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = <anon public key — same one the app uses>
```

These are stored in `.env.local` for local dev and **must also be set in the production hosting dashboard** (Vercel/Hostinger). Only the **anon public** key is used — never the service role key.

---

## The recovery URL contract

When the user taps "Forgot password" in the mobile app, the app should call:

```ts
supabase.auth.resetPasswordForEmail(email, {
  redirectTo: 'https://pawgressapp.com/reset-password',
});
```

Supabase will then email a link of the form:

```
https://pawgressapp.com/reset-password#access_token=...&refresh_token=...&type=recovery
```

The web page handles that link. **Do not** point `redirectTo` at any other domain (e.g. `pawgress.ai`) — those are no longer configured.

### Supabase Dashboard requirements

In **Supabase → Authentication → URL Configuration**, the following must be set:

- **Site URL:** `https://pawgressapp.com`
- **Redirect URLs (allowlist):** must include `https://pawgressapp.com/reset-password`
- Remove any leftover `pawgress.ai` entries.

If those are missing, Supabase will refuse to send the recovery link or will append `?error=...` to the redirect.

---

## Files added/modified on the web side (for reference)

```
src/
  app/
    reset-password/
      page.tsx                  # the reset form (Next.js App Router, 'use client')
  lib/
    supabase.ts                 # shared Supabase client (detectSessionInUrl: true, flowType: 'implicit')
public/
  .well-known/
    apple-app-site-association  # iOS Universal Links — extended to cover /reset-password
    assetlinks.json             # Android App Links — uses Play Store signing SHA-256
.env.local                      # NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY
package.json                    # @supabase/supabase-js added
```

The page validates: ≥8 chars, 1 uppercase, 1 lowercase, 1 digit, matches confirmation. Errors from Supabase (`updateUser`) are surfaced verbatim.

---

## Apple Universal Links (so iOS opens the app instead of Safari, when installed)

`public/.well-known/apple-app-site-association` (served as `Content-Type: application/json`, no redirects, no file extension) now contains:

```json
{
  "applinks": {
    "details": [
      {
        "appIDs": ["M4S64DM37W.com.timelinesllc.pawgress"],
        "components": [
          { "/": "/invite/*",        "comment": "Handles Pawgress pet invite deep links" },
          { "/": "/reset-password",  "comment": "Handles Supabase password recovery links" },
          { "/": "/reset-password/*","comment": "Handles Supabase password recovery links" }
        ]
      }
    ]
  },
  "webcredentials": {
    "apps": ["M4S64DM37W.com.timelinesllc.pawgress"]
  }
}
```

- **Team ID:** `M4S64DM37W`
- **Bundle ID:** `com.timelinesllc.pawgress`

### What the mobile app must do (iOS)

1. **Associated Domains entitlement** in Xcode / `app.json` / `Info.plist`:
   ```
   applinks:pawgressapp.com
   webcredentials:pawgressapp.com
   ```
   (No `https://`, no path. Just the host.)

2. **A new native build must be installed** for iOS to re-fetch the AASA. Universal Links do **not** activate from a JS-only OTA update.

3. **Handle the inbound URL** in the app. When iOS hands the app a URL like
   `https://pawgressapp.com/reset-password#access_token=...&type=recovery`,
   the app should route the user to its in-app reset screen and feed the tokens to:
   ```ts
   supabase.auth.setSession({ access_token, refresh_token })
   // then
   supabase.auth.updateUser({ password: newPassword })
   ```
   If the app does **not** want to handle this in-app, it can simply not register the path — iOS will then open the URL in Safari and the web page will handle it. Either is acceptable; pick one and be consistent.

4. **Verification:** after deploying the web changes, run
   `curl -I https://pawgressapp.com/.well-known/apple-app-site-association`
   — expect `HTTP/2 200` and `content-type: application/json` with **no redirect**.

---

## Android App Links

`public/.well-known/assetlinks.json` now contains:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.timelinesllc.pawgress",
      "sha256_cert_fingerprints": [
        "79:AE:F7:7B:31:E9:14:CF:52:D7:4E:EC:D4:8C:83:C0:C8:76:FD:C7:C6:18:5A:4C:EA:81:4A:3E:CE:B4:4E:BE"
      ]
    }
  }
]
```

- **Package name:** `com.timelinesllc.pawgress`
- **SHA-256:** the Play Store **app signing key** fingerprint (not the upload key).

### What the mobile app must do (Android)

In `AndroidManifest.xml`, the activity that should receive the link must declare an intent filter with `android:autoVerify="true"`:

```xml
<intent-filter android:autoVerify="true">
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="https"
        android:host="pawgressapp.com"
        android:pathPrefix="/reset-password" />
</intent-filter>
```

Then handle the inbound `Intent` the same way as iOS — extract the URL fragment and pass tokens to `supabase.auth.setSession(...)`.

**Important:** if the app is signed by a different key than the SHA-256 above (e.g. a debug build, or you re-keyed), App Link verification will silently fail and the link will open in Chrome instead. Use `adb shell pm get-app-links com.timelinesllc.pawgress` to debug.

---

## End-to-end flow (what should happen)

### Case A — user clicks email link on desktop
1. Browser opens `https://pawgressapp.com/reset-password#access_token=...`.
2. Web page parses hash, shows form.
3. User submits → `supabase.auth.updateUser({ password })` → success screen.
4. User opens the mobile app and logs in with new password.

### Case B — user clicks email link on iOS with app installed
1. iOS checks the AASA file, sees `/reset-password` is registered.
2. App opens with the URL handed to it via `application:continueUserActivity:...` (or Expo Linking).
3. App must call `supabase.auth.setSession({ access_token, refresh_token })` then `updateUser`.
4. If the app is **not** installed, Safari opens the web page (Case A).

### Case C — user clicks email link on Android with app installed
Same as Case B, via Android App Links intent filter.

---

## Things the mobile repo's agent should verify

- [ ] `redirectTo` in the app's `resetPasswordForEmail` call is **exactly** `https://pawgressapp.com/reset-password` (no trailing slash, no query string).
- [ ] iOS `associated-domains` includes `applinks:pawgressapp.com` and `webcredentials:pawgressapp.com`.
- [ ] Android `AndroidManifest.xml` has an `autoVerify="true"` intent filter for `https://pawgressapp.com/reset-password`.
- [ ] If the app handles the URL in-app, it correctly parses the URL **fragment** (`#…`) — not the query string. Supabase recovery tokens are in the hash.
- [ ] The app uses the **same Supabase project** (`iholadmgukfztcjylayc.supabase.co`) as the web client.
- [ ] After updating password successfully, the app calls `supabase.auth.signOut()` to drop the recovery session before letting the user log in normally.
- [ ] A new native build has been shipped (TestFlight / internal track) — Universal Links / App Links do not pick up from OTA updates.

---

## Known gotchas

1. **AASA caching:** iOS caches the AASA file for up to ~7 days on production builds. To force a refresh during dev, delete + reinstall the app, or use the AASA Validator (https://branch.io/resources/aasa-validator/) to confirm the file is valid before debugging device-side.
2. **Hash vs query:** Supabase puts recovery tokens in the URL **hash**, not the query. Mobile deep-link parsers that only read the query string will appear to "work" but `access_token` will be `undefined`. Read the fragment.
3. **`vercel.json` rewrites:** the web repo currently has a `"/(.*) → /index.html"` rewrite that may interfere with Next.js dynamic routing. If `/reset-password` 404s in production, that rewrite needs to be removed. (Not your problem on the mobile side, but call it out if the web page doesn't load.)
4. **One Supabase recovery session per link:** the tokens in the email are single-use and short-lived (~1 hour). If the user clicks the link, lets it sit, then submits, they'll get an `invalid_grant` error. The web page surfaces Supabase's error message verbatim.

---

## Quick contact info for testing

- Production URL: `https://pawgressapp.com/reset-password`
- AASA file: `https://pawgressapp.com/.well-known/apple-app-site-association`
- Assetlinks: `https://pawgressapp.com/.well-known/assetlinks.json`
- Supabase project ref: `iholadmgukfztcjylayc`
- iOS bundle ID: `com.timelinesllc.pawgress` (Team ID `M4S64DM37W`)
- Android package: `com.timelinesllc.pawgress`
