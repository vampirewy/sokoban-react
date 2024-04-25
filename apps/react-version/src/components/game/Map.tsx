import floorImg from '@/assets/floor.png';
import wallImg from '@/assets/wall.png';
import { MapTile, selectMap } from '@/store/features/Map';
import { useAppSelector } from '@/store/useHooks';

function Wall() {
  return (
    <img
      src={wallImg}
      alt=""
    />
  );
}

function Floor() {
  return (
    <img
      src={floorImg}
      alt=""
    />
  );
}

export default function Map() {
  const storeMap = useAppSelector(selectMap);

  return (
    <>
      {storeMap.map((row, i) => {
        return (
          <div
            key={i}
            className="flex"
          >
            {storeMap[i].map((col, j) => {
              return <div key={j}>{storeMap[i][j] === MapTile.WALL ? Wall() : Floor()}</div>;
            })}
          </div>
        );
      })}
    </>
  );
}
