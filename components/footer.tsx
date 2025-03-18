import Link from "next/link"
import { Youtube, Instagram, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">ADFEL</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Strengthening faith, building community, and serving others through Christ-centered fellowship.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.youtube.com/@AdventFellowshipJA" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Youtube</span>
              </Link>
              <Link href="https://www.instagram.com/adfelja?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://www.facebook.com/adfelja" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} ADFEL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

