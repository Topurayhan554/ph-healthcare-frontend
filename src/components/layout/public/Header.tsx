import Link from "next/link";

export default function Header() {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about-us" },
  ];

  return (
    <header className="bg-gray-100 w-full h-16">
      <nav className="flex items-center justify-center gap-3 h-10">
        {routes.map((route) => {
          return (
            <Link key={route.url} href={route.url}>
              {route.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
