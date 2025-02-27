import { BlogPosts } from "app/components/posts";
import { Bungee_Shade } from "@next/font/google";

const bungeeShade = Bungee_Shade({ weight: "400", subsets: ["latin"] });

export default function Page() {
  return (
    <section>
      <h1
        className={`${bungeeShade.className} text-3xl sm:text-6xl font-bold text-center my-28 relative`}
      >
        <span className="absolute inset-0 text-[#011627] z-10">Namaste</span>
        <span
          className="relative z-0 text-transparent"
          style={{ WebkitTextStroke: "2px #011627" }}
        >
          Namaste
        </span>
      </h1>
      <p className="mb-4">
        {`I'm Sahil, a software engineer based in Delhi. I'm currently exploring the blockchain security reasearch space. I also enjoy participating in audit contests on codeHawk.`}
        <br />
        <br />
        {`I also write about my experiences and learnings on my blog. Feel free to check it out!`}

      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
