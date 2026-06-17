import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLocation,
} from "react-router"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet"

import { NavLink } from "react-router"

import { useEffect, useState } from "react"

import type { Route } from "./+types/root"
import "./app.css"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-black text-white">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

// applies to all routes
export default function App() {
  const location = useLocation()

  const navItems = [
    { id: "00", label: "Home", href: "/" },
    { id: "01", label: "Destination", href: "/destination" },
    { id: "02", label: "Crew", href: "/crew" },
    { id: "03", label: "Technology", href: "/technology" },
  ]

  /*
   Radix doesn't know about our mobile, tablet, desktop breakpoints and if you 
   open the mobile nav and resize the screen, it won't close. We can manually 
   close the nav mobile once the screen is >= 36rem.
   */
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 36rem)")

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setOpen(false)
      }
    }

    mq.addEventListener("change", handleChange)

    return () => mq.removeEventListener("change", handleChange)
  }, [])

  const DesktopNav = () => {
    return (
      <ul className="flex gap-15 bg-white/5 ps-[clamp(3rem,10vw,7rem)] pe-[clamp(1rem,10vw,10rem)] backdrop-blur-2xl sm:max-lg:gap-8 sm:max-lg:pe-7 sm:max-lg:pl-10">
        {navItems.map((item) => (
          <li className="group" key={item.id}>
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                `group relative block py-10 text-sm text-white-200 ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span className="inline-flex gap-4 tracking-[0.25em] uppercase after:absolute after:bottom-0 after:left-0 after:h-0.75 after:w-0 after:bg-white-200 after:transition-[width] after:content-[''] group-hover:after:w-full group-focus-visible:after:w-full in-[.active]:after:w-full sm:max-lg:tracking-[0.15em]">
                <span className="font-bold sm:max-lg:hidden">{item.id}</span>
                {item.label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    )
  }

  const MobileNav = () => {
    return (
      <ul className="flex h-full flex-col">
        {navItems.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                `group block py-10 text-sm text-white-200 ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span className="relative inline-flex gap-4 tracking-[0.25em] uppercase after:absolute after:-bottom-2 after:left-0 after:h-0.75 after:w-0 after:bg-white-200 after:transition-[width] after:content-[''] group-hover:after:w-full group-focus-visible:after:w-full in-[.active]:after:w-full sm:max-lg:tracking-[0.15em]">
                <span className="font-bold sm:max-lg:hidden">{item.id}</span>
                {item.label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    )
  }

  const pathname = location.pathname

  const backgroundClass = pathname === "/" ? "bg-home" : ""

  return (
    <>
      <div className={`min-h-screen ${backgroundClass}`}>
        <header className="mx-8 flex items-center justify-between pt-8 sm:max-lg:mt-0 sm:max-lg:mr-0 lg:mr-0 lg:gap-4">
          <svg
            className="mr-10 w-14"
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
          >
            <g fill="none" fillRule="evenodd">
              <circle cx="24" cy="24" r="24" fill="#FFF" />
              <path
                fill="#0B0D17"
                d="M24 0c0 16-8 24-24 24 15.718.114 23.718 8.114 24 24 0-16 8-24 24-24-16 0-24-8-24-24z"
              />
            </g>
          </svg>

          {/* Desktop nav */}
          <div className="hidden sm:flex lg:w-full lg:items-center lg:before:z-10 lg:before:-mr-8 lg:before:h-px lg:before:w-full lg:before:bg-white/20 lg:before:content-['']">
            <nav>
              <DesktopNav />
            </nav>
          </div>

          {/* Mobile nav */}
          <div className="sm:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <div className="flex items-center">
                <SheetTrigger asChild>
                  <button className="h-8 w-8">
                    <span className="sr-only">Menu</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="21"
                    >
                      <g fill="#D0D6F9" fillRule="evenodd">
                        <path d="M0 0h24v3H0zM0 9h24v3H0zM0 18h24v3H0z" />
                      </g>
                    </svg>
                  </button>
                </SheetTrigger>

                <SheetContent
                  className="border-0 bg-white/5 pt-8 pr-0 pl-12 text-white backdrop-blur-2xl data-[side=bottom]:border-t-0 data-[side=left]:border-r-0 data-[side=right]:border-l-0 data-[side=top]:border-b-0"
                  showCloseButton={false}
                >
                  <SheetClose asChild>
                    <button className="mr-8 mb-8 ml-auto aspect-square p-4">
                      <span className="sr-only">Close</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="21"
                      >
                        <g fill="#D0D6F9" fillRule="evenodd">
                          <path d="M2.575.954l16.97 16.97-2.12 2.122L.455 3.076z" />
                          <path d="M.454 17.925L17.424.955l2.122 2.12-16.97 16.97z" />
                        </g>
                      </svg>
                    </button>
                  </SheetClose>

                  <MobileNav />
                </SheetContent>
              </div>
            </Sheet>
          </div>
        </header>
        <Outlet />
      </div>
    </>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
