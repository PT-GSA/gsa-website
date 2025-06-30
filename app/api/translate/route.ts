// Helper Google Translate unofficial
const googleTranslate = async (text: string, from: string, to: string) => {
  if (!text || !text.trim() || !from || !to) return text;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.text();
      console.error('Google Translate error:', res.status, err);
      return text;
    }
    const data = await res.json();
    return (data[0] as [string, ...unknown[]][]).map((item) => item[0]).join('');
  } catch (e) {
    console.error('Google Translate fetch error:', e);
    return text;
  }
};

export async function POST(req: Request) {
  try {
    const { text, from, to } = await req.json();
    if (!text || !from || !to) {
      return new Response(JSON.stringify({ error: 'Missing params' }), { status: 400 });
    }
    const translatedText = await googleTranslate(text, from, to);
    return new Response(JSON.stringify({ translatedText }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
} 