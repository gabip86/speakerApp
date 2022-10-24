import Speaker from "./Speaker";
import ReactPlaceHolder from "react-placeholder";
import useRequestSpeakers from "../hooks/useRequestSpeakers";

const SpeakersList = ({ showSessions }) => {
  const { speakerData, isLoading, hasErrored, error, onFavoriteToggle } =
    useRequestSpeakers(2000);

  // Better to escape the if statement, than have multiple return statements
  // KIS - Keep It Simple
  if (hasErrored === true) {
    return (
      <div className="text-danger">
        ERROR: <b>loading Speaker Data Failed {error}</b>
      </div>
    );
  }

  return (
    <div className="container speakers-list">
      <ReactPlaceHolder
        type="media"
        rows={15}
        className="speakerslist-placeholder"
        ready={isLoading === false}
      >
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
      </ReactPlaceHolder>
    </div>
  );
};

export default SpeakersList;
