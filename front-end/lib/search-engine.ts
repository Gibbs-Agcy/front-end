// Eş anlamlı kelimeler ve ilgili terimler
const synonyms: Record<string, string[]> = {
  // Para/Ödeme
  'para': ['ödeme', 'fiyat', 'ücret', 'maliyet', 'bütçe', 'tutar', 'para'],
  'ödeme': ['para', 'fiyat', 'ücret', 'tahsilat', 'ödeme', 'tutar'],
  'fiyat': ['para', 'ödeme', 'ücret', 'maliyet', 'tutar'],
  'ücret': ['para', 'ödeme', 'fiyat', 'maliyet'],
  'bütçe': ['para', 'ödeme', 'fiyat', 'maliyet'],

  // Zaman/Süre
  'süre': ['zaman', 'tarih', 'deadline', 'teslim', 'süre'],
  'zaman': ['süre', 'tarih', 'ne kadar', 'kaç gün'],
  'tarih': ['zaman', 'süre', 'teslim'],

  // Tasarım
  'tasarım': ['design', 'dizayn', 'görsel', 'ui', 'ux', 'arayüz'],
  'design': ['tasarım', 'dizayn', 'görsel'],
  'ui': ['tasarım', 'arayüz', 'interface', 'ux'],
  'ux': ['tasarım', 'kullanıcı deneyimi', 'ui'],

  // Web/Mobil
  'web': ['website', 'site', 'internet', 'online', 'web'],
  'mobil': ['app', 'uygulama', 'mobile', 'ios', 'android'],
  'site': ['web', 'website', 'internet'],
  'uygulama': ['app', 'mobil', 'program'],

  // İletişim
  'iletişim': ['contact', 'mail', 'email', 'telefon', 'mesaj', 'ulaş'],
  'mail': ['email', 'eposta', 'iletişim'],
  'telefon': ['iletişim', 'ara', 'contact'],

  // Ekip
  'ekip': ['team', 'takım', 'kadro', 'personel'],
  'team': ['ekip', 'takım'],

  // Teknoloji
  'teknoloji': ['tech', 'yazılım', 'kod', 'programming'],
  'yazılım': ['software', 'program', 'kod', 'teknoloji'],
  'kod': ['code', 'yazılım', 'programming'],
}

export interface SearchItem {
  id: string
  title: string
  description: string
  category: string
  href: string
  keywords: string[]
  content: string // Full content for deep search
  icon?: any
}

// Levenshtein distance for fuzzy matching
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = []

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }

  return matrix[str2.length][str1.length]
}

// Get related terms from synonyms
function getRelatedTerms(term: string): string[] {
  const lowerTerm = term.toLowerCase()
  const related = new Set<string>([lowerTerm])

  // Add direct synonyms
  if (synonyms[lowerTerm]) {
    synonyms[lowerTerm].forEach(syn => related.add(syn))
  }

  // Add reverse synonyms
  Object.entries(synonyms).forEach(([key, values]) => {
    if (values.includes(lowerTerm)) {
      related.add(key)
    }
  })

  return Array.from(related)
}

// Calculate relevance score
function calculateRelevance(item: SearchItem, query: string): number {
  const lowerQuery = query.toLowerCase()
  const relatedTerms = getRelatedTerms(lowerQuery)
  let score = 0

  // Exact match in title (highest priority)
  if (item.title.toLowerCase().includes(lowerQuery)) {
    score += 100
  }

  // Exact match in keywords
  if (item.keywords.some(k => k.toLowerCase().includes(lowerQuery))) {
    score += 80
  }

  // Exact match in description
  if (item.description.toLowerCase().includes(lowerQuery)) {
    score += 60
  }

  // Exact match in content
  if (item.content.toLowerCase().includes(lowerQuery)) {
    score += 40
  }

  // Related terms match
  relatedTerms.forEach(term => {
    if (item.title.toLowerCase().includes(term)) score += 50
    if (item.keywords.some(k => k.toLowerCase().includes(term))) score += 40
    if (item.description.toLowerCase().includes(term)) score += 30
    if (item.content.toLowerCase().includes(term)) score += 20
  })

  // Fuzzy match for typos (if close enough)
  const words = item.title.toLowerCase().split(' ')
  words.forEach(word => {
    const distance = levenshteinDistance(lowerQuery, word)
    if (distance <= 2 && lowerQuery.length > 3) {
      score += 30 - (distance * 10)
    }
  })

  return score
}

// Main search function
export function searchContent(items: SearchItem[], query: string): SearchItem[] {
  if (!query.trim()) {
    return items
  }

  const results = items
    .map(item => ({
      item,
      score: calculateRelevance(item, query),
    }))
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(result => result.item)

  return results
}

// Highlight matched text
export function highlightMatch(text: string, query: string): string {
  if (!query.trim()) return text

  const relatedTerms = getRelatedTerms(query.toLowerCase())
  let highlightedText = text

  relatedTerms.forEach(term => {
    const regex = new RegExp(`(${term})`, 'gi')
    highlightedText = highlightedText.replace(
      regex,
      '<mark class="bg-primary/20 text-primary font-medium">$1</mark>'
    )
  })

  return highlightedText
}

