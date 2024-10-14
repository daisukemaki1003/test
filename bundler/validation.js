// メタタグの検証を行うプリプロセッサ
export const metaPreprocessor = (content) => {
    const missingMetaTags = [];

    // メタタグのパターン
    const metaTagPattern = /<meta\s+([^>]*name="[^"]*")?([^>]*content="[^"]*")?([^>]*)>/g;

    // HTML内のメタタグを検索
    const processedContent = content.replace(metaTagPattern, (match, nameAttr, contentAttr, rest) => {
        if (!nameAttr || !contentAttr) {
            // メタタグが未入力の場合、ダミーのメタタグを挿入し、警告メッセージを収集
            missingMetaTags.push(match);
            return `<meta name="dummy" content="This is a dummy meta tag" ${rest}>`;
        }
        return match; // 問題ない場合はそのまま返す
    });

    // 未入力のメタタグに関する警告をコンソールに出力
    if (missingMetaTags.length > 0) {
        console.warn('Warning: Missing content or name in meta tags:', missingMetaTags);
    }

    return processedContent;
};