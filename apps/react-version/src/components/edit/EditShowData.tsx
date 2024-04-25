import { useEditCargo } from '@/composables/edit/editCargo';
import { useEditMap } from '@/composables/edit/editMap';
import { useEditPlayer } from '@/composables/edit/editPlayer';
import { useEditTarget } from '@/composables/edit/editTarget';
import { LevelGameData } from '@/game/gameData';
import { ChangeEvent, useMemo } from 'react';

export default function EditShowDataView() {
  const { storeMap } = useEditMap();
  const { storePlayer } = useEditPlayer();
  const { storeCargos } = useEditCargo();
  const { storeTargets } = useEditTarget();

  const data = useMemo<LevelGameData>(() => {
    return {
      map: storeMap,
      player: storePlayer,
      cargos: filterId(storeCargos),
      targets: filterId(storeTargets),
    };
  }, [storeMap, storeCargos, storePlayer, storeTargets]);

  function filterId(array: { x: number; y: number; id: number }[]) {
    return array.map(({ x, y }) => {
      return {
        x,
        y,
      };
    });
  }

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    console.log(e.target.value);
  }

  return (
    <div>
      <h3>数据展示区</h3>
      <textarea
        name=""
        id=""
        cols={30}
        rows={10}
        className="border border-black"
        value={JSON.stringify(data)}
        onChange={(e) => handleChange(e)}
      ></textarea>
    </div>
  );
}
