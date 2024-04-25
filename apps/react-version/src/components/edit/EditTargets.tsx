import targetImg from '@/assets/target.png';
import { useEditTarget } from '@/composables/edit/editTarget';
import { STEP_EDIT, usePosition } from '@/composables/game/usePosition';
import { EditTarget } from '@/store/features/EditTarget';

interface PropsType {
  target: EditTarget;
}

export default function EditTargetView({ target }: PropsType) {
  const { position } = usePosition(target, STEP_EDIT);
  const { removeTarget } = useEditTarget();

  function handleDoubleClick(target: EditTarget) {
    removeTarget(target);
  }

  return (
    <div
      className="absolute"
      style={position}
      onDoubleClick={() => handleDoubleClick(target)}
    >
      <img
        src={targetImg}
        alt=""
      />
    </div>
  );
}
