let mutedWords = [];

function loadMutedWords() {
  chrome.storage.sync.get(['mutedWords'], function (result) {
    mutedWords = result.mutedWords || [];
    updateWordList();
  });
}

function saveMutedWords() {
  chrome.storage.sync.set({ mutedWords: mutedWords }, function () {
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
    removeButton.onclick = function () {
      mutedWords.splice(index, 1);
      saveMutedWords();
      updateWordList();
    };

    wordItem.appendChild(removeButton);
    wordList.appendChild(wordItem);
  });
}

document.getElementById('addWord').addEventListener('click', function () {
  const newWord = document.getElementById('newWord').value.trim();
  if (newWord && !mutedWords.includes(newWord)) {
    mutedWords.push(newWord);
    saveMutedWords();
    updateWordList();
    document.getElementById('newWord').value = '';
  }
});

document.addEventListener('DOMContentLoaded', loadMutedWords);
