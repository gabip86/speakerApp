import { data } from "../../SpeakerData";
import { useState, useEffect } from "react";

function useRequestSpeakers(delayTime = 1000) {
  const [speakerData, setSpeakerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);
  const [error, setError] = useState("");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function delayFunc() {
      try {
        await delay(delayTime);
        // throw "Had Error.";
        setIsLoading(false);
        setSpeakerData(data);
      } catch (e) {
        setIsLoading(false);
        setHasErrored(true);
        setError(e);
      }
    }
    delayFunc();
  }, []);

  const onFavoriteToggle = (id) => {
    const speakerRecPrevious = speakerData.find((rec) => {
      return rec.id === id;
    });
    const speakerRecUpdated = {
      ...speakerRecPrevious,
      favorite: !speakerRecPrevious.favorite,
    };
    const speakersDataNew = speakerData.map((rec) => {
      return rec.id === id ? speakerRecUpdated : rec;
    });
    setSpeakerData(speakersDataNew);
  };

  return { speakerData, isLoading, hasErrored, error, onFavoriteToggle };
}

export default useRequestSpeakers;
