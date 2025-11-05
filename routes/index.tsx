import data from "./api/data.json" with { type: "json" };
import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { useSignal } from "@preact/signals";
import Headlines from "../islands/Headlines.tsx";
import Submit from "../islands/Submit.tsx";

export default define.page(function Home() {
  const headlines = useSignal([
    data[Math.floor(Math.random() * data.length)],
    data[Math.floor(Math.random() * data.length)],
    data[Math.floor(Math.random() * data.length)],
    data[Math.floor(Math.random() * data.length)],
    data[Math.floor(Math.random() * data.length)],
  ]);

  const sortedHeadlines = [...headlines.value].sort(function (a, b) {
    const keyA = new Date(a.webPublicationDate);
    const keyB = new Date(b.webPublicationDate);
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

  const submitted = useSignal(false);
  const answersAreCorrect = useSignal(false);

  return (
    <div class="px-4 py-4 mx-auto fresh-gradient min-h-screen fireworks-container">
      <Head>
        <title>That's old news!</title>
      </Head>
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1>
          📰 That's old news! <span class="animate">... or is it???</span>
        </h1>
        <p>
          Can you sort the following headlines into chronological order? From
          earliest at the top, to latest at the bottom.
        </p>
        <Headlines headlines={headlines} />
        <Submit
          submitted={submitted}
          headlines={headlines}
          answersAreCorrect={answersAreCorrect}
          sortedHeadlines={sortedHeadlines}
        />
      </div>
    </div>
  );
});
