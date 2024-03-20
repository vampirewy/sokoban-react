import floorImg from "@/assets/floor.png";
import wallImg from "@/assets/wall.png";
import { useEditElement } from "@/composables/edit/editElement";
import { useEditMap } from "@/composables/edit/editMap";
import { MapTile } from "@/store/features/Map";

interface Props {
  x: number;
  y: number;
}

function Wall() {
  return <img src={wallImg} draggable="false" alt="" />;
}

function Floor() {
  return <img src={floorImg} alt="" draggable="false" />;
}

export default function MapBlockView(props: Props) {
  const { storeMap } = useEditMap();
  const { getCurrentEditElement } = useEditElement();

  function handleClick() {
    getCurrentEditElement().execute(props);
  }

  // function handleMouseMove() {
  //   console.log("mouse move");
  // }

  return (
    <div className="border border-white" onClick={handleClick}>
      {storeMap[props.y][props.x] === MapTile.WALL ? Wall() : Floor()}
    </div>
  );
}
