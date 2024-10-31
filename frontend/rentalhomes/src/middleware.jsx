import { NextResponse } from "next/server";

export async function middleware(request) {
	const { pathname } = request.nextUrl;
	if (pathname === "/") {
		return NextResponse.next();
	}
	const token = request.cookies.get("token")?.value;

	const publicPaths = ["/login", "/signup"];

	if (publicPaths.includes(pathname) && token) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	if (!token && !publicPaths.includes(pathname)) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!_next|static|favicon.ico|assets|public).*)"],
};
