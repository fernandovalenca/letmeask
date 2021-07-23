import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "hooks/useAuth";
import { database } from "services/firebase";

import { Button } from "components";

import illustrationImg from "assets/images/illustration.svg";
import logoImg from "assets/images/logo.svg";

import "styles/pages/createRoom.scss";

interface FormProps {
  name: string;
}

export function CreateRoom() {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm<FormProps>();
  const history = useHistory();

  const handleCreateRoom: SubmitHandler<FormProps> = async ({ name }) => {
    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: name,
      authorId: user?.id,
    });

    history.push(`admin/rooms/${firebaseRoom.key}`);
  };

  return (
    <div id="create-room-container">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="create-room-content">
          <img src={logoImg} alt="Letmeask" />

          <h2>Criar uma sala</h2>

          <form onSubmit={handleSubmit(handleCreateRoom)}>
            <input
              type="text"
              required
              placeholder="Nome da sala"
              {...register("name", { required: true })}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>

          <p>
            Quer entrar em uma sala existente?{" "}
            <Link to={"/"}>clique aqui.</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
