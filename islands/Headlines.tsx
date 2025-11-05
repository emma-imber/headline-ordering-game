import { Signal } from "@preact/signals";

interface HeadlinesProps {
  headlines: Signal<{
    headline: string;
    standfirst: string;
    webPublicationDate: string;
    url: string;
  }[]>;
}

export default function Headlines(props: HeadlinesProps) {
  const onUpClick = (index: number) => {
    const elementToMove = props.headlines.value[index];
    const elementBeingReplaced = props.headlines.value[index - 1];
    const newArray = [...props.headlines.value];
    newArray[index - 1] = elementToMove;
    newArray[index] = elementBeingReplaced;
    props.headlines.value = newArray;
  };

  const onDownClick = (index: number) => {
    const elementToMove = props.headlines.value[index];
    const elementBeingReplaced = props.headlines.value[index + 1];
    const newArray = [...props.headlines.value];
    newArray[index + 1] = elementToMove;
    newArray[index] = elementBeingReplaced;
    props.headlines.value = newArray;
  };

  return (
    <div class="headline-list">
      {props.headlines.value.map((entry, index) => {
        return (
          <div class="headline">
            {index > 0 &&
              (
                <button
                  id={"up-button-" + index}
                  type="button"
                  onClick={() => onUpClick(index)}
                >
                  <svg
                    width={20}
                    height={undefined}
                    viewBox="-3 -3 30 30"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.956 23V4.726l8.575 7.167.932-.932L12.478 1h-.956l-9.984 9.96.931.932 8.576-7.166V23z"
                      fill="white"
                    />
                  </svg>
                </button>
              )}
            <a href={entry.url} target="_blank" class="headline-para">
              {entry.headline}
            </a>
            <p class="standfirst">{entry.standfirst}</p>
            {index < 4 &&
              (
                <button
                  id={"down-button-" + index}
                  type="button"
                  onClick={() => onDownClick(index)}
                >
                  <svg
                    width={20}
                    height={undefined}
                    viewBox="-3 -3 30 30"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.045 1v18.274l-8.576-7.167-.931.932L11.523 23h.955l9.985-9.96-.932-.932-8.575 7.166V1z"
                      fill="white"
                    />
                  </svg>
                </button>
              )}
          </div>
        );
      })}
    </div>
  );
}
