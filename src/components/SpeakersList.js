import { useState, useEffect } from "react";
import Speaker from "./Speaker";
import { data } from "../../SpeakerData";

const SpeakersList = ({ showSessions }) => {
  const [speakerData, setSpeakerData] = useState([]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function delayFunc() {
      await delay(2000);
      setSpeakerData(data);
    }
    delayFunc();
  });

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

  return (
    <div className="container speakers-list">
      <div className="row">
        {speakerData.map(function (speaker) {
          return (
            <Speaker
              key={speaker.id}
              speaker={speaker}
              showSessions={showSessions}
              onFavoriteToggle={() => {
                onFavoriteToggle(speaker.id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SpeakersList;
