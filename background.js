
chrome.runtime.onMessage.addListener((message) => {
	if (message.action === 'download') {
		chrome.downloads.download({
			url: message.url,
			filename: message.filename,
			saveAs: false
		});
	}
});

chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: () => {
			const url = new URL(location.href);
			const urlSegments = url.pathname.split('/');
			const prefix = urlSegments[1];
			const videoId = urlSegments[2];

			const VIDEO_SELECTOR_P = 'div.fixed.bottom-0.left-0.right-0.top-0.z-dialog div.w-full.overflow-hidden div.flex.h-full div.flex.flex-1.flex-col div.flex.flex-1.overflow-clip div.flex-1 div.relative.h-full.w-full.origin-top div.absolute.overflow-hidden.rounded-xl:nth-child(2) div.group.relative.h-full.w-full div.absolute.inset-0 video[playsinline][webkit-playsinline][loop]';
			const VIDEO_SELECTOR_D = 'main div.h-full.max-h-screen.min-h-screen.w-full div.w-full.overflow-hidden div div.flex.h-full div.flex.flex-1.flex-col div.flex.flex-1.overflow-clip div.flex-1 div.relative.h-full.w-full.origin-top div.absolute.overflow-hidden.rounded-xl div.group.relative.h-full.w-full div.absolute.inset-0 video[playsinline][webkit-playsinline][loop]';

			const selector = prefix === 'p' ? VIDEO_SELECTOR_P : VIDEO_SELECTOR_D;

			const video = document.querySelector(selector);
			if (!video) {
				return;
			}

			const sourceUrl = video.src;
			if (sourceUrl) {
				const filename = `sora-${videoId.replace(/[^a-zA-Z0-9-_\.]/g, '-')}.mp4`;

				chrome.runtime.sendMessage({
					action: 'download',
					url: sourceUrl,
					filename: filename
				});
			}
		}
	}).catch(err => console.log('Could not execute script:', err));
});
