import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

/** Schützt den Admin-Bereich (Lead-Übersicht + PDF-Export) per HTTP-Basic-Auth. */
export function proxy(request: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return new NextResponse("Admin-Bereich ist nicht konfiguriert (ADMIN_PASSWORD fehlt).", { status: 503 });
  }

  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    const decoded = atob(auth.slice("Basic ".length));
    const separatorIndex = decoded.indexOf(":");
    const suppliedPassword = separatorIndex >= 0 ? decoded.slice(separatorIndex + 1) : "";
    if (suppliedPassword === password) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentifizierung erforderlich.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Weitblick Admin"' },
  });
}
