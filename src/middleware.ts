import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

const locales = ["en", "de"];
const publicPages = ["/", "/login"];
const productProtectedRoutes = {
  "/secret/placement-service": ["placement-service"],
  "/secret/quality-index": ["quality-index"],
};

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
});

export default withAuth(
  function middleware(req) {
    const publicPathnameRegex = RegExp(
      `^(/(${locales.join("|")}))?(${publicPages.join("|")})?/?$`,
      "i"
    );
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
    if (isPublicPage) {
      return intlMiddleware(req);
    }

    // Check if the current route requires specific products
    const requiredProducts =
      productProtectedRoutes[
        req.nextUrl.pathname as keyof typeof productProtectedRoutes
      ];

    if (requiredProducts) {
      const currentOrg = req?.nextauth?.token?.user?.organizations?.find(
        (org) => org.id === req?.nextauth?.token?.user.selectedOrgId
      );

      if (!currentOrg) return new NextResponse("You are not authorized!");

      const hasAccess = requiredProducts.every((product) =>
        currentOrg.products.includes(product)
      );

      if (!hasAccess) {
        return new NextResponse("You are not authorized!");
      }

      return intlMiddleware(req);
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
