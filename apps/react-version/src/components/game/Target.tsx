import targetImg from '@/assets/target.png';
import { usePosition } from '@/composables/game/usePosition';

interface PropsType {
  target: { x: number; y: number; id: number };
}
export default function Target({ target }: PropsType) {
  const { position } = usePosition(target);

  return (
    <div
      className="absolute"
      style={position}
    >
      <img
        src={targetImg}
        alt=""
      />
    </div>
  );
}
