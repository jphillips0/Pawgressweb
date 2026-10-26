/* eslint-disable @next/next/no-img-element -- static app icon, same as the old page */
import styles from './linkPage.module.css';
import OpenInApp from './OpenInApp';

const APP_STORE_URL = 'https://apps.apple.com/app/pawgress/id6752368171';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.timelinesllc.pawgress';

type Kind = 'pet' | 'invite' | 'kennel';

/**
 * The "Opening Pawgress…" page shown when someone taps a share link without the
 * app opening it. Markup and wording are ported from the old public/*.html files.
 * `id` is the raw path segment, so the app link matches the URL that was shared.
 */
export default function OpeningPage({ kind, id }: { kind: Kind; id: string }) {
  const appId = encodeURIComponent(id);

  if (kind === 'invite') {
    return (
      <div className={`${styles.page} ${styles.plain}`}>
        <div className={styles.paw}>🐾</div>
        <h1>Opening Pawgress…</h1>
        <p>
          You&apos;ve been invited to connect with a pet on Pawgress.
          <br />
          Download the app to see all the updates!
        </p>
        <a id="appstore" className={`${styles.btn} ${styles.btnPrimary}`} href={APP_STORE_URL}>
          Download on the App Store
        </a>
        <a id="playstore" className={`${styles.btn} ${styles.btnSecondary}`} href={PLAY_STORE_URL}>
          Get it on Google Play
        </a>
        <OpenInApp kind={kind} id={appId} playStoreId="playstore" />
      </div>
    );
  }

  const subtitle =
    kind === 'pet' ? (
      <>
        Someone shared a pet&apos;s Pawgress profile with you.
        <br />
        Download the app to see it!
      </>
    ) : (
      <>
        Someone shared their Pawgress kennel with you.
        <br />
        Download the app to see their profile!
      </>
    );

  return (
    <div className={`${styles.page} ${styles.aurora}`}>
      <div className={styles.blobs} aria-hidden="true">
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
        <div className={`${styles.blob} ${styles.blob3}`} />
        <div className={`${styles.blob} ${styles.blob4}`} />
        <div className={styles.sheen} />
      </div>

      <div className={styles.content}>
        <img src="/app-icon.png" alt="Pawgress" className={styles.icon} />
        <h1>
          Opening <span>Pawgress…</span>
        </h1>
        <p className={styles.subtitle}>{subtitle}</p>

        <a id="appstore" className={`${styles.btn} ${styles.btnPrimary}`} href={APP_STORE_URL}>
          Download on the App Store
        </a>
        <a id="playstore" className={`${styles.btn} ${styles.btnSecondary}`} href={PLAY_STORE_URL}>
          Get it on Google Play
        </a>

        <div className={styles.pawBadge}>🐾 Pawgress</div>
      </div>
      <OpenInApp kind={kind} id={appId} playStoreId="playstore" />
    </div>
  );
}
