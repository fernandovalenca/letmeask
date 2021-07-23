import copyImg from "assets/images/copy.svg";

import "styles/components/roomCode.scss";

interface IRoomCode {
  code: string;
}

export function RoomCode({ code }: IRoomCode) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
  }

  return (
    <button className="room-code-container" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copiar código da sala" />
      </div>
      <span>Sala #{code}</span>
    </button>
  );
}
