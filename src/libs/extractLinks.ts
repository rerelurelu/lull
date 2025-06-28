import type { Element, Parent, Text, Node } from 'hast'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import { unified } from 'unified'

export type ExtractedLink = {
  url: string
  originalElement: string
}

export type LinkExtractionResult = {
  links: ExtractedLink[]
  processedHtml: string
}

/**
 * HTML コンテンツから <p><a>URL</a></p> パターンのリンクを抽出し、プレースホルダーに置換
 */
export const extractLinksFromHtml = async (htmlContent: string): Promise<LinkExtractionResult> => {
  try {
    const processor = unified().use(rehypeParse, { fragment: true })
    const tree = processor.parse(htmlContent)

    const extractedLinks: ExtractedLink[] = []
    let linkIndex = 0
    walkAst(tree, (node) => {
      if (node.type === 'element' && node.tagName === 'p') {
        const linkInfo = extractLinkFromParagraph(node)
        if (linkInfo) {
          extractedLinks.push({
            url: linkInfo.url,
            originalElement: nodeToHtml(node),
          })

          const placeholderText = `__LINK_CARD_${linkIndex}__`
          node.children = [
            {
              type: 'text',
              value: placeholderText,
            } as Text,
          ]

          linkIndex++
        }
      }
    })

    const processedHtml = astToHtml(tree)

    return {
      links: extractedLinks,
      processedHtml,
    }
  } catch (error) {
    console.error('HTML パース中にエラーが発生しました:', error)
    return {
      links: [],
      processedHtml: htmlContent,
    }
  }
}

/**
 * <p> 要素がリンクカード化の条件を満たすかチェック
 */
const extractLinkFromParagraph = (pElement: Element): { url: string } | null => {
  const children = pElement.children.filter((child) =>
    child.type === 'text' ? (child as Text).value.trim() !== '' : true,
  )
  if (children.length === 1 && children[0].type === 'element') {
    const child = children[0] as Element

    if (child.tagName === 'a' && child.properties?.href) {
      const href = child.properties.href as string
      if (isValidUrl(href)) {
        return { url: href }
      }
    }
  }

  return null
}

const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

const walkAst = (node: any, callback: (node: Element) => void): void => {
  if (node.type === 'element') {
    callback(node)
  }

  if (node.children) {
    for (const child of node.children) {
      walkAst(child, callback)
    }
  }
}

const _removeMarkedElements = (tree: any, elementsToRemove: Element[]): void => {
  const removeFromChildren = (children: any[]): any[] => {
    return children.filter((child) => {
      if (elementsToRemove.includes(child)) {
        return false
      }

      if (child.children) {
        child.children = removeFromChildren(child.children)
      }

      return true
    })
  }

  if (tree.children) {
    tree.children = removeFromChildren(tree.children)
  }
}

const nodeToHtml = (node: Element): string => {
  try {
    const processor = unified().use(rehypeParse, { fragment: true }).use(rehypeStringify)

    const tree = {
      type: 'root' as const,
      children: [node],
    }

    return String(processor.stringify(tree as any))
  } catch {
    return ''
  }
}

const astToHtml = (tree: any): string => {
  try {
    const processor = unified().use(rehypeParse, { fragment: true }).use(rehypeStringify)

    return String(processor.stringify(tree as any))
  } catch (error) {
    console.error('AST to HTML 変換エラー:', error)
    return ''
  }
}

export const logExtractedLinks = (result: LinkExtractionResult): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log('🔗 抽出されたリンク:', result.links.length, '件')
    result.links.forEach((link, index) => {
      console.log(`  ${index + 1}. ${link.url}`)
    })
  }
}
