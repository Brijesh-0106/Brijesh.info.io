function FooterSocials() {
  const socials = [
    {
      name: "GitHub",
      url: "https://github.com/Brijesh-0106",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hover:scale-110 hover:-translate-y-0.5 hover:text-white transition-all duration-200">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/brijesh-0106",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hover:scale-110 hover:-translate-y-0.5 hover:text-blue-400 transition-all duration-200">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      name: "Twitter / X",
      url: "https://x.com/BrijeshSha58142",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="hover:scale-110 hover:-translate-y-0.5 hover:text-indigo-300 transition-all duration-200">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Email",
      url: "mailto:brijeshshah654@gmail.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hover:scale-110 hover:-translate-y-0.5 hover:text-purple-400 transition-all duration-200">
          <path d="M22 2 11 13" />
          <path d="m22 2-7 20-4-9-9-4Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex items-center gap-5">
      {socials.map((s, i) => (
        <a key={i} href={s.url} target="_blank" rel="noreferrer" className="text-[#45454f] block" aria-label={s.name}>
          {s.icon}
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.06] py-6 md:py-8 mt-4 md:mt-12 bg-[#08080c]">
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[#45454f] font-sans text-xs tracking-wide">
          © {new Date().getFullYear()} Shah Brijesh · Built with Next.js
        </p>
        <FooterSocials />
      </div>
    </footer>
  );
}
