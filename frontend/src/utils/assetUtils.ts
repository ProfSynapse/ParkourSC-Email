export const getAssetUrl = (assetPath: string) => {
    // Convert relative path to absolute URL
    const baseUrl = window.location.origin;
    return `${baseUrl}/${assetPath}`;
};
