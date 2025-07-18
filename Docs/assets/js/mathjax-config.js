if (typeof window !== 'undefined') {
  window.MathJax = {
    tex: {
      inlineMath: [['\\(', '\\)']],
      displayMath: [['\\[', '\\]']],
      processEscapes: true,
      processEnvironments: true,
    },
    options: {
      ignoreHtmlClass: '.*|',
      processHtmlClass: 'arithmatex',
    },
  };
}

document.addEventListener('DOMContentLoaded', () => {
  MathJax.typesetPromise();
});
