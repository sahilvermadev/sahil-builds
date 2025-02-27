import { BlogPosts } from 'app/components/posts'
import { Bungee_Shade } from "@next/font/google";

const bungeeShade = Bungee_Shade({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
  return (
    <section>
      <h1
        className={`${bungeeShade.className} text-3xl sm:text-6xl font-bold text-center my-28 relative`}
      >
        <span className="absolute inset-0 text-[#011627] z-10">older stuff</span>
        <span
          className="relative z-0 text-transparent"
          style={{ WebkitTextStroke: "2px #011627" }}
        >
          older stuff
        </span>
      </h1>      <BlogPosts />
    </section>
  )
}
