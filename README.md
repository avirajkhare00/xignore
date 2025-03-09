# xignore

A Chrome extension that allows you to mute specific words and hide images on X (formerly Twitter).

## Features

- **Word Muting**: Hide tweets containing specific words or phrases you want to avoid
- **Image Hiding**: Toggle to hide all images on X, including tweet photos and profile pictures
- **Real-time Filtering**: Automatically filters new content as you scroll through your timeline
- **Easy Management**: Simple interface to add and remove muted words

## Installation

1. Clone this repository or download it as a ZIP file
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" by toggling the switch in the top right corner
4. Click "Load unpacked" and select the directory containing the extension files
5. The xignore extension icon should now appear in your browser toolbar

## Usage

1. Click on the xignore icon in your browser toolbar to open the popup
2. To mute a word:
   - Enter the word in the text field
   - Click the "+" button
   - The word will be added to your muted words list
3. To remove a muted word:
   - Find the word in your list
   - Click the "Remove" button next to it
4. To hide all images:
   - Toggle the "Hide Images" switch
   - Refresh the page to apply changes

## How It Works

The extension works by:
1. Monitoring the content on X pages
2. Checking tweet text against your list of muted words
3. Hiding tweets that contain any of your muted words
4. Optionally hiding all images based on your preference

## Permissions

This extension requires the following permissions:
- `storage`: To save your muted words and settings
- Access to `https://twitter.com/*` and `https://x.com/*`: To function on X's website

## Privacy

All your settings are stored locally in your browser using Chrome's storage API. No data is sent to external servers.

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue for any bugs or feature requests.

## License

This project is open source and available for personal use.