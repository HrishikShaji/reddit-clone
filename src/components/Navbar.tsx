import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/Button";
import { getAuthSession } from "@/lib/auth";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full flex items-center justify-between gap-2">
        {/* LOGO */}
        <Link href="/" className="flex gap-2 items-center">
          <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            REDDIT
          </p>
        </Link>
        {/*SEARCH*/}
        {session ? (
          <p>You are logged in</p>
        ) : (
          <Link href="/auth/sign-in" className={buttonVariants()}>
            Sign-in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
