import cargoImg from "@/assets/cargo.png";
import { usePosition } from "@/composables/game/usePosition";
import { type Cargo } from "@/store/features/Cargos";

interface PropsType {
  cargo: Cargo;
}

export default function Cargo({ cargo }: PropsType) {
  const { position } = usePosition(cargo);

  return (
    <div className="absolute" style={position}>
      <img src={cargoImg} alt="" />
    </div>
  );
}
