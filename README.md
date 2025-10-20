# Sora Video Downloader

Lightweight Chrome extension that downloads the main video on a Sora page when you click the extension icon.

Why this exists:
- One-click download from pages matching `https://sora.chatgpt.com/p/*`.
- Minimal permissions and simple UI — click the toolbar icon and the video downloads.

## Installation
1. Clone or download this repository.
2. Open chrome://extensions (or edge://extensions) in a Chromium-based browser.
3. Enable Developer mode.
4. Click "Load unpacked" and select this repository's folder.

## Usage
1. Open a Sora page with a video (URL like `https://sora.chatgpt.com/p/...`).
2. Click the extension icon in the toolbar.
3. The extension will attempt to download the video file automatically. The filename will be derived from the page or URL.

## Privacy & Permissions
- The extension requests minimal permissions: activeTab, downloads, and host permission for `https://sora.chatgpt.com/p/*` so it can access the page to find the video.
- No data is sent to any server. All work happens locally in your browser.