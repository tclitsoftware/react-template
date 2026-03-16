export function calculateSEOScore(content: string, keywords: string[], metaDescription: string): number {
  let score = 0;

  // Panjang konten
  const wordCount = content.split(' ').length;
  if (wordCount > 300) score += 20;
  if (wordCount > 500) score += 30;

  // Penggunaan kata kunci
  keywords.forEach(keyword => {
    const keywordCount = (content.match(new RegExp(keyword.trim(), "gi")) || []).length;
    if (keywordCount > 0) score += 20; // Skor per kata kunci
  });

  // Meta description (contoh: adanya meta description, bisa menambah logika untuk panjang dan relevansi)
  // const metaDescription = content.match(/<meta name="description" content="(.*?)"\/?>/i);
  if (metaDescription && metaDescription[1].length > 100) score += 10;

  // Tag header
  const h1Count = (content.match(/<h1>/gi) || []).length;
  const h2Count = (content.match(/<h2>/gi) || []).length;
  if (h1Count > 0) score += 10;
  if (h2Count > 0) score += 5;

  // Jumlah tautan internal dan eksternal
  const internalLinks = (content.match(/<a href="\/[^"]*">/gi) || []).length;
  const externalLinks = (content.match(/<a href="http[^"]*">/gi) || []).length;
  if (internalLinks > 0) score += 10;
  if (externalLinks > 0) score += 10;

  // Tambahkan metrik lainnya sesuai kebutuhan
  return score;
}
