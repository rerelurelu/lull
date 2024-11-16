export const fetchGoogleFonts = async (font: string) => {
  const endpoint = new URL('https://www.googleapis.com/webfonts/v1/webfonts')
  endpoint.searchParams.set('family', font)
  endpoint.searchParams.set('key', process.env.GOOGLE_FONTS_API_KEY as string)

  const res = await fetch(endpoint).then((res) => res.json())
  const fontInfo = await fetch(res.items[0].files['300'])
  const fontBuffer = await fontInfo.arrayBuffer()
  return fontBuffer
}
