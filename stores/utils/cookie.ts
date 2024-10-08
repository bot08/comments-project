export function setCookie(name: string, value: string, days: number): void {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
}

export function getCookie(name: string): string | null {
  // server
  if(import.meta.server) {
    const cookies = parseCookies(useRequestHeaders(['cookie']).cookie || '');
    return cookies[name]
  }
  // client
  const nameEQ = `${name}=`
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length))
  }
  return null
}

export function removeCookie(name: string): void {
  setCookie(name, '', -1)
}

// server helper
function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  cookieHeader.split(';').forEach((cookie) => {
    const [name, value] = cookie.split('=').map(c => c.trim());
    cookies[name] = decodeURIComponent(value);
  });
  return cookies;
}