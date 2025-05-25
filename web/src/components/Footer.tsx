import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#23aaaa" }} className="text-white ">
      <div className="container mx-auto py-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <Link to="/" className="block mb-4">
              <img
                src="/carelulu_logo_square_white.png"
                alt="CareLuLu Logo"
                className="w-40"
              />
            </Link>
          </div>
          <div>
            <h3 className="font-bold mb-4">FOR PARENTS</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/">Parent Resources</Link>
              </li>
              <li>
                <Link to="/">How It Works</Link>
              </li>
              <li>
                <Link to="/">Testimonials</Link>
              </li>
              <li>
                <Link to="/">Terms of Use</Link>
              </li>
              <li>
                <Link to="/">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">FOR PROVIDERS</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/">Provider Resources</Link>
              </li>
              <li>
                <Link to="/">How It Works</Link>
              </li>
              <li>
                <Link to="/">Testimonials</Link>
              </li>
              <li>
                <Link to="/">Terms and Conditions</Link>
              </li>
              <li>
                <Link to="/">List Your Program</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">MORE</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/">About Us</Link>
              </li>
              <li>
                <Link to="/">Press</Link>
              </li>
              <li>
                <Link to="/">Jobs</Link>
              </li>
              <li>
                <Link to="/">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex space-x-4 mt-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-black"
                asChild
              >
                <a href="#" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-black"
                asChild
              >
                <a href="#" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-black"
                asChild
              >
                <a href="#" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
            </div>
            <div className="mt-4 ml-4">
              <Button
                variant="outline"
                className="bg-white text-black hover:bg-gray-100 cursor-pointer"
              >
                Help Center
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
