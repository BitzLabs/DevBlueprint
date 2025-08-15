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

// Material for MkDocs は AJAX を使用してページナビゲーションを行うため
// 初回読み込み以外のページでも MathJax がレンダリングされるよう document$ を使用
/* global document$ */
document$.subscribe(() => {
    MathJax.typesetPromise();
});
