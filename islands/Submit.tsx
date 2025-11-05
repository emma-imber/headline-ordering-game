import { Signal } from "@preact/signals";
import { Fireworks } from "@fireworks-js/preact";
import { useRef } from "preact/hooks";
import type { FireworksHandlers } from "@fireworks-js/preact";

interface SubmitButtonProps {
  submitted: Signal<boolean>;
  headlines: Signal<{
    headline: string;
    standfirst: string;
    webPublicationDate: string;
  }[]>;
  sortedHeadlines: {
    headline: string;
    standfirst: string;
    webPublicationDate: string;
  }[];
  answersAreCorrect: Signal<boolean>;
}

export default function Submit(props: SubmitButtonProps) {
  const checkAnswers = () => {
    props.submitted.value = true;
    console.log(props.headlines.value);
    console.log(props.sortedHeadlines);
    if (
      JSON.stringify(props.headlines.value) ===
        JSON.stringify(props.sortedHeadlines)
    ) {
      props.answersAreCorrect.value = true;
    }
  };

  const tryAgain = () => {
    props.submitted.value = false;
  };

  const ref = useRef<FireworksHandlers>(null);

  return (
    <>
      {!props.submitted.value &&
        (
          <button type="button" class="submit" onClick={checkAnswers}>
            Submit attempt
          </button>
        )}
      {(props.submitted.value && props.answersAreCorrect.value) &&
        (
          <>
            <p>Correct! 🎉</p>
            <Fireworks
              autostart
              ref={ref}
              options={{ opacity: 0.5 }}
              style={{
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                position: "fixed",
                background: "transparent",
              }}
            />
          </>
        )}
      {(props.submitted.value && !props.answersAreCorrect.value) &&
        (
          <button type="button" class="submit" onClick={tryAgain}>
            Incorrect 😢 Try again?
          </button>
        )}
    </>
  );
}
