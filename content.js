let mutedWords = [];
let hideImages = false;

// Load settings from storage
function loadSettings() {
  chrome.storage.sync.get(['mutedWords', 'hideImages'], function(result) {
    mutedWords = result.mutedWords || [];
    hideImages = result.hideImages || false;
    console.log('Loaded muted words:', mutedWords);
    console.log('Hide images setting:', hideImages);
    observeTimeline();
    processPage();
  });
}

// Function to check if a tweet contains muted words
function containsMutedWords(tweetText) {
  return mutedWords.some(word => tweetText.toLowerCase().includes(word.toLowerCase()));
}

// Function to hide a tweet
function hideTweet(tweetElement) {
  tweetElement.style.display = 'none';
}

// Function to process images
function processImages() {
  if (hideImages) {
    // Hide images in tweets
    const tweetImages = document.querySelectorAll('div[data-testid="tweetPhoto"], div[data-testid="previewImage"]');
    tweetImages.forEach(img => {
      img.style.display = 'none';
    });

    // Hide profile pictures
    const profilePics = document.querySelectorAll('div[data-testid="UserAvatar-Container-unknown"]');
    profilePics.forEach(pic => {
      pic.style.display = 'none';
    });

    // Hide background images
    const backgroundImages = document.querySelectorAll('div[data-testid="UserProfileHeader_Items"]');
    backgroundImages.forEach(bg => {
      const parent = bg.closest('div[data-testid="primaryColumn"]');
      if (parent) {
        const header = parent.querySelector('div[data-testid="headerCard"]');
        if (header) {
          header.style.display = 'none';
        }
      }
    });
  }
}

// Function to process tweets and images
function processPage() {
  const tweets = document.querySelectorAll('article[data-testid="tweet"]');
  tweets.forEach(tweet => {
    const tweetTextElement = tweet.querySelector('div[data-testid="tweetText"]');
    if (tweetTextElement) {
      const tweetText = tweetTextElement.textContent;
      if (containsMutedWords(tweetText)) {
        hideTweet(tweet);
      }
    }
  });
  processImages();
}

// Set up a MutationObserver to watch for new content
function observeTimeline() {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };
  const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        processPage();
      }
    }
  });
  observer.observe(targetNode, config);
}

// Listen for updates to settings
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync') {
    if (changes.mutedWords) {
      mutedWords = changes.mutedWords.newValue;
      console.log('Updated muted words:', mutedWords);
    }
    if (changes.hideImages !== undefined) {
      hideImages = changes.hideImages.newValue;
      console.log('Updated hide images setting:', hideImages);
      // Reset the page to show/hide images based on new setting
      location.reload();
    }
    processPage();
  }
});

// Initialize
loadSettings();
