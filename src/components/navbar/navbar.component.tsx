import { SquareCheckBig } from "lucide-react";
import Link from "../link/link.component";
import { ThemeToggle } from "../themeToggle/themeToggle.component";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-5 px-8 border-b border-black/10">
      <div className="container flex">
        <Link
          href="/"
          className="font-medium text-2xl flex justify-center items-center gap-x-2.5"
        >
          <SquareCheckBig className="h-7 w-7" />
          Todo.io
        </Link>
      </div>

      <ul className="flex items-center text-lg gap-x-5">
        <li>
          <Link href="/">Lists</Link>
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
