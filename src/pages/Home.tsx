import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { useAuth } from "hooks/useAuth";
import { database } from "services/firebase";

import { Button } from "components";

import "styles/pages/home.scss";

import illustrationImg from "assets/images/illustration.svg";
import logoImg from "assets/images/logo.svg";
import googleIconImg from "assets/images/google-icon.svg";

interface FormProps {
  roomCode: string;
}

export function Home() {
  const { register, handleSubmit } = useForm<FormProps>();
  const { signInWithGoogleAndCreateARoom } = useAuth();
  const history = useHistory();

  const handleJoinRoom: SubmitHandler<FormProps> = async ({ roomCode }) => {
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists.");
      return;
    }

    if (roomRef.val().closedAt) {
      alert("Room already closed.");
      return;
    }

    history.push(`/rooms/${roomCode}`);
  };

  return (
    <div id="home-container">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="home-content">
          <img src={logoImg} alt="Letmeask" />
          <button
            className="create-room"
            onClick={signInWithGoogleAndCreateARoom}
          >
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={handleSubmit(handleJoinRoom)}>
            <input
              type="text"
              required
              placeholder="Digite o código da sala"
              {...register("roomCode", { required: true })}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
