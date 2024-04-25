import cargoImg from '@/assets/cargo.png';
import { useEditCargo } from '@/composables/edit/editCargo';
import { STEP_EDIT, usePosition } from '@/composables/game/usePosition';
import { type EditCargo } from '@/store/features/EditCargo';

interface PropsType {
  cargo: EditCargo;
}

export default function EditCargosView({ cargo }: PropsType) {
  const { position } = usePosition(cargo, STEP_EDIT);
  const { removeCargo } = useEditCargo();

  function handleDoubleClick(cargo: EditCargo) {
    removeCargo(cargo);
  }

  return (
    <div
      className="absolute"
      style={position}
      onDoubleClick={() => handleDoubleClick(cargo)}
    >
      <img
        src={cargoImg}
        alt=""
      />
    </div>
  );
}
