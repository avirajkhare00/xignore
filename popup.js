let mutedWords = [];

function loadSettings() {
  chrome.storage.sync.get(['mutedWords', 'hideImages'], function(result) {
    mutedWords = result.mutedWords || [];
    updateWordList();
    
    // Set the toggle state
    document.getElementById('hideImages').checked = result.hideImages || false;
  });
}

function saveMutedWords() {
  chrome.storage.sync.set({mutedWords: mutedWords}, function() {
    console.log('Muted words saved');
  });
}

function updateWordList() {
  const wordList = document.getElementById('wordList');
  wordList.innerHTML = '';
  mutedWords.forEach((word, index) => {
    const wordItem = document.createElement('div');
    wordItem.className = 'word-item';
    wordItem.textContent = word;
    
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = function() {
      mutedWords.splice(index, 1);
      saveMutedWords();
      updateWordList();
    };
    
    wordItem.appendChild(removeButton);
    wordList.appendChild(wordItem);
  });
}

document.getElementById('addWord').addEventListener('click', function() {
  const newWord = document.getElementById('newWord').value.trim();
  if (newWord && !mutedWords.includes(newWord)) {
    mutedWords.push(newWord);
    saveMutedWords();
    updateWordList();
    document.getElementById('newWord').value = '';
  }
});

// Add event listener for the hide images toggle
document.getElementById('hideImages').addEventListener('change', function(e) {
  chrome.storage.sync.set({hideImages: e.target.checked}, function() {
    console.log('Hide images setting saved:', e.target.checked);
  });
});

document.addEventListener('DOMContentLoaded', loadSettings);
