import eventManager from '@/utils/eventmanager';

function fallbackCopyTextToClipboard(text = '') {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback: Could not copy text', err);
  }
  document.body.removeChild(textArea);
}

const copyTextToClipboard = (text: string) => {
  if (navigator.clipboard && window.ClipboardItem) {
    navigator.clipboard
      .writeText(text)
      .then(() => {})
      .catch((err) => {
        console.error('Failed to copy:', err);
        fallbackCopyTextToClipboard(text); // 回退到 execCommand
      });
  } else {
    fallbackCopyTextToClipboard(text);
  }
  eventManager.publish('showAlert', {
    type: 'success',
    message: 'Copied successfully',
    show: true,
  });
};

const substr = (str: string, pre: number, last: number) => {
  return str.substring(pre, last);
};

const substrAddress = (str: string) => {
  return substr(str, 0, 6) + '...' + substr(str, str.length - 4, str.length);
};

export { copyTextToClipboard, substrAddress };
