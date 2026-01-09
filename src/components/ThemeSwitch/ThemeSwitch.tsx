import React from 'react';

import styles from './ThemeSwitch.module.css';

/**
 * Props for the ThemeSwitch component
 */
export interface ThemeSwitchProps {
  /** Whether dark mode is currently enabled */
  enableDarkMode: boolean;
  /** Callback function to update the dark mode state */
  setEnableDarkMode: (value: boolean) => void;
  /** Size variant of the switch. Defaults to 'large' */
  size?: 'small' | 'medium' | 'large';
}

/**
 * ThemeSwitch Component
 *
 * An animated toggle switch for switching between light and dark themes.
 * Features sun/moon icons with animated clouds (light mode) and stars (dark mode).
 *
 * @component
 * @example
 * ```tsx
 * const [darkMode, setDarkMode] = useState(false);
 * <ThemeSwitch
 *   enableDarkMode={darkMode}
 *   setEnableDarkMode={setDarkMode}
 *   size="medium"
 * />
 * ```
 */
const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
  enableDarkMode,
  setEnableDarkMode,
  size = 'large'
}) => {
  const handleToggle = () => {
    setEnableDarkMode(!enableDarkMode);
  };

  return (
    <div
      className={`${styles.switchContainer} ${styles[size]} ${
        enableDarkMode ? styles.dark : styles.light
      }`}
      onClick={handleToggle}
      role="button"
      tabIndex={0}
      aria-label={`Switch to ${enableDarkMode ? 'light' : 'dark'} mode`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleToggle();
        }
      }}
    >
      {/* Background elements */}
      <div className={styles.background}>
        {/* Clouds for light mode */}
        <div className={`${styles.cloud} ${styles.cloud1}`}></div>
        <div className={`${styles.cloud} ${styles.cloud2}`}></div>
        <div className={`${styles.cloud} ${styles.cloud3}`}></div>

        {/* Stars for dark mode */}
        <div className={`${styles.star} ${styles.star1}`}></div>
        <div className={`${styles.star} ${styles.star2}`}></div>
        <div className={`${styles.star} ${styles.star3}`}></div>
        <div className={`${styles.star} ${styles.star4}`}></div>
        <div className={`${styles.star} ${styles.star5}`}></div>
        <div className={`${styles.star} ${styles.star6}`}></div>
        <div className={`${styles.star} ${styles.star7}`}></div>
        <div className={`${styles.star} ${styles.star8}`}></div>
      </div>

      {/* Toggle circle with sun/moon */}
      <div className={styles.toggle}>
        {/* Sun */}
        <div className={styles.sun}>
          <div className={styles.sunCore}>
            <div className={styles.sunspot1}></div>
            <div className={styles.sunspot2}></div>
            <div className={styles.sunspot3}></div>
          </div>
          <div className={styles.sunRay}></div>
          <div className={styles.sunRay}></div>
          <div className={styles.sunRay}></div>
          <div className={styles.sunRay}></div>
          <div className={styles.sunRay}></div>
          <div className={styles.sunRay}></div>
          <div className={styles.sunRay}></div>
          <div className={styles.sunRay}></div>
        </div>

        {/* Moon */}
        <div className={styles.moon}>
          <div className={styles.moonCore}>
            <div className={styles.crater1}></div>
            <div className={styles.crater2}></div>
            <div className={styles.crater3}></div>
            <div className={styles.crater4}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitch;
