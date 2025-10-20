
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
			const VIDEO_SELECTOR = 'div.fixed.bottom-0.left-0.right-0.top-0.z-dialog div.w-full.overflow-hidden div.flex.h-full div.flex.flex-1.flex-col div.flex.flex-1.overflow-clip.cursor-pointer div.flex-1 div.relative.h-full.w-full.origin-top div.absolute.overflow-hidden.rounded-xl:nth-child(2) div.group.relative.h-full.w-full div.absolute.inset-0 video[playsinline][webkit-playsinline][loop]';
			
			const video = document.querySelector(VIDEO_SELECTOR);
			if (!video) {
				return;
			}

			const url = video.src;
			if (url) {

				// Prefer extracting slug from the page URL (e.g. /p/<slug>)
				const pageParsed = new URL(location.href);
				const slug = pageParsed.pathname.split('/')[2];

				const filename = `sora-${slug.replace(/[^a-zA-Z0-9-_\.]/g, '-')}.mp4`;

				chrome.runtime.sendMessage({
					action: 'download',
					url: url,
					filename: filename
				});
			}
		}
	}).catch(err => console.log('Could not execute script:', err));
});