let mutedWords = [];

// Load muted words from storage
function loadMutedWords() {
  chrome.storage.sync.get(['mutedWords'], function (result) {
    mutedWords = result.mutedWords || [];
    console.log('Loaded muted words:', mutedWords);
    observeTimeline();
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

// Function to process tweets
function processTweets() {
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
}

// Set up a MutationObserver to watch for new tweets
function observeTimeline() {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };
  const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        processTweets();
      }
    }
  });
  observer.observe(targetNode, config);
}

// Listen for updates to muted words
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.mutedWords) {
    mutedWords = changes.mutedWords.newValue;
    console.log('Updated muted words:', mutedWords);
    processTweets();
  }
});

// Initialize
loadMutedWords();
