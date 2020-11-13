export {}; // hack to allow Module augmentation in TS

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: Function;
  }
}
