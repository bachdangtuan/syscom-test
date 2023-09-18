import {Subject} from 'rxjs';
import {saveToLocalStorage, getFromLocalStorage} from 'utils/util-local-storage';

export const THEMES = {
  light: 'light',
  dark: 'dark',
  brown: 'brown',
};

const LIGHT_MODE_CONFIG = {
  chartTextColor: '#0a0a0a',
  chartPalette: [
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
    '#17becf'
  ],
  riskLevelChartPalette: [
    '#1f77b4',
    '#2ca02c',
    '#ff7f0e',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
    '#17becf'
  ],
};

const DARK_MODE_CONFIG = {
  chartTextColor: '#ffffff',
  chartPalette: [
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
    '#17becf'
  ],
  riskLevelChartPalette: [
    '#1f77b4',
    '#2ca02c',
    '#ff7f0e',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
    '#17becf'
  ],
};

const BROWN_MODE_CONFIG = {
  chartTextColor: '#ffffff',
  chartPalette: [
    '#ffa059',
    '#ffc859',
    '#a9cc70',
    '#cbcc57',
    '#e45959',
    '#e97659',
    '#59db8f',
    '#86cc89',
    '#7499ff',
    '#97aab3',
  ],
  riskLevelChartPalette: [
    '#a9cc70',
    '#cbcc57',
    '#ffc859',
    '#ffa059',
    '#e97659',
    '#e45959',
    '#59db8f',
    '#86cc89',
    '#7499ff',
    '#97aab3',
  ],
};

class ManagerTheme extends Subject {
  constructor(...anything) {
    super(...anything);
    this.theme = this.loadThemeNameFromLocalStorage();
  }

  loadThemeNameFromLocalStorage() {
    const themeName = getFromLocalStorage('theme');
    if (typeof themeName === 'string') {
      return themeName;
    }
    return THEMES.brown;
  }

  getThemeName() {
    return this.theme;
  }

  switchToTheme(themeName) {
    this.theme = themeName;
    this.saveThemeNameToLocalStorage();
    this.next();
  }

  saveThemeNameToLocalStorage() {
    saveToLocalStorage('theme', this.theme);
  }

  getThemeConfig() {
    switch (this.theme) {
      case THEMES.dark:
        return DARK_MODE_CONFIG;
      case THEMES.light:
        return LIGHT_MODE_CONFIG;
      case THEMES.brown:
        return BROWN_MODE_CONFIG;
      default:
        return BROWN_MODE_CONFIG;
    }
  }
}

const ManagerThemeSubject = new ManagerTheme();
export {ManagerThemeSubject};
