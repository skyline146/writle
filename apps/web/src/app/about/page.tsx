import { IconBrandTelegram } from "@tabler/icons-react";

export default function About() {
  return (
    <section className="flex h-full flex-col items-center justify-evenly text-balance font-mono">
      <h1 className="text-3xl font-semibold">About this project</h1>
      <div className="flex flex-col items-center gap-20 *:text-xl">
        <p>
          Pet project by{" "}
          <a
            href="https://t.me/diman404"
            target="_blank"
            className="group/link text-neutral-400 hover:text-white"
          >
            @diman404
            <IconBrandTelegram className="inline-block opacity-0 transition-opacity duration-300 group-hover/link:opacity-100" />
          </a>
        </p>
        <p className="text-balance">
          Web application for publishing posts/articles,
          <br />
          adding friends, viewing posts by other people based on your interests.
        </p>
        <div>
          <p>Used technologies:</p>
          <ul className="list-disc">
            <li>Frontend - Next.js, Tailwind CSS</li>
            <li>Backend - Nest.js, MongoDB</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
